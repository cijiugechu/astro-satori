import satori, { SatoriOptions } from 'satori'

const ogImage = (text: string) => {
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
      children: text,
    },
  }
}

const generateOptions = async () => {
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

  const options: SatoriOptions = {
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

  return options
}

const generateOgImage = async (mytext: string) => {
  const options = await generateOptions()
  const res = await satori(ogImage(mytext), options)
  return res
}

export { generateOgImage }
