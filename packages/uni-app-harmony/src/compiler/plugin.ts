import path from 'path'
import {
  type UniVitePlugin,
  buildUniExtApis,
  camelize,
  capitalize,
  formatExtApiProviderName,
  getCurrentCompiledUTSPlugins,
  getCurrentCompiledUTSProviders,
  getUTSPluginCustomElements,
  getUniExtApiProviderRegisters,
  isNormalCompileTarget,
  parseManifestJsonOnce,
  parseUniExtApi,
  resolveUTSCompiler,
} from '@dcloudio/uni-cli-shared'
import type { OutputChunk, PluginContext } from 'rollup'
import ExternalModuls from './external-modules.json'
import ExternalModulsX from './external-modules-x.json'
import { ComponentsWithProvider, ComponentsWithProviderX } from './constants'
import { buildWorkers } from './workers'

const isX = process.env.UNI_APP_X === 'true'
const StandaloneExtApis = isX ? ExternalModulsX : ExternalModuls
const Providers = StandaloneExtApis.filter(
  (item) => item.type === 'provider'
) as {
  type: 'provider'
  plugin: string
  provider: string
  service: string
  version: string
}[]
const ComponentWithProviderList = isX
  ? ComponentsWithProviderX
  : ComponentsWithProvider

if (isX) {
  Providers.push({
    type: 'provider',
    plugin: 'uni-map',
    provider: 'tencent',
    service: 'map',
    version: '1.0.0',
  })
}

interface IApiModule {
  type: 'extapi'
  plugin: string
  apis: string[]
}

