import path from 'path'
import fs from 'fs-extra'
import {
  type UniVitePlugin,
  buildUniExtApis,
  camelize,
  formatExtApiProviderName,
  getCurrentCompiledUTSPlugins,
  getUniExtApiProviderRegisters,
  parseManifestJsonOnce,
  parseUniExtApi,
  resolveUTSCompiler,
} from '@dcloudio/uni-cli-shared'
import type { OutputChunk } from 'rollup'

const commondGlobals: Record<string, string> = {
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

function isHarmoneyGlobal(id: string) {
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

function generateHarmonyImportExternalCode(hamonyPackageNames: string[]) {
  return hamonyPackageNames
    .filter((hamonyPackageName) => isHarmoneyGlobal(hamonyPackageName))
    .map(
      (hamonyPackageName) =>
        `import ${generateHarmonyImportSpecifier(
          hamonyPackageName
        )} from '${hamonyPackageName}';`
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
            external: [...Object.keys(commondGlobals), ...harmonyGlobals],
            output: {
              globals: function (id: string) {
                return (
                  commondGlobals[id] ||
                  (isHarmoneyGlobal(id)
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
      genAppHarmonyIndex(
        process.env.UNI_INPUT_DIR,
        getCurrentCompiledUTSPlugins()
      )
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
      if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
        return
      }
      // x 上暂时编译所有uni ext api，不管代码里是否调用了
      await buildUniExtApis()
    },
  }
}

interface IRelatedProvider {
  service: string
  name: string
}

const ProviderServiceMap = {
  oauth: {},
  payment: {
    // alipay: 'alipay',
    weixin: 'wxpay',
  },
}

/**
 * 获取manifest.json中勾选的provider
 */
function getRelatedProviders(inputDir: string): IRelatedProvider[] {
  const manifest = parseManifestJsonOnce(inputDir)
  const providers: IRelatedProvider[] = []
  const sdkConfigs = manifest?.['app-plus']?.distribute?.sdkConfigs
  if (!sdkConfigs) {
    return providers
  }
  for (const service in sdkConfigs) {
    if (Object.prototype.hasOwnProperty.call(sdkConfigs, service)) {
      const ProviderNameMap = ProviderServiceMap[service]
      if (!ProviderNameMap) {
        continue
      }
      const relatedProviders = sdkConfigs[service]
      for (const name in relatedProviders) {
        if (Object.prototype.hasOwnProperty.call(relatedProviders, name)) {
          const providerName = ProviderNameMap[name]
          providers.push({
            service,
            name: providerName || name,
          })
        }
      }
    }
  }
  return providers
}

const builtInProviders = [
  {
    service: 'payment',
    name: 'alipay',
  },
]
function genAppHarmonyIndex(inputDir: string, utsPlugins: Set<string>) {
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  const importCodes: string[] = []
  const extApiCodes: string[] = []
  const registerCodes: string[] = []
  utsPlugins.forEach((plugin) => {
    const injects = parseUniExtApi(
      path.resolve(uniModulesDir, plugin),
      plugin,
      true,
      'app-harmony',
      'arkts'
    )
    if (injects) {
      Object.keys(injects).forEach((key) => {
        const inject = injects[key]
        if (Array.isArray(inject) && inject.length > 1) {
          const apiName = inject[1]
          importCodes.push(
            `import { ${inject[1]} } from '@uni_modules/${plugin}'`
          )
          extApiCodes.push(`uni.${apiName} = ${apiName}`)
        }
      })
    } else {
      const ident = camelize(plugin)
      importCodes.push(`import * as ${ident} from '@uni_modules/${plugin}'`)
      registerCodes.push(
        `uni.registerUTSPlugin('uni_modules/${plugin}', ${ident})`
      )
    }
  })

  const relatedProviders = getRelatedProviders(inputDir)

  const importProviderCodes: string[] = []
  const registerProviderCodes: string[] = []
  const providers = getUniExtApiProviderRegisters()
  const allProviders = providers
    .map((provider) => {
      return {
        service: provider.service,
        name: provider.name,
        moduleSpecifier: `@uni_modules/${provider.plugin}`,
      }
    })
    .concat(
      builtInProviders.map((provider) => {
        return {
          service: provider.service,
          name: provider.name,
          moduleSpecifier: `@dcloudio/uni-app-runtime/src/main/ets/uni-app-harmony/providers/uni-${provider.service}-${provider.name}`,
        }
      })
    )
  relatedProviders.forEach((relatedProvider) => {
    const provider = allProviders.find(
      (item) =>
        item.service === relatedProvider.service &&
        item.name === relatedProvider.name
    )
    if (!provider) {
      return
    }
    const className = formatExtApiProviderName(provider.service, provider.name)
    importProviderCodes.push(
      `import { ${className} } from '${provider.moduleSpecifier}'`
    )
    registerProviderCodes.push(
      `registerUniProvider('${provider.service}', '${provider.name}', new ${className}())`
    )
  })
  if (importProviderCodes.length) {
    importProviderCodes.unshift(
      `import { registerUniProvider } from '@dcloudio/uni-app-runtime'`
    )
    importCodes.push(...importProviderCodes)
    extApiCodes.push(...registerProviderCodes)
  }

  fs.writeFileSync(
    path.resolve(
      resolveUTSCompiler().resolveAppHarmonyUniModulesRootDir(),
      'index.generated.ets'
    ),
    `// This file is automatically generated by uni-app.
// Do not modify this file -- YOUR CHANGES WILL BE ERASED!
${importCodes.join('\n')}

export function initUniModules(uni: ESObject) {
  initUniExtApi(uni)
  ${registerCodes.join('\n  ')}
}

function initUniExtApi(uni: ESObject) {
  ${extApiCodes.join('\n  ')}
}
`
  )
}
