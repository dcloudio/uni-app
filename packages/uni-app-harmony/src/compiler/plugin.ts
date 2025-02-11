import path from 'path'
import {
  type UniVitePlugin,
  buildUniExtApis,
  camelize,
  formatExtApiProviderName,
  getCurrentCompiledUTSPlugins,
  getCurrentCompiledUTSProviders,
  getUniExtApiProviderRegisters,
  isNormalCompileTarget,
  parseManifestJsonOnce,
  parseUniExtApi,
} from '@dcloudio/uni-cli-shared'
import type { OutputChunk, PluginContext } from 'rollup'
import ExternalModuls from './external-modules.json'
import ExternalModulsX from './external-modules-x.json'

const StandaloneExtApis =
  process.env.UNI_APP_X === 'true' ? ExternalModulsX : ExternalModuls

const commandGlobals: Record<string, string> = {
  vue: 'Vue',
  '@vue/shared': 'uni.VueShared',
}

const harmonyGlobals: (string | RegExp)[] = [
  /^@ohos\./,
  /^@kit\./,
  /^@hms\./,
  /^@arkts\./,
  /^@system\./,
  '@ohos/hypium',
  '@ohos/hamock',
]

function isHarmonyGlobal(id: string) {
  return harmonyGlobals.some((harmonyGlobal) =>
    typeof harmonyGlobal === 'string'
      ? harmonyGlobal === id
      : harmonyGlobal.test(id)
  )
}

function generateHarmonyImportSpecifier(id: string) {
  return id.replace(/([@\/\.])/g, function (_, $1) {
    switch ($1) {
      case '.':
        return '_'
      case '/':
        return '__'
      default:
        return ''
    }
  })
}

