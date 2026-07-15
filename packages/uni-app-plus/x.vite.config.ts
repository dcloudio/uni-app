import path from 'path'
import { type UserConfig, defineConfig } from 'vite'
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
import {
  isAppHarmonyUVueNativeTag,
  isAppIOSUVueNativeTag,
} from '@dcloudio/uni-shared'
import autoprefixer from 'autoprefixer'
import { uts2ts } from '../../scripts/ext-api'

import { initUniAppJsEngineDom1CssPlugin } from '@dcloudio/uni-app-uts'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

declare const process: any

process.env.UNI_APP_X = 'true'
process.env.UNI_UTS_PLATFORM = process.env.X_RUNTIME_PLATFORM || 'app-ios'
initPreContext(
  process.env.UNI_UTS_PLATFORM === 'app-harmony' ? 'app-harmony' : 'app',
  {},
  process.env.UNI_UTS_PLATFORM,
  true
)

const apiDirs: string[] = []
if (process.env.UNI_APP_EXT_API_DIR) {
  apiDirs.push(process.env.UNI_APP_EXT_API_DIR)
}
// if (process.env.UNI_APP_EXT_COMPONENT_DIR) {
//   apiDirs.push(process.env.UNI_APP_EXT_COMPONENT_DIR)
// }
if (process.env.UNI_APP_EXT_API_DCLOUD_DIR) {
  apiDirs.push(process.env.UNI_APP_EXT_API_DCLOUD_DIR)
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
      __UNI_FEATURE_LONGPRESS__: JSON.stringify(true),
    },
    preventAssignment: true,
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

type X_RUNTIME_PLATFORM = 'app-harmony' | 'app-ios' | 'app-android'

function resolveEntryFileName(platform: X_RUNTIME_PLATFORM, isVapor: boolean) {
  if (isVapor) {
    return `uni.x.runtime.${platform.replace('app-', '')}.vapor.esm.js`
  }
  return platform === 'app-harmony'
    ? 'uni.x.runtime.harmony.esm.js'
    : 'uni.x.runtime.esm.js'
}

function createConfig(
  platform: X_RUNTIME_PLATFORM,
  isVapor: boolean
): UserConfig {
  const isNativeTag =
    platform === 'app-harmony'
      ? isAppHarmonyUVueNativeTag
      : isAppIOSUVueNativeTag
  console.error('jscc', {
    // 该插件限制了不能以__开头
    _NODE_JS_: 0,
    _X_: 1,
    _VAPOR_: isVapor ? 1 : 0,
    _APP_IOS_: platform === 'app-ios' ? 1 : 0,
    _APP_ANDROID_: platform === 'app-android' ? 1 : 0,
    _APP_HARMONY_: platform === 'app-harmony' ? 1 : 0,
  })
  return {
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
      __VAPOR__: isVapor,
      __VAPOR_PLATFORM__: isVapor ? JSON.stringify(platform) : false,
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
      uniPrePlugin({} as any, { include: ['**/*.vue', '**/*.uts'] }),
      uniUVueTypeScriptPlugin(),
      uniRemoveCssScopedPlugin(),
      {
        name: 'uni-x:ios',
        configResolved(config) {
          initUniAppJsEngineDom1CssPlugin(config)
        },
      },
      uts2ts({ target: 'uni-app-plus', platform: 'app-js' }),
      vue({
        customElement: true,
        template: {
          compilerOptions: {
            isNativeTag,
            expressionPlugins: ['typescript'],
          },
        },
        script: {
          babelParserPlugins: ['typescript'],
        },
      }),
      vueJsx({ optimize: true, isCustomElement: isNativeTag }),
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
          entryFileNames: resolveEntryFileName(platform, isVapor),
        },
        preserveEntrySignatures: 'strict',
        plugins: [
          jscc({
            values: {
              // 该插件限制了不能以__开头
              _NODE_JS_: 0,
              _X_: 1,
              _VAPOR_: isVapor ? 1 : 0,
              _APP_IOS_: platform === 'app-ios' ? 1 : 0,
              _APP_ANDROID_: platform === 'app-android' ? 1 : 0,
              _APP_HARMONY_: platform === 'app-harmony' ? 1 : 0,
            },
            // 忽略 pako 内部条件编译
            exclude: [/pako/ as unknown as string],
          }),
          ...rollupPlugins,
        ],
        onwarn: (msg, warn) => {
          if (!String(msg).includes('external module "vue" but never used')) {
            warn(msg)
          }
        },
        external: ['vue', '@vue/shared', '@dcloudio/uni-shared'],
      },
    },
  }
}

export default defineConfig(
  createConfig(
    process.env.X_RUNTIME_PLATFORM as X_RUNTIME_PLATFORM,
    process.env.X_VAPOR === 'true'
  )
)
