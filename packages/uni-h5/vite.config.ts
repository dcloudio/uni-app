import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import replace from '@rollup/plugin-replace'

import { isCustomElement } from '../uni-shared'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

export default defineConfig({
  root: '.',
  define: {
    global: 'window',
    __DEV__: `(process.env.NODE_ENV !== 'production')`,
    __PLATFORM__: JSON.stringify('h5'),
  },
  alias: [
    {
      find: '@dcloudio/uni-api',
      replacement: resolve('../uni-api/src/index.ts'),
    },
    {
      find: '@dcloudio/uni-vue',
      replacement: resolve('../uni-vue/src/index.ts'),
    },
    {
      find: '@dcloudio/uni-core',
      replacement: resolve('../uni-core/src/index.ts'),
    },
    {
      find: '@dcloudio/uni-components',
      replacement: resolve('../uni-components/src/index.ts'),
    },
  ],
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
      input: path.resolve(__dirname, 'src/index.ts'),
      external: ['vue', 'vue-router', '@vue/shared', '@dcloudio/uni-shared'],
      preserveEntrySignatures: 'strict',
      plugins: [
        replace({
          createApi: `/*#__PURE__*/ createApi`,
        }),
      ],
      output: {
        dir: path.resolve(__dirname, 'dist'),
        format: 'es',
        manualChunks: undefined,
        entryFileNames: 'uni-h5.esm.js',
        assetFileNames(assetInfo) {
          if (assetInfo.name === 'style.css') {
            return 'uni-h5.css'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