function generateHarName(moduleName: string) {
  return moduleName.replace(/@/g, '').replace(/\//g, '__').replace(/-/g, '_')
}

function generateHarmonyImportExternalCode(harmonyPackageNames: string[]) {
  return harmonyPackageNames
    .filter((harmonyPackageName) => isHarmonyGlobal(harmonyPackageName))
    .map(
      (harmonyPackageName) =>
        `import ${generateHarmonyImportSpecifier(
          harmonyPackageName
        )} from '${harmonyPackageName}';`
    )
    .join('')
}

export function uniAppHarmonyPlugin(): UniVitePlugin {
  return {
    name: 'uni:app-harmony',
    apply: 'build',
    config() {
      return {
        build: {
          rollupOptions: {
            external: [...Object.keys(commandGlobals), ...harmonyGlobals],
            output: {
              globals: function (id: string) {
                if (id.startsWith('@kit.')) {
                  console.warn(
                    '@kit开头的包无法在页面或组件内正常使用，请改用其他方式引用，或使用uts插件引用。'
                  )
                }
                return (
                  commandGlobals[id] ||
                  (isHarmonyGlobal(id)
                    ? generateHarmonyImportSpecifier(id)
                    : '')
                )
              },
            },
          },
        },
      }
    },
    async generateBundle(_, bundle) {
      const utsExtApis = new Set<string>()
      const utsPlugins = getCurrentCompiledUTSPlugins()
      const utsProviders = getCurrentCompiledUTSProviders()
      // utsPlugins.difference(utsProviders)
      utsPlugins.forEach((plugin) => {
        if (utsProviders.has(plugin)) {
          return
        }
        utsExtApis.add(plugin)
      })
      // 此方法仅需要处理非provider
      genAppHarmonyUniModules(this, process.env.UNI_INPUT_DIR, utsExtApis)
      for (const key in bundle) {
        const serviceBundle = bundle[key] as OutputChunk
        if (serviceBundle.code) {
          serviceBundle.code =
            generateHarmonyImportExternalCode(serviceBundle.imports) +
            serviceBundle.code
        }
      }
    },
    async writeBundle() {
      if (!isNormalCompileTarget()) {
        return
      }
      // 1.0 特有逻辑，x 上由其他插件完成
      if (process.env.UNI_APP_X !== 'true') {
        // x 上暂时编译所有uni ext api，不管代码里是否调用了
        await buildUniExtApis()
      }
    },
  }
}

/**
 * extapi分为如下几种
 * 1. 内部extapi，编译到uni.api.ets内
 * 2. 内部provider，编译到uni.api.ets内。目前不存在这种场景，所有provider都是单独的ohpm包
 * 3. 内部extapi，发布到ohpm
 * 4. 内部provider，发布到ohpm
 * 5. 用户自定义extapi
 * 6. 用户自定义provider
 */

interface IRelatedProvider {
  service: string
  name: string
}

// 仅存放重命名的provider service
const SupportedProviderService = {
  'uni-oauth': {
    huawei: 'huawei',
  },
  'uni-payment': {
    weixin: 'wxpay',
  },
}

/**
 * 获取manifest.json中勾选的provider
 */
function getRelatedProviders(inputDir: string): IRelatedProvider[] {
  const manifest = parseManifestJsonOnce(inputDir)
  const providers: IRelatedProvider[] = []
  const manifestModules = manifest?.['app-harmony']?.distribute?.modules
  if (!manifestModules) {
    return providers
  }
  for (const uniModule in manifestModules) {
    if (Object.prototype.hasOwnProperty.call(manifestModules, uniModule)) {
      const ProviderNameMap = SupportedProviderService[uniModule]
      if (!ProviderNameMap) {
        continue
      }
      const relatedProviders = manifestModules[uniModule]
      for (const name in relatedProviders) {
        if (Object.prototype.hasOwnProperty.call(relatedProviders, name)) {
          const providerConf = relatedProviders[name]
          if (!providerConf) {
            continue
          }
          if (
            !providerConf.__platform__ ||
            (Array.isArray(providerConf.__platform__) &&
              providerConf.__platform__.includes('harmonyos'))
          ) {
            const providerName = ProviderNameMap[name]
            providers.push({
              service: uniModule.replace(/^uni-/, ''),
              name: providerName || name,
            })
          }
        }
      }
    }
  }
  return providers
}

const SupportedModules = {
  'uni-facialRecognitionVerify': 'uni-facialRecognitionVerify',
  'uni-push': 'uni-push',
  'uni-verify': 'uni-verify',
}

// 获取uni_modules中的相关模块
function getRelatedModules(inputDir: string): string[] {
  const manifest = parseManifestJsonOnce(inputDir)
  const modules: string[] = []
  const manifestModules = manifest?.['app-harmony']?.distribute?.modules
  if (!manifestModules) {
    return modules
  }
  for (const manifestModule in manifestModules) {
    if (Object.prototype.hasOwnProperty.call(manifestModules, manifestModule)) {
      const moduleName = SupportedModules[manifestModule]
      if (!moduleName) {
        continue
      }
      modules.push(moduleName)
    }
  }
  return modules
}

function genAppHarmonyUniModules(
  context: PluginContext,
  inputDir: string,
  utsPlugins: Set<string>
) {
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  const importCodes: string[] = []
  const extApiCodes: string[] = []
  const registerCodes: string[] = []

  const projectDeps: {
    moduleSpecifier: string
    plugin: string
    source: 'local' | 'ohpm'
    version?: string
  }[] = []

  utsPlugins.forEach((plugin) => {
    const injects = parseUniExtApi(
      path.resolve(uniModulesDir, plugin),
      plugin,
      true,
      'app-harmony',
      'arkts'
    )
    const harmonyPackageName = `@uni_modules/${plugin.toLowerCase()}`
    if (injects) {
      Object.keys(injects).forEach((key) => {
        const inject = injects[key]
        if (Array.isArray(inject) && inject.length > 1) {
          const apiName = inject[1]
          importCodes.push(
            `import { ${inject[1]} } from '${harmonyPackageName}'`
          )
          extApiCodes.push(`uni.${apiName} = ${apiName}`)
        }
      })
    } else {
      const ident = camelize(plugin)
      importCodes.push(`import * as ${ident} from '${harmonyPackageName}'`)
      registerCodes.push(
        `uni.registerUTSPlugin('uni_modules/${plugin}', ${ident})`
      )
    }
    projectDeps.push({
      moduleSpecifier: harmonyPackageName,
      plugin,
      source: 'local',
    })
  })

  const relatedProviders = getRelatedProviders(inputDir)
  const relatedModules = getRelatedModules(inputDir)

  relatedModules.forEach((module) => {
    const harmonyModuleName = `@uni_modules/${module.toLowerCase()}`
    if (utsPlugins.has(module)) {
      // 不用处理
      // projectDeps.push({
      //   moduleSpecifier: harmonyModuleName,
      //   plugin: module,
      //   source: 'local',
      // })
    } else {
      const matchedStandaloneExtApi = StandaloneExtApis.find(
        (item) => item.plugin === module
      )
      if (matchedStandaloneExtApi) {
        projectDeps.push({
          moduleSpecifier: harmonyModuleName,
          plugin: module,
          source: 'ohpm',
          version: '*',
        })
        matchedStandaloneExtApi.apis?.forEach((apiName) => {
          importCodes.push(`import { ${apiName} } from '${harmonyModuleName}'`)
          extApiCodes.push(`uni.${apiName} = ${apiName}`)
        })
      }
    }
  })

  const importProviderCodes: string[] = []
  const registerProviderCodes: string[] = []
  const providers = getUniExtApiProviderRegisters()
  const allProviders = providers.map((provider) => {
    return {
      service: provider.service,
      name: provider.name,
      moduleSpecifier: `@uni_modules/${provider.plugin.toLowerCase()}`,
      plugin: provider.plugin,
      source: 'local',
      version: undefined as undefined | string,
    }
  })

  StandaloneExtApis.filter((item) => {
    return item.type === 'provider'
  }).forEach((extapi) => {
    if (allProviders.find((item) => item.plugin === extapi.plugin)) {
      return
    }
    const [_, service, provider] = extapi.plugin.split('-')
    allProviders.push({
      service,
      name: provider,
      moduleSpecifier: `@uni_modules/${extapi.plugin.toLowerCase()}`,
      plugin: extapi.plugin,
      source: 'ohpm',
      version: '*',
    })
  })

  relatedProviders.forEach((relatedProvider) => {
    const provider = allProviders.find(
      (item) =>
        item.service === relatedProvider.service &&
        item.name === relatedProvider.name
    )
    if (!provider) {
      return
    }
    projectDeps.push({
      moduleSpecifier: provider.moduleSpecifier,
      plugin: provider.plugin,
      source: provider.source as 'local' | 'ohpm',
      version: provider.version,
    })
    const className = formatExtApiProviderName(provider.service, provider.name)
    importProviderCodes.push(
      `import { ${className} } from '${provider.moduleSpecifier}'`
    )
    registerProviderCodes.push(
      `registerUniProvider('${provider.service}', '${provider.name}', new ${className}())`
    )
  })
  if (importProviderCodes.length) {
    importCodes.push(...importProviderCodes)
    extApiCodes.push(...registerProviderCodes)
  }
  importCodes.unshift(
    `import { registerUniProvider, uni } from '${
      process.env.UNI_APP_X !== 'true'
        ? '@dcloudio/uni-app-runtime'
        : '@dcloudio/uni-app-x-runtime'
    }'`
  )

  context.emitFile({
    type: 'asset',
    fileName: 'uni_modules/index.generated.ets',
    source: `// This file is automatically generated by uni-app.
// Do not modify this file -- YOUR CHANGES WILL BE ERASED!
${importCodes.join('\n')}

export function initUniModules() {
  initUniExtApi()
  ${registerCodes.join('\n  ')}
}

function initUniExtApi() {
  ${extApiCodes.join('\n  ')}
}
`,
  })

  const dependencies: Record<string, string> = {}
  const modules: { name: string; srcPath: string }[] = []
  projectDeps.forEach((dep) => {
    if (dep.source === 'local') {
      const depPath = './uni_modules/' + dep.plugin
      dependencies[dep.moduleSpecifier] = depPath
      modules.push({
        name: generateHarName(dep.moduleSpecifier),
        srcPath: depPath,
      })
    } else {
      if (!dependencies[dep.moduleSpecifier]) {
        dependencies[dep.moduleSpecifier] = `./libs/${generateHarName(
          dep.moduleSpecifier
        )}.har`
      }
    }
  })
  context.emitFile({
    type: 'asset',
    fileName: 'uni_modules/oh-package.json5',
    source: JSON.stringify({ dependencies }, null, 2),
  })
  context.emitFile({
    type: 'asset',
    fileName: 'uni_modules/build-profile.json5',
    source: JSON.stringify({ modules }, null, 2),
  })
}
