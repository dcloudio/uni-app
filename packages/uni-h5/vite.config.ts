import path from 'path'

import replace from '@rollup/plugin-replace'

import { isCustomElement } from '../uni-shared'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

export default {
  root: '.',
  minify: false,
  assetsDir: '.',
  cssCodeSplit: true,
  alias: {
    '@dcloudio/uni-api': resolve('../uni-api/src/index.ts'),
    '@dcloudio/uni-vue': resolve('../uni-vue/src/index.ts'),
    '@dcloudio/uni-core': resolve('../uni-core/src/index.ts')
  },
  define: {
    global: 'window',
    __DEV__: `(process.env.NODE_ENV !== 'production')`,
    __PLATFORM__: JSON.stringify('h5')
  },
  vueCompilerOptions: {
    isCustomElement
  },
  rollupInputOptions: {
    input: 'src/index.ts',
    external: [
      'vue',
      'vue-router',
      '@vue/shared',
      '@dcloudio/uni-shared',
      '@dcloudio/uni-components'
    ],
    preserveEntrySignatures: 'strict',
    plugins: [
      replace({
        createApi: `/*#__PURE__*/ createApi`
      })
    ]
  },
  rollupOutputOptions: {
    format: 'es',
    entryFileNames: 'uni-h5.esm.js',
    assetFileNames(assetInfo) {
      if (assetInfo.name === 'style.css') {
        return 'uni-h5.css'
      }
      return 'assets/[name]-[hash][extname]'
    }
  }
}
