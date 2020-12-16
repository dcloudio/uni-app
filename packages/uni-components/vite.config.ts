import fs from 'fs'
import path from 'path'

import { isCustomElement } from '../uni-shared'

export default {
  root: '.',
  minify: false,
  assetsDir: '.',
  define: {
    __PLATFORM__: JSON.stringify('app-plus')
  },
  vueCompilerOptions: {
    isCustomElement
  },
  rollupInputOptions: {
    input: 'src/index.ts',
    external: ['vue', '@vue/shared', '@dcloudio/uni-shared'],
    preserveEntrySignatures: 'strict'
  },
  rollupOutputOptions: {
    format: 'es',
    entryFileNames: 'uni-components.esm.js',
    assetFileNames(assetInfo) {
      if (assetInfo.name === 'style.css') {
        return 'uni-components.css'
      }
      return 'assets/[name]-[hash][extname]'
    }
  }
  // configureBuild: buildComponents
}

const components = fs
  .readdirSync(path.resolve(__dirname, 'src/components'))
  .filter(item => !/(^|\/)\.[^/.]/g.test(item))

function buildComponents(_config, builds) {
  return once(() => {
    const mainBuild = builds[0]
    components.forEach(name => {
      builds.push({
        // eslint-disabled no-restricted-syntax
        ...mainBuild,
        input: `src/components/${name}/index.vue`,
        output: {
          dir: `dist/${name}`,
          file: `${name}.js`
        },
        plugins: [...mainBuild.plugins]
      })
    })
    console.log('builds.length', builds.length)
  })
}

function once(fn) {
  let called = false
  return () => (!called && fn(), (called = true))
}
