// import path from 'path'
// import fs from 'fs-extra'

import { Plugin } from 'rollup'

// const publicDir = '/Users/fxy/Documents/demo/my-vite-uniapp-project/src/static'
// const outDir = '/Users/fxy/Documents/demo/my-vite-uniapp-project/static'

export const buildPluginCopy: Plugin = {
  name: 'uni:copy',
  async generateBundle() {
    // https://github.com/vitejs/vite/blob/master/src/node/build/index.ts#L621
    // setTimeout(async () => {
    //   if (fs.existsSync(publicDir)) {
    //     for (const file of await fs.readdir(publicDir)) {
    //       await fs.copy(path.join(publicDir, file), path.resolve(outDir, file))
    //     }
    //   }
    // }, 100)
  },
}
