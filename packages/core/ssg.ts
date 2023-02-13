import type { SatoriOptions } from 'satori'
import type { FrontMatter } from './types.js'

const defaultOgImageELement = ({ title, description, author }: FrontMatter) => {
  return {
    type: 'div',
    props: {
      style: {
        background: '#fefbfb',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'IBM Plex Mono',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-1px',
              right: '-1px',
              border: '4px solid #000',
              background: '#ecebeb',
              opacity: '0.9',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              margin: '2.5rem',
              width: '88%',
              height: '80%',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              border: '4px solid #000',
              background: '#fefbfb',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              margin: '2rem',
              width: '88%',
              height: '80%',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: '20px',
                    width: '90%',
                    height: '90%',
                  },
                  children: [
                    {
                      type: 'p',
                      props: {
                        style: {
                          fontSize: 72,
                          fontWeight: 'bold',
                          maxHeight: '84%',
                          overflow: 'hidden',
                        },
                        children: [title],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                          marginBottom: '8px',
                          fontSize: 28,
                        },
                        children: [
                          {
                            type: 'span',
                            children: [
                              'by',
                              '  ',
                              {
                                type: 'span',
                                props: {
                                  style: {
                                    color: 'transparent',
                                  },
                                  children: [`"`],
                                },
                              },
                              {
                                type: 'span',
                                props: {
                                  style: {
                                    overflow: 'hidden',
                                    fontWeight: 'bold',
                                  },
                                  children: [author],
                                },
                              },
                            ],
                          },
                          {
                            type: 'span',
                            props: {
                              style: { overflow: 'hidden', fontWeight: 'bold' },
                              children: [title],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
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
