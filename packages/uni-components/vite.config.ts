import fs from 'fs'
import path from 'path'

import { isCustomElement } from '../uni-shared'

export default {
  root: '.',
  minify: false,
  assetsDir: '.',
  emitAssets: false,
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
}
