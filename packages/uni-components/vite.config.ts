import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { isCustomElement } from '../uni-shared'

export default defineConfig({
  root: '.',
  define: {
    __PLATFORM__: JSON.stringify('app-plus'),
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
  ],
  build: {
    minify: false,
    assetsDir: '.',
    rollupOptions: {
      input: 'src/index.ts',
      external: ['vue', '@vue/shared', '@dcloudio/uni-shared'],
      preserveEntrySignatures: 'strict',
      output: {
        format: 'es',
        entryFileNames: 'uni-components.esm.js',
        assetFileNames(assetInfo) {
          if (assetInfo.name === 'style.css') {
            return 'uni-components.css'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    // emitAssets: false,
  },
})
