import fs from 'fs-extra'
import path from 'path'

import { defineConfig } from 'vite'

import jscc from 'rollup-plugin-jscc'
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from '@rollup/plugin-babel'

import { capitalize, cssTarget, parseInjects } from '@dcloudio/uni-cli-shared'
import { isH5CustomElement } from '@dcloudio/uni-shared'
import { resolveExtApiTempDir } from '../../scripts/ext-api'

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
      __UNI_FEATURE_LONGPRESS__: JSON.stringify(true),
    },
    preventAssignment: true,
  }),
  jscc({
    values: {
      // 该插件限制了不能以__开头
      _NODE_JS_: 0,
      _X_: 0,
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
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: isH5CustomElement,
        },
      },
    }),
    vueJsx({ optimize: true, isCustomElement: isH5CustomElement }),
  ],
  esbuild: {
    // 强制为 es2015，否则默认为 esnext，将会生成 __publicField 代码，
    // 部分 API 写的时候，使用了动态定义 prototype 的方式，与 __publicField 冲突，比如 createCanvasContext
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

function parseExtApiInjects(uniModulesDir: string) {
  return parseInjects(
    true,
    'app-harmony',
    'arkts', // javascript|kotlin|swift (不传入)
    '',
    uniModulesDir,
    require(path.resolve(uniModulesDir, 'package.json'))?.uni_modules[
      'uni-ext-api'
    ] || {}
  )
}

function parseExtApiProvider(uniModulesDir: string) {
  const exiApiConfig =
    require(path.resolve(uniModulesDir, 'package.json'))?.uni_modules[
      'uni-ext-api'
    ] || {}
  if (
    exiApiConfig.provider &&
    exiApiConfig.provider.service &&
    exiApiConfig.provider.name
  ) {
    return {
      service: exiApiConfig.provider.service,
      name: exiApiConfig.provider.name,
    }
  }
}

initArkTSExtApi()

function initArkTSExtApi() {
  if (!process.env.UNI_APP_EXT_API_DIR) {
    return
  }
  // 遍历所有 ext-api，查找已实现 app-harmony 的 ext-api
  const extApiDir = path.resolve(process.env.UNI_APP_EXT_API_DIR)
  const extApiTempDir = resolveExtApiTempDir('uni-app-harmony')
  const importExtApis: string[] = []
  const exportExtApis: string[] = []
  const defineExtApis: string[] = []
  const uniExtApis: string[] = []
  // TODO 优化编译配置的生成及传递
  const extApiProviderBuildJson = JSON.parse(
    JSON.stringify(
      require(path.resolve(__dirname, 'build.ets.json')).find(
        (item) => !!item.input['temp/uni-ext-api/index.uts']
      )
    )
  )
  delete extApiProviderBuildJson.input['temp/uni-ext-api/index.uts']
  delete extApiProviderBuildJson.wrapper
  // TODO 所有依赖均自动引入
  extApiProviderBuildJson.autoImports['@dcloudio/uni-app-harmony'].push(
    ['RequestPayment'],
    ['RequestPaymentOptions'],
    ['RequestPaymentFail'],
    ['RequestPaymentSuccess'],
    ['UniPaymentProvider']
  )

  for (const extApi of fs.readdirSync(extApiDir)) {
    const extApiPath = path.resolve(extApiDir, extApi)
    if (
      !fs.existsSync(
        path.resolve(extApiPath, 'utssdk', 'app-harmony', 'index.uts')
      )
    ) {
      continue
    }
    const extApiProvider = parseExtApiProvider(extApiPath)
    if (extApiProvider) {
      fs.copySync(extApiPath, path.resolve(extApiTempDir, extApi))
      extApiProviderBuildJson.input[
        `temp/uni-ext-api/${extApi}/utssdk/app-harmony/index.uts`
      ] = `providers/${extApi}/index.ets`
      continue
    }
    const injects = parseExtApiInjects(extApiPath)
    if (Object.keys(injects).length === 0) {
      continue
    }
    const apiSpecifiers: string[] = []
    const apiTypeSpecifiers: string[] = []
    Object.keys(injects).forEach((key) => {
      const api = injects[key][1]
      const apiType =
        api[0] === '$' ? '$' + capitalize(api.slice(1)) : capitalize(api)
      apiSpecifiers.push(api)
      apiTypeSpecifiers.push(apiType)
      defineExtApis.push(api)
      uniExtApis.push(
        `${api}: ${apiType === 'Request' ? 'Request<Object>' : apiType}`
      ) // TODO 支持泛型
    })
    importExtApis.push(
      `import { ${apiSpecifiers.join(
        ', '
      )} } from './${extApi}/utssdk/app-harmony/index.uts'`
    )
    importExtApis.push(
      `import { ${apiTypeSpecifiers.join(
        ', '
      )} } from './${extApi}/utssdk/interface.uts'`
    )
    exportExtApis.push(
      `export * from './${extApi}/utssdk/app-harmony/index.uts'`
    )
    fs.copySync(extApiPath, path.resolve(extApiTempDir, extApi))
  }
  if (Object.keys(extApiProviderBuildJson.input).length > 0) {
    fs.writeFileSync(
      path.resolve(extApiTempDir, 'provider.build.json'),
      JSON.stringify(extApiProviderBuildJson, null, 2)
    )
  }
  // 生成 ext-api/index.ts
  const extApiIndex = path.resolve(extApiTempDir, 'index.uts')
  fs.writeFileSync(
    extApiIndex,
    `${importExtApis.join('\n')}
${exportExtApis.join('\n')}
interface UniExtApi {
  ${uniExtApis.join(',\n  ')}
}
export default {
  ${defineExtApis.join(',\n  ')}
} as UniExtApi`
  )
}
