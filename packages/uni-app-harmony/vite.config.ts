import fs from 'fs-extra'
import path from 'path'

import { defineConfig } from 'vite'

import jscc from 'rollup-plugin-jscc'
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from '@rollup/plugin-babel'
import { sync } from 'fast-glob'

import {
  capitalize,
  createAppHarmonyUniModulesSyncFilePreprocessorOnce,
  cssTarget,
  parseInjects,
} from '@dcloudio/uni-cli-shared'
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
const copyEtsFunctions: Function[] = []

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
    {
      name: 'init-arkts-ext-api',
      async configResolved() {
        await initArkTSExtApi()
      },
    },
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

interface IGenerateSourceFilesOptions {
  isX: boolean
  exclude: string[]
  sourceDirs: string[]
  type: 'api'
  tempDir: string
  external: string[]
}

async function generateExtApiSource({
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

    const pagesDir = path.resolve(uniModulePath, 'pages')
    const componentsDir = path.resolve(uniModulePath, 'components')
    const customElementsDir = path.resolve(uniModulePath, 'customElements')
    if (
      !external.includes(uniModuleName) &&
      (fs.existsSync(pagesDir) ||
        fs.existsSync(componentsDir) ||
        fs.existsSync(customElementsDir))
    ) {
      continue
    }

    const injects = parseExtApiInjects(uniModulePath)

    if (isX) {
      // 移除 不支持 x-arkts 的 api，比如 uni-media/previewImage
      Object.keys(injects).forEach((key) => {
        const options = injects[key]
        if (
          Array.isArray(options) &&
          options.length === 3 &&
          typeof options[2] === 'object' &&
          options[2]['x-arkts'] === false
        ) {
          delete injects[key]
        }
      })
    }
    if (
      external.includes(uniModuleName) ||
      (type === 'api' && Object.keys(injects).length > 0)
    ) {
      await copyExtApiModule(
        uniModulePath,
        path.resolve(tempDir, uniModuleName),
        createAppHarmonyUniModulesSyncFilePreprocessorOnce(isX)
      )
      // fs.copySync(uniModulePath, path.resolve(tempDir, uniModuleName))
      if (commonEntryExists && !platformEntryExists) {
        fs.outputFileSync(
          path.resolve(tempDir, uniModuleName, 'utssdk/app-harmony/index.uts'),
          'export * from "../index.uts"'
        )
      }
    }

    if (external.includes(uniModuleName)) {
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

  const etsFiles = sync('**/*.{ets,js,ts,har}', {
    cwd: tempDir,
    ignore: external.map((name) => `${name}/**`),
  })
  copyEtsFunctions.push(() => {
    for (const etsFile of etsFiles) {
      fs.copySync(
        path.resolve(tempDir, etsFile),
        path.resolve(__dirname, isX ? 'dist-x' : 'dist', etsFile)
      )
    }
  })
}

function copyExtApiModule(
  from: string,
  to: string,
  preprocessor: (code: string, fileName: string) => Promise<string>
) {
  return Promise.all(
    sync('**/*', {
      cwd: from,
      onlyFiles: true,
    }).map(async (file) => {
      if (file.endsWith('.uts')) {
        fs.outputFileSync(
          path.resolve(to, file),
          await preprocessor(
            fs.readFileSync(path.resolve(from, file), 'utf-8'),
            file
          )
        )
      } else {
        const toFile = path.resolve(to, file)
        fs.ensureDirSync(path.dirname(toFile))
        fs.copyFileSync(path.resolve(from, file), toFile)
      }
    })
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

type IExternalModuleJsonItem =
  | IExternalApiModuleJsonItem
  | IExternalProviderModuleJsonItem

interface IGenerateExternalModuleJsonOptions {
  tempDir: string
  external: string[]
}
/**
 * 编译出的外部模块信息供编译器使用
 */
function generateExternalModuleJson({
  tempDir,
  external,
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
        type: 'extapi',
        plugin,
        apis,
        version,
      })
      continue
    }
  }
  return externalModules
}

async function initArkTSExtApi() {
  if (
    !process.env.UNI_APP_EXT_API_DIR ||
    !process.env.UNI_APP_EXT_API_INTERNAL_DIR
  ) {
    return
  }

  // uni-app
  await (async () => {
    const external = ExternalModules.map((item) => item.name)
    const tempDir = resolveExtApiTempDir('uni-app-harmony')
    fs.emptyDirSync(tempDir)
    await generateExtApiSource({
      isX: false,
      exclude: ExtApiBlackList,
      external,
      sourceDirs: [
        process.env.UNI_APP_EXT_API_DIR!,
        process.env.UNI_APP_EXT_API_INTERNAL_DIR!,
      ],
      type: 'api',
      tempDir,
    })
    const externalModuleJson = generateExternalModuleJson({
      tempDir,
      external,
    })
    fs.outputJSONSync(
      resolve('./src/compiler/external-modules.json'),
      externalModuleJson,
      { spaces: 2 }
    )
  })()

  // uni-app-x
  await (async () => {
    const external = ExternalModulesX.map((item) => item.name)
    const tempDir = resolveExtApiTempDir('uni-app-harmony') + '-x'
    fs.emptyDirSync(tempDir)
    await generateExtApiSource({
      isX: true,
      exclude: ExtApiBlackListX,
      external: external,
      sourceDirs: [
        process.env.UNI_APP_EXT_API_DIR!,
        process.env.UNI_APP_EXT_API_INTERNAL_DIR!,
      ],
      type: 'api',
      tempDir: tempDir,
    })
    const externalApiModuleJson = generateExternalModuleJson({
      tempDir,
      external,
    })
    fs.outputJSONSync(
      resolve('./src/compiler/external-modules-x.json'),
      externalApiModuleJson,
      { spaces: 2 }
    )
  })()
}