const ApiModules = StandaloneExtApis.filter(
  (item) => item.type === 'extapi'
) as IApiModule[]

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
      if (isNormalCompileTarget()) {
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
      }
    },
    async writeBundle() {
      if (!isNormalCompileTarget()) {
        return
      }
      // 1.0 特有逻辑，x 上由其他插件完成
      if (!isX) {
        // x 上暂时编译所有uni ext api，不管代码里是否调用了
        await buildUniExtApis()
      }
      if (isX) {
        await buildWorkers()
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
  plugin: string
}

/**
 * TODO 微信支付上线时，务必提醒相关同事统一使用wxpay，不要用weixin
 */

function getProviders(
  module: string,
  allProviders: ProviderInfo[]
): ProviderInfo[] {
  return allProviders.filter((item) => item.plugin.startsWith(module + '-'))
}

interface ProviderInfo {
  service: string
  name: string
  moduleSpecifier: string
  plugin: string
  source: string
  version: undefined | string
}

const DefaultModule = {
  // 'uni-getLocation': {
  //   system: {},
  // },
}

function getManifestModules(inputDir: string) {
  const manifest = parseManifestJsonOnce(inputDir)
  const modules = manifest?.['app-harmony']?.distribute?.modules
  const realModules = {}
  for (const moduleName in modules) {
    if (DefaultModule[moduleName]) {
      realModules[moduleName] = Object.assign(
        {},
        DefaultModule[moduleName],
        modules[moduleName]
      )
    } else {
      realModules[moduleName] = modules[moduleName]
    }
  }
  return realModules
}

/**
 * 获取manifest.json中勾选的provider
 * 仅处理payment等参数内包含provider的api，地图模块不在此处理
 */
function getRelatedProviders(
  inputDir: string,
  allProviders: ProviderInfo[]
): IRelatedProvider[] {
  const relatedProviders: IRelatedProvider[] = []
  const manifestModules = getManifestModules(inputDir)
  if (!manifestModules) {
    return relatedProviders
  }
  for (const uniModule in manifestModules) {
    const providers = getProviders(uniModule, allProviders)
    if (!providers.length) {
      continue
    }
    const manifestModule = manifestModules[uniModule]
    for (const name in manifestModule) {
      const providerConf = manifestModule[name]
      if (!providerConf) {
        continue
      }
      if (!isHarmonyOSProvider(providerConf)) {
        continue
      }
      const plugin = uniModule + '-' + name
      const provider = providers.find((item) => item.plugin === plugin)
      if (!provider) {
        continue
      }
      relatedProviders.push({
        service: provider.service,
        name,
        plugin: uniModule + '-' + name,
      })
    }
  }
  return relatedProviders
}

function isHarmonyOSProvider(providerConf: Record<string, any>) {
  return (
    !providerConf.__platform__ ||
    !Array.isArray(providerConf.__platform__) ||
    providerConf.__platform__.includes('harmonyos')
  )
}

const ModuleAlias = {
  'uni-facialRecognitionVerify': 'uni-facialVerify',
}

// 获取uni_modules中的相关模块
function getRelatedModules(inputDir: string): string[] {
  const modules: string[] = []
  const manifestModules = getManifestModules(inputDir)
  if (!manifestModules) {
    return modules
  }
  for (let manifestModuleName in manifestModules) {
    if (ComponentWithProviderList.includes(manifestModuleName)) {
      const manifestModuleInfo = manifestModules[manifestModuleName]
      for (const provider in manifestModuleInfo) {
        const manifestPlugin = manifestModuleName + '-' + provider
        const providerConf = manifestModuleInfo[provider]
        if (!isHarmonyOSProvider(providerConf)) {
          continue
        }
        const apiModule = ApiModules.find(
          (item) => item.plugin === manifestPlugin
        )
        if (apiModule) {
          modules.push(manifestPlugin)
        }
        continue
      }
    }
    if (ModuleAlias[manifestModuleName]) {
      manifestModuleName = ModuleAlias[manifestModuleName]
    }
    const apiModule = ApiModules.find(
      (item) => item.plugin === manifestModuleName
    )
    if (!apiModule) {
      continue
    }
    modules.push(manifestModuleName)
  }
  return modules
}

function getTreeshakeModules(context: PluginContext) {
  const ids = Array.from(context.getModuleIds())
  const uniExtApis = new Set<string>()
  ids.forEach((id) => {
    const moduleInfo = context.getModuleInfo(id)
    if (
      moduleInfo &&
      moduleInfo.meta &&
      Array.isArray(moduleInfo.meta.uniExtApis)
    ) {
      moduleInfo.meta.uniExtApis.forEach((api) => {
        uniExtApis.add(api)
      })
    }
  })
  const { getPluginInjectApis } = resolveUTSCompiler()
  // uts 插件里使用的 ext api 和组件
  const pluginInjectApis = getPluginInjectApis()
  pluginInjectApis.forEach((api) => {
    uniExtApis.add(api)
  })
  const modules = new Set<string>()
  uniExtApis.forEach((api) => {
    const uniApiName = api.replace(/^uni./, '')
    const moduleInfo = ApiModules.find((item) => {
      return item.apis && item.apis.includes(uniApiName)
    })
    if (moduleInfo) {
      modules.add(moduleInfo.plugin)
    }
  })
  return Array.from(modules)
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

  Array.from(utsPlugins)
    .sort()
    .forEach((plugin) => {
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
      }
      const ident = camelize(plugin)
      importCodes.push(`import * as ${ident} from '${harmonyPackageName}'`)
      registerCodes.push(
        `uni.registerUTSPlugin('uni_modules/${plugin}', ${ident})`
      )

      projectDeps.push({
        moduleSpecifier: harmonyPackageName,
        plugin,
        source: 'local',
      })
    })

  const relatedModules = getRelatedModules(inputDir)
  let relatedModulesAndUsedModules = relatedModules
  if (isX) {
    relatedModulesAndUsedModules = Array.from(
      new Set([
        ...relatedModulesAndUsedModules,
        ...getTreeshakeModules(context),
      ])
    )
  }

  relatedModulesAndUsedModules.sort().forEach((module) => {
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
        if (module.startsWith('uni-map-')) {
          // TODO 临时处理，后续需要内置基础uni-map模块并优化此问题
          importCodes.push(
            `import { UniMapElement } from '${harmonyModuleName}'`
          )
          extApiCodes.push(`globalThis.UniMapElement = UniMapElement`)
          const ident = camelize(module)
          importCodes.push(`import * as ${ident} from '${harmonyModuleName}'`)
          registerCodes.push(
            `uni.registerUTSPlugin('uni_modules/${module}', ${ident})`
          )
        }
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

  Providers.forEach((provider) => {
    if (allProviders.find((item) => item.plugin === provider.plugin)) {
      return
    }
    allProviders.push({
      service: provider.service,
      name: provider.provider,
      moduleSpecifier: `@uni_modules/${provider.plugin.toLowerCase()}`,
      plugin: provider.plugin,
      source: 'ohpm',
      version: '*',
    })
  })

  const relatedProviders = getRelatedProviders(inputDir, allProviders)
  relatedProviders.sort().forEach((relatedProvider) => {
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

  const pluginCustomElements = getUTSPluginCustomElements()
  Object.keys(pluginCustomElements)
    .sort()
    .forEach((pluginId) => {
      if (!utsPlugins.has(pluginId)) {
        // 可能没使用，没编译
        return
      }
      const elements = [...pluginCustomElements[pluginId]]
      if (elements.length) {
        importCodes.push(
          `import { ${elements
            .map((name) => capitalize(camelize(name)) + 'Element')
            .join(', ')} } from '@uni_modules/${pluginId.toLowerCase()}'`
        )
        elements.forEach((element) => {
          registerCodes.push(
            `customElements.define('${element.replace('uni-', '')}', ${
              capitalize(camelize(element)) + 'Element'
            })`
          )
        })
      }
    })

  const importIds: string[] = []
  if (relatedProviders.length) {
    importIds.push('registerUniProvider')
  }
  if (Object.keys(pluginCustomElements).length) {
    importIds.push('customElements')
  }
  importIds.push('uni')

  importCodes.unshift(
    `import { ${importIds.join(', ')} } from '${
      !isX ? '@dcloudio/uni-app-runtime' : '@dcloudio/uni-app-x-runtime'
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

  if (isX) {
    context.emitFile({
      type: 'asset',
      fileName: 'import/app-config.ets',
      source: `import '../app-config'`,
    })
    context.emitFile({
      type: 'asset',
      fileName: 'import/app-service.ets',
      source: `import '../app-service'`,
    })
  }

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
