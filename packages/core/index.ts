import type { AstroIntegration } from 'astro'
import type { SatoriOptions } from 'satori'
import satori from 'satori'
import { readFile, writeFile } from 'fs/promises'
import { cwd } from 'process'
import grayMatter from 'gray-matter'
import kleur from 'kleur'
import { join } from 'path'
import { basename } from 'path/win32'
import { defaultOgImageELement, defaultGenerateOptions } from './ssg.js'
import { fileURLToPath } from 'url'
import { FrontMatter } from './types.js'

type ReactNode = Parameters<typeof satori>[0]

const genOgAndReplace = async (
  url: URL | undefined,
  component: string,
  element?: ReactNode,
  optionsFactory?: () => Promise<SatoriOptions>
) => {
  if (!url) {
    return
  }

  const generateOgImage = async (frontmatter: FrontMatter) => {
    const generateOptions = optionsFactory ?? defaultGenerateOptions
    const ogImageELement = element ?? defaultOgImageELement

    const options = await generateOptions()
    const res = await satori(ogImageELement(frontmatter), options)
    return res
  }

  const componentAbsolutePath = join(cwd(), component)

  const componentSource = await readFile(componentAbsolutePath, {
    encoding: 'utf-8',
  })

  const parsedFrontMatter = grayMatter(componentSource).data

  const pathname = fileURLToPath(url)

  const html = await readFile(pathname, { encoding: 'utf-8' })

  const svgSource = await generateOgImage(parsedFrontMatter as FrontMatter)

  const htmlBase = basename(pathname, '.html')

  const svgPath = pathname.replace(`${htmlBase}.html`, `og-${htmlBase}.svg`)

  await writeFile(svgPath, svgSource, { encoding: 'utf-8' })

  const relativeSvgPath = `/${basename(svgPath)}`

  const ogMetaToBeInserted = `<meta property="og:image" content="${relativeSvgPath}" >`

  const newHtml = html.replace('</head>', `${ogMetaToBeInserted}</head>`)

  await writeFile(pathname, newHtml, { encoding: 'utf-8' })
}

export interface SatoriIntegrationOptions {
  satoriOptionsFactory?: () => Promise<SatoriOptions>
  satoriElement?: (frontmatter: FrontMatter) => ReactNode
}

function Satori(options: SatoriIntegrationOptions): AstroIntegration {
  const { satoriElement, satoriOptionsFactory } = options

  return {
    name: 'astro-satori',
    hooks: {
      'astro:build:done': async ({ routes }) => {
        const isSSR = routes.length === 0

        if (!isSSR) {
          try {
            await Promise.all(
              routes.map(r =>
                genOgAndReplace(
                  r.distURL,
                  r.component,
                  satoriElement,
                  satoriOptionsFactory
                )
              )
            )

            console.log(kleur.bgGreen('open graph images generated'))
          } catch (e: unknown) {
            console.error(kleur.bgRed('failed to generate open graph images'))
          }
        }
      },
    },
  }
}

export default Satori
