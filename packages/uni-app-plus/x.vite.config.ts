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
  uniRemoveCssScopedPlugin,
  uniUVueTypeScriptPlugin,
} from '@dcloudio/uni-cli-shared'
import { isAppIOSUVueNativeTag } from '@dcloudio/uni-shared'
import autoprefixer from 'autoprefixer'
import { uts2ts, syncPagesFile } from '../../scripts/ext-api'

import { initUniAppJsEngineCssPlugin } from '@dcloudio/uni-app-uts'
import { OutputChunk } from 'rollup'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

process.env.UNI_APP_X = 'true'
process.env.UNI_UTS_PLATFORM = 'app-ios'
initPreContext('app', {}, 'app-ios', true)

const apiDirs: string[] = []
if (process.env.UNI_APP_EXT_API_DIR) {
  apiDirs.push(process.env.UNI_APP_EXT_API_DIR)
}
if (process.env.UNI_APP_EXT_API_DCLOUD_DIR) {
  apiDirs.push(process.env.UNI_APP_EXT_API_DCLOUD_DIR)
}
const systemPagePaths = syncPagesFile(apiDirs)

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
      _X_: 1,
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

export default defineConfig({
  root: __dirname,
  define: {
    __DEV__: false,
    __TEST__: false,
    __PLATFORM__: JSON.stringify('app'),
    __NODE_JS__: false,
    __APP_VIEW__: false,
    __UNI_FEATURE_I18N_EN__: true,
    __UNI_FEATURE_I18N_ES__: true,
    __UNI_FEATURE_I18N_FR__: true,
    __UNI_FEATURE_I18N_ZH_HANS__: true,
    __UNI_FEATURE_I18N_ZH_HANT__: true,
    __X__: true,
  },
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: resolve('../uni-app-vue/src/uvue/index.ts'),
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
    extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.js', '.json', '.vue'],
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android > 4.4', 'iOS >= 10'],
        }),
      ],
    },
  },
  plugins: [
    uniPrePlugin({} as any, { include: ['**/*.vue'] }),
    uniUVueTypeScriptPlugin(),
    uniRemoveCssScopedPlugin(),
    {
      name: 'uni-x:ios',
      configResolved(config) {
        initUniAppJsEngineCssPlugin(config)
      },
    },
    uts2ts({ target: 'uni-app-plus', platform: 'app-js' }),
    vue({
      customElement: true,
      template: {
        compilerOptions: {
          isNativeTag: isAppIOSUVueNativeTag,
          expressionPlugins: ['typescript'],
        },
      },
      script: {
        babelParserPlugins: ['typescript'],
      },
    }),
    vueJsx({ optimize: true, isCustomElement: isAppIOSUVueNativeTag }),
    {
      name: 'uni:replace-page-paths',
      generateBundle(_, bundle) {
        Object.keys(bundle).forEach((key) => {
          if (key.endsWith('.js')) {
            const chunk = bundle[key] as OutputChunk
            let newCode = chunk.code
            Object.keys(systemPagePaths).forEach((path) => {
              if (newCode.includes(path)) {
                newCode = newCode.replace(
                  new RegExp(path, 'g'),
                  systemPagePaths[path]
                )
              }
            })
            chunk.code = newCode
          }
        })
      },
    },
  ],
  build: {
    emptyOutDir: false,
    target: 'modules',
    cssTarget,
    minify: 'terser',
    cssCodeSplit: false,
    lib: {
      fileName: 'uni.x.runtime',
      entry: path.resolve(__dirname, 'src/x/index.ts'),
      formats: ['es'],
    },
    polyfillModulePreload: false,
    modulePreload: false,
    assetsDir: '.',
    rollupOptions: {
      treeshake: 'smallest',
      output: {
        dir: 'dist',
        freeze: false,
        entryFileNames: 'uni.x.runtime.esm.js',
      },
      preserveEntrySignatures: 'strict',
      plugins: rollupPlugins,
      onwarn: (msg, warn) => {
        if (!String(msg).includes('external module "vue" but never used')) {
          warn(msg)
        }
      },
      external: ['vue', '@vue/shared', '@dcloudio/uni-shared'],
    },
  },
})
