import path from 'path'

import { defineConfig } from 'vite'

import jscc from 'rollup-plugin-jscc'
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from '@rollup/plugin-babel'

import {
  cssTarget,
  initPreContext,
  uniPrePlugin,
} from '@dcloudio/uni-cli-shared'
import { isH5CustomElement } from '@dcloudio/uni-shared'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

initPreContext('app-harmony', {}, 'app-harmony', false)

const prePlugin = uniPrePlugin({} as any, {
  // 先剥离条件编译，再交给 vue / jsx 解析，避免带 #if/#endif 的 TSX 直接进入语义解析并触发报错。
  // 这个前置处理也会减少无效解析的工作量。
  include: ['**/*.vue', '**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
  exclude: ['**/node_modules/**'],
})
prePlugin.enforce = 'pre'

const rollupPlugins = [
  replace({
    values: {
      defineOnApi: `/*#__PURE__*/ defineOnApi`,
      defineOffApi: `/*#__PURE__*/ defineOffApi`,
      defineTaskApi: `/*#__PURE__*/ defineTaskApi`,
      defineSyncApi: `/*#__PURE__*/ defineSyncApi`,
      defineAsyncApi: `/*#__PURE__*/ defineAsyncApi`,
      __IMPORT_META_ENV_BASE_URL__: 'import.meta.env.BASE_URL', //直接使用import.meta.env.BASE_URL会被vite替换成'/'
      __UNI_FEATURE_LONGPRESS__: JSON.stringify(true),
    },
    preventAssignment: true,
  }),
  jscc({
    values: {
      // 该插件限制了不能以__开头
      _NODE_JS_: 0,
      _X_: 0,
      _VAPOR_: 0,
      _APP_IOS_: 0,
      _APP_HARMONY_: 1,
      _APP_ANDROID_: 0,
    },
    // 忽略 pako 内部条件编译
    exclude: [/pako/ as unknown as string],
  }),
  babel({
    babelHelpers: 'bundled',
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: 2,
          useBuiltIns: 'usage',
          targets: ['ios >= 10'],
        },
      ],
    ],
  }),
]
const copyEtsFunctions: Function[] = []
const plugins = [
  {
    name: 'init-arkts-ext-api',
    async configResolved() {
      // await initArkTSExtApi()
    },
  },
  prePlugin,
  vue({
    template: {
      compilerOptions: {
        isCustomElement: isH5CustomElement,
      },
    },
  }),
  vueJsx({ optimize: true, isCustomElement: isH5CustomElement }),
  {
    name: 'copy-ets-files',
    generateBundle() {
      // TODO 优化此逻辑
      copyEtsFunctions.forEach((fn) => fn())
    },
  },
]

export default defineConfig({
  root: __dirname,
  define: {
    global: 'window',
    __DEV__: false,
    __TEST__: false,
    __PLATFORM__: JSON.stringify('app'),
    __NODE_JS__: false,
    __APP_VIEW__: true,
    __UNI_FEATURE_I18N_EN__: true,
    __UNI_FEATURE_I18N_ES__: true,
    __UNI_FEATURE_I18N_FR__: true,
    __UNI_FEATURE_I18N_ZH_HANS__: true,
    __UNI_FEATURE_I18N_ZH_HANT__: true,
    __IMPORT_META_ENV_BASE_URL__: JSON.stringify(''),
    'process.env.NODE_ENV': JSON.stringify('production'),
    __X__: false,
    __PLUS__: false,
    'plus.os.name': "'HarmonyOS'",
    'plus.os.version': "''",
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
        find: '@dcloudio/uni-app-plus/style',
        replacement: resolve('../uni-app-plus/style'),
      },
      {
        find: '@dcloudio/uni-app-plus',
        replacement: resolve('../uni-app-plus/src'),
      },
      {
        find: '@dcloudio/uni-h5/style',
        replacement: resolve('../uni-h5/style'),
      },
      {
        find: '@dcloudio/uni-h5',
        replacement: resolve('../uni-h5/src'),
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
      {
        find: '@dcloudio/uni-uts-v1',
        replacement: resolve('../uni-uts-v1'),
      },
    ],
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['Android > 4.4', 'iOS >= 10'],
        }),
      ],
    },
  },
  plugins,
  oxc: {
    // 强制为 es2015，否则默认是 esnext，会生成更激进的转译结果，
    // 部分 API 写的时候使用了动态定义 prototype 的方式，和这些结果会冲突，比如 createCanvasContext
    target: 'es2015',
  },
  build: {
    target: 'es2015',
    cssTarget,
    // 暂不压缩
    minify: false,
    cssCodeSplit: false,
    lib: {
      name: 'uni-app-view',
      fileName: 'uni-app-view',
      cssFileName: 'style',
      entry: path.resolve(__dirname, 'src/view/index.ts'),
      formats: ['umd'],
    },
    assetsDir: '.',
    rolldownOptions: {
      // 允许类型导出在 Rolldown 里以空值占位，避免缺失导出直接中断构建。
      shimMissingExports: true,
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
