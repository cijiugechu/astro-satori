# astro-satori

This `Astro` integration brings [satori](https://github.com/vercel/satori) to your Astro project.

## Install

```shell
# Using NPM
npx astro add astro-satori
# Using Yarn
yarn astro add astro-satori
# Using PNPM
pnpx astro add astro-satori
```

## Config

```js
// astro.config.mjs
import {defineConfig} from "astro/config"
import satori from "astro-satori"
export default defineConfig({
  integrations: [
    satori({})
  ],
})
```

## How to use

see [example](/packages/playground/)

## License

MIT &copy; [nemurubaka](https://github.com/cijiugechu)
