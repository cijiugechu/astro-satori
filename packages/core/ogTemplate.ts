const ogTemplate = ({
  relativePath,
  title,
  description,
  width,
  height,
  ogUrl,
}: {
  relativePath: string
  title: string
  description: string
  width: number
  height: number
  ogUrl: string
}) => {
  const imageHref = (() => {
    if (ogUrl.endsWith('/')) {
      return `${ogUrl}${relativePath.slice(1)}`
    } else {
      return `${ogUrl}${relativePath}`
    }
  })()

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
