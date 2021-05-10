import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jscc from 'rollup-plugin-jscc'
import strip from '@rollup/plugin-strip'
import replace from '@rollup/plugin-replace'

import { stripOptions } from '@dcloudio/uni-cli-shared'
import { isCustomElement } from '@dcloudio/uni-shared'

const moduleAlias = require('module-alias')
moduleAlias.addAlias(
  '@vue/babel-plugin-jsx',
  path.join(__dirname, 'lib/babel-plugin-jsx')
)
const vueJsx = require('@vitejs/plugin-vue-jsx')

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

const FORMAT = process.env.FORMAT as 'es' | 'cjs'

const rollupPlugins = [
  replace({
    values: {
      defineOnApi: `/*#__PURE__*/ defineOnApi`,
      defineOffApi: `/*#__PURE__*/ defineOffApi`,
      defineTaskApi: `/*#__PURE__*/ defineTaskApi`,
      defineSyncApi: `/*#__PURE__*/ defineSyncApi`,
      defineAsyncApi: `/*#__PURE__*/ defineAsyncApi`,
    },
    preventAssignment: true,
  }),

  jscc({
    values: {
      // 该插件限制了不能以__开头
      _NODE_JS_: FORMAT === 'cjs' ? 1 : 0,
    },
    // 忽略 pako 内部条件编译
    exclude: [resolve('../../node_modules/pako/**')],
  }),
]
if (FORMAT === 'cjs') {
  rollupPlugins.push(strip(stripOptions))
}
export default defineConfig({
  root: __dirname,
  define: {
    global: FORMAT === 'cjs' ? 'global' : 'window',
    __DEV__: `(process.env.NODE_ENV !== 'production')`,
    __TEST__: false,
    __PLATFORM__: JSON.stringify('h5'),
    __NODE_JS__: FORMAT === 'cjs' ? true : false,
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
      {
        find: '@dcloudio/uni-platform',
        replacement: resolve('./src/platform/index.ts'),
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
    emptyOutDir: FORMAT === 'es',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: [FORMAT],
    },
    assetsDir: '.',
    rollupOptions: {
      external(source) {
        if (
          [
            'vue',
            'vue-router',
            '@vue/shared',
            '@dcloudio/uni-i18n',
            '@dcloudio/uni-shared',
          ].includes(source)
        ) {
          return true
        }
        if (source.startsWith('@dcloudio/uni-h5/style')) {
          return true
        }
      },
      preserveEntrySignatures: 'strict',
      plugins: rollupPlugins,
      onwarn: (msg, warn) => {
        if (!String(msg).includes('external module "vue" but never used')) {
          warn(msg)
        }
      },
    },
  },
})
