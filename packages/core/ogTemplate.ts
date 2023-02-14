const ogTemplate = ({
  imageHref,
  title,
  description,
  width,
  height,
  ogUrl,
}: {
  imageHref: string
  title: string
  description: string
  width: number
  height: number
  ogUrl: string
}) => {

  return `
<meta property="og:type" content="website" >
<meta property="og:url" content="${ogUrl}" >
<meta property="og:image" content="${imageHref}" >
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:image:width" content="${width}"/>
<meta property="og:image:height" content="${height}"/>
`
}

export { ogTemplate }
