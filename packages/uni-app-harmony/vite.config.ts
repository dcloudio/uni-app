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
import {
  ExtApiBlackList,
  ExtApiBlackListX,
  ExternalModules,
  ExternalModulesX,
} from './src/compiler/constants'

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

initArkTSExtApi()

function getExtApiPaths(dirs: string[]) {
  return dirs.reduce((paths: Record<string, string>, dir: string) => {
    for (const extApi of fs.readdirSync(dir)) {
      if (extApi.startsWith('.')) {
        continue
      }
      paths[extApi] = path.resolve(dir, extApi)
    }
    return paths
  }, {} as Record<string, string>)
}

interface IBuildHarJsonItem {
  input: string
  output: string
  plugin: string
}

interface IGenerateSourceFilesOptions {
  isX: boolean
  exclude: string[]
  sourceDirs: string[]
  type: 'api' | 'component'
  tempDir: string
  external: string[]
}

function generateExtApiSource({
  isX,
  exclude,
  sourceDirs,
  type,
  tempDir,
  external,
}: IGenerateSourceFilesOptions) {
  const store = getExtApiPaths(sourceDirs)
  const importExtApis: string[] = []
  const exportExtApis: string[] = []
  const defineExtApis: string[] = []
  const uniExtApis: string[] = []
  const buildHarJsonPath = path.resolve(tempDir, 'build.har.json')
  const buildHarJson: IBuildHarJsonItem[] = fs.existsSync(buildHarJsonPath)
    ? fs.readJsonSync(buildHarJsonPath)
    : []
  for (const uniModuleName in store) {
    if (exclude.includes(uniModuleName)) {
      continue
    }
    const uniModulePath = store[uniModuleName]
    const platformEntryPath = path.resolve(
      uniModulePath,
      `utssdk/app-harmony/index.uts`
    )
    const commonEntryPath = path.resolve(uniModulePath, 'utssdk/index.uts')
    const platformEntryExists = fs.existsSync(platformEntryPath)
    const commonEntryExists = fs.existsSync(commonEntryPath)
    if (!platformEntryExists && !commonEntryExists) {
      continue
    }
    const injects = parseExtApiInjects(uniModulePath)

    if (
      external.includes(uniModuleName) ||
      type === 'component' ||
      (type === 'api' && Object.keys(injects).length > 0)
    ) {
      fs.copySync(uniModulePath, path.resolve(tempDir, uniModuleName))
      if (commonEntryExists && !platformEntryExists) {
        fs.outputFileSync(
          path.resolve(tempDir, uniModuleName, 'utssdk/app-harmony/index.uts'),
          'export * from "../index.uts"'
        )
      }
    }

    if (external.includes(uniModuleName)) {
      buildHarJson.push({
        input: path.resolve(tempDir, uniModuleName),
        output: path.resolve(
          __dirname,
          isX ? 'dist-x' : 'dist',
          `packages/${uniModuleName}`
        ),
        plugin: uniModuleName,
      })
      continue
    }

    if (type === 'api' && Object.keys(injects).length === 0) {
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
      )} } from './${uniModuleName}/utssdk/app-harmony/index.uts'`
    )
    importExtApis.push(
      `import { ${apiTypeSpecifiers.join(
        ', '
      )} } from './${uniModuleName}/utssdk/interface.uts'`
    )
    exportExtApis.push(
      `export * from './${uniModuleName}/utssdk/app-harmony/index.uts'`
    )
  }
  fs.writeFileSync(
    path.resolve(tempDir, 'build.har.json'),
    JSON.stringify(buildHarJson, null, 2)
  )
  // 生成 ext-api/index.ts
  const extApiIndex = path.resolve(tempDir, 'index.uts')
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

interface IExternalApiModuleJsonItem {
  type: 'extapi'
  plugin: string
  apis: string[]
  version: string
}

interface IExternalProviderModuleJsonItem {
  type: 'provider'
  plugin: string
  provider: string
  service: string
  version: string
}

interface IExternalComponentModuleJsonItem {
  type: 'component'
  plugin: string
  // 目前无此规范也无需记录
  // components: string[]
  /**
   * 例：
   * uni-video包含createVideoContext
   * uni-map-tencent包含createMapContext
   */
  apis: string[]
  version: string
}

type IExternalModuleJsonItem =
  | IExternalApiModuleJsonItem
  | IExternalProviderModuleJsonItem
  | IExternalComponentModuleJsonItem

interface IGenerateExternalModuleJsonOptions {
  tempDir: string
  external: string[]
  isComponent: boolean
}
/**
 * 编译出的外部模块信息供编译器使用
 */
function generateExternalModuleJson({
  tempDir,
  external,
  isComponent,
}: IGenerateExternalModuleJsonOptions) {
  const uniModuleNames = fs.readdirSync(tempDir)
  const externalModules: IExternalModuleJsonItem[] = []
  for (const uniModuleName of uniModuleNames) {
    if (!external.includes(uniModuleName)) {
      continue
    }
    const uniModulePath = path.resolve(tempDir, uniModuleName)
    const packageJsonPath = path.resolve(uniModulePath, 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
      continue
    }
    const packageJson = fs.readJsonSync(packageJsonPath)
    const plugin = uniModuleName
    const version = packageJson.version
    /**
     * 前置步骤一定会生成utssdk/app-harmony/index.uts
     */
    const entryPath = path.resolve(
      uniModulePath,
      'utssdk/app-harmony/index.uts'
    )
    const entryExists = fs.existsSync(entryPath)
    if (!entryExists) {
      continue
    }
    const provider = packageJson.uni_modules?.['uni-ext-api']?.provider
    if (provider) {
      externalModules.push({
        type: 'provider',
        plugin,
        provider: provider.name,
        service: provider.service,
        version,
      })
      continue
    } else {
      const injects = parseExtApiInjects(uniModulePath)
      const apis = Object.keys(injects)
        .filter((key) => {
          const inject = injects[key]
          return Array.isArray(inject) && inject.length > 1
        })
        .map((key) => injects[key][1])
      externalModules.push({
        type: isComponent ? 'component' : 'extapi',
        plugin,
        apis,
        version,
      })
      continue
    }
  }
  return externalModules
}

function initArkTSExtApi() {
  if (
    !process.env.UNI_APP_EXT_API_DIR ||
    !process.env.UNI_APP_EXT_API_INTERNAL_DIR
  ) {
    return
  }

  // uni-app
  ; (() => {
    const external = ExternalModules.map((item) => item.name)
    const tempDir = resolveExtApiTempDir('uni-app-harmony')
    fs.emptyDirSync(tempDir)
    generateExtApiSource({
      isX: false,
      exclude: ExtApiBlackList,
      external,
      sourceDirs: [
        process.env.UNI_APP_EXT_API_DIR,
        process.env.UNI_APP_EXT_API_INTERNAL_DIR,
      ],
      type: 'api',
      tempDir,
    })
    const externalModuleJson = generateExternalModuleJson({
      tempDir,
      external,
      isComponent: false,
    })
    fs.outputJSONSync(
      resolve('./src/compiler/external-modules.json'),
      externalModuleJson,
      { spaces: 2 }
    )
  })()

    // uni-app-x
    ; (() => {
      const external = ExternalModulesX.map((item) => item.name)
      const tempDir = resolveExtApiTempDir('uni-app-harmony') + '-x'
      fs.emptyDirSync(tempDir)
      generateExtApiSource({
        isX: true,
        exclude: ExtApiBlackListX,
        external: external,
        sourceDirs: [
          process.env.UNI_APP_EXT_API_DIR,
          process.env.UNI_APP_EXT_API_INTERNAL_DIR,
        ],
        type: 'api',
        tempDir: tempDir,
      })
    })()
}
