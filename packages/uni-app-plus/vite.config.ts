import path from 'path'

import { defineConfig } from 'vite'

import jscc from 'rollup-plugin-jscc'
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { isCustomElement } from '@dcloudio/uni-shared'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

const rollupPlugins = [
  replace({
    values: {
      defineOnApi: `/*#__PURE__*/ defineOnApi`,
      defineOffApi: `/*#__PURE__*/ defineOffApi`,
      defineTaskApi: `/*#__PURE__*/ defineTaskApi`,
      defineSyncApi: `/*#__PURE__*/ defineSyncApi`,
      defineAsyncApi: `/*#__PURE__*/ defineAsyncApi`,
      __IMPORT_META_ENV_BASE_URL__: 'import.meta.env.BASE_URL', //直接使用import.meta.env.BASE_URL会被vite替换成'/'
    },
    preventAssignment: true,
  }),

  jscc({
    values: {
      // 该插件限制了不能以__开头
      _NODE_JS_: 0,
    },
    // 忽略 pako 内部条件编译
    exclude: [resolve('../../node_modules/pako/**')],
  }),
]

export default defineConfig({
  root: __dirname,
  define: {
    global: 'window',
    __DEV__: true,
    __TEST__: false,
    __PLATFORM__: JSON.stringify('h5'),
    __NODE_JS__: false,
  },
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: resolve('../uni-app-vue/src/view/index.ts'),
      },
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
        find: '@dcloudio/uni-components/style',
        replacement: resolve('../uni-components/style'),
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
    minify: false,
    lib: {
      name: 'uni-app-view',
      fileName: 'uni-app-view',
      entry: path.resolve(__dirname, 'src/view/index.ts'),
      formats: ['umd'],
    },
    assetsDir: '.',
    rollupOptions: {
      // output: {
      //   globals: {
      //     vue: 'Vue',
      //   },
      // },
      // external(source) {
      //   if (['vue'].includes(source)) {
      //     return true
      //   }
      // },
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
