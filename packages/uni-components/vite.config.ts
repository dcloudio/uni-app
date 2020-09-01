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
    entryFileNames: 'uni-components.esm.js'
  }
}
