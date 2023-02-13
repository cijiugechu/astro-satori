const ogTemplate = ({
  relativePath,
  title,
  description,
  width,
  height
}: {
  relativePath: string,
  title: string,
  description: string,
  width: number,
  height: number
}) => {
  return `
<meta property="og:image" content="${relativePath}" >
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:image:width" content="${width}"/>
<meta property="og:image:height" content="${height}"/>
`
}

export {
  ogTemplate
}