import type { AstroIntegration } from 'astro'
import { readFile, writeFile } from 'fs/promises'
import { basename } from 'path/win32'
import { generateOgImage } from './ssg.js'
import { fileURLToPath } from 'url'

const titleRe = /\<title\>.+\<\/title\>/g

const genOgAndReplace = async (url: URL | undefined) => {
  if (!url) {
    return
  }

  const pathname = fileURLToPath(url)

  const html = await readFile(pathname, { encoding: 'utf-8' })

  const matched = html.match(titleRe)

  if (matched) {
    const titleText = matched[0].replace('<title>', '').replace('</title>', '')

    const svgSource = await generateOgImage(titleText)

    const htmlBase = basename(pathname, '.html')

    const svgPath = pathname.replace(`${htmlBase}.html`, `og-${htmlBase}.svg`)

    await writeFile(svgPath, svgSource, { encoding: 'utf-8' })

    const relativeSvgPath = `/${basename(svgPath)}`

    const ogMetaToBeInserted = `<meta property="og:image" content="${relativeSvgPath}" >`

    const newHtml = html.replace('</head>', `${ogMetaToBeInserted}</head>`)

    await writeFile(pathname, newHtml, { encoding: 'utf-8' })
  }
}

export interface SatoriIntegrationOptions {}

function Satori(options: SatoriIntegrationOptions): AstroIntegration {
  return {
    name: 'astro-satori',
    hooks: {
      'astro:build:done': async ({ dir, routes }) => {
        const isSSR = routes.length === 0

        if (!isSSR) {
          await Promise.all(routes.map(r => genOgAndReplace(r.distURL)))
        }
      },
    },
  }
}

export default Satori
