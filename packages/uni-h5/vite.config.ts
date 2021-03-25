import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'

import { isCustomElement } from '../uni-shared'

const moduleAlias = require('module-alias')
moduleAlias.addAlias(
  '@vue/babel-plugin-jsx',
  path.join(__dirname, 'lib/babel-plugin-jsx')
)
const vueJsx = require('@vitejs/plugin-vue-jsx')

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

export default defineConfig({
  root: '.',
  define: {
    global: 'window',
    __DEV__: `(process.env.NODE_ENV !== 'production')`,
    __TEST__: false,
    __PLATFORM__: JSON.stringify('h5'),
  },
  resolve: {
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
        replacement: resolve('../uni-core/src'),
      },
      {
        find: '@dcloudio/uni-components',
        replacement: resolve('../uni-components/src/index.ts'),
      },
    ],
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
    vueJsx({ optimize: true, isCustomElement }),
  ],
  build: {
    minify: false,
    assetsDir: '.',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.ts'),
      external(source) {
        if (
          ['vue', 'vue-router', '@vue/shared', '@dcloudio/uni-shared'].includes(
            source
          )
        ) {
          return true
        }
        if (source.startsWith('@dcloudio/uni-h5/style')) {
          return true
        }
      },
      preserveEntrySignatures: 'strict',
      plugins: [
        replace({
          values: {
            createOnApi: `/*#__PURE__*/ createOnApi`,
            createTaskApi: `/*#__PURE__*/ createTaskApi`,
            createSyncApi: `/*#__PURE__*/ createSyncApi`,
            createAsyncApi: `/*#__PURE__*/ createAsyncApi`,
          },
          preventAssignment: true,
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
