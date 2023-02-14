import type { SatoriOptions } from 'satori'
import type { FrontMatter } from './types.js'

import { html } from 'satori-html'

type VNODE = ReturnType<typeof html>

const defaultOgImageELement = ({ title, description, author }: FrontMatter): VNODE => {
  return html`
  <div
      style="
        background: #fefbfb;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        style="
          position: absolute;
          top: -1px;
          right: -1px;
          border: 4px solid #000;
          background: #ecebeb;
          opacity: 0.9;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          margin: 2.5rem;
          width: 88%;
          height: 80%;
        "
      />
      <div
        style="
          border: 4px solid #000;
          background: #fefbfb;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          margin: 2rem;
          width: 88%;
          height: 80%;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 20px;
            width: 90%;
            height: 90%;
          "
        >
          <p
            style="
              font-size: 72px;
              font-weight: bold;
              max-height: 84%;
              overflow: hidden;
            "
          >
            ${title}
          </p>
          <div
            style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              margin-bottom: 8px;
              font-size: 28px;
            "
          >
            <span>
              by  
              <span
                style="
                  color: transparent;
                "
              >
                "
              </span>
              <span style="overflow: hidden; fontWeight: bold; ">
                ${author}
              </span>
            </span>

            <span style=" overflow: hidden; font-weight: bold; ">
              ${title}
            </span>
          </div>
        </div>
      </div>
    </div>
  `
}

const defaultGenerateOptions = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    'https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf'
  )
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer()

  // Bold Font
  const fontFileBold = await fetch(
    'https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf'
  )
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer()

  //@ts-ignore
  const options = {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: [
      {
        name: 'IBM Plex Mono',
        data: fontRegular,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'IBM Plex Mono',
        data: fontBold,
        weight: 600,
        style: 'normal',
      },
    ],
  }

  return options as SatoriOptions
}

export { defaultGenerateOptions, defaultOgImageELement }
