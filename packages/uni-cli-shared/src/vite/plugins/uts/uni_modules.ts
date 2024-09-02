import type { Plugin } from 'vite'
import fs from 'fs-extra'
import path from 'path'
import { once } from '@dcloudio/uni-shared'
import { dataToEsm } from '@rollup/pluginutils'
import type { ChangeEvent } from 'rollup'
import {
  createUniXKotlinCompilerOnce,
  createUniXSwiftCompilerOnce,
  initUTSKotlinAutoImportsOnce,
  initUTSSwiftAutoImportsOnce,
  parseKotlinPackageWithPluginId,
  parseSwiftPackageWithPluginId,
  resolveUTSAppModule,
  resolveUTSCompiler,
} from '../../../uts'
import { parseVueRequest } from '../../utils'
import {
  type Preprocessors,
  getUniExtApiPlugins,
  parseUTSModuleDeps,
  resolveOutputPluginDir,
  resolveTscUniModuleIndexFileName,
  resolveUVueOutputPluginDir,
  syncUniModuleFilesByCompiler,
} from '../../../uni_modules'
import {
  checkEncryptUniModules,
  resolveEncryptUniModule,
} from '../../../uni_modules.cloud'
import { enableSourceMap, normalizePath } from '../../../utils'
import { parseManifestJsonOnce } from '../../../json'
import { preJson } from '../../../preprocess'

const UTSProxyRE = /\?uts-proxy$/
const UniHelpersRE = /\?uni_helpers$/

export const uniModulesSyncFilePreprocessors: Preprocessors = {
  '.json'(content) {
    // TODO 目前的 preJson 有问题，需要明确app-android/app-ios
    return dataToEsm(JSON.parse(preJson(content)), {
      namedExports: true,
      preferConst: true,
    })
  },
}

function isUTSProxy(id: string) {
  return UTSProxyRE.test(id)
}

function isUniHelpers(id: string) {
  return UniHelpersRE.test(id)
}

const utsModuleCaches = new Map<
  string,
  () => Promise<void | {
    code: string
    deps: string[]
    encrypt: boolean
    meta?: any
  }>
>()

interface UniUTSPluginOptions {
  x?: boolean
  extApis?: Record<string, [string, string]>
  isSingleThread?: boolean
}

const utsPlugins = new Set<string>()

export function getCurrentCompiledUTSPlugins() {
  return utsPlugins
}

let uniExtApiCompiler = async () => {}

// 该插件仅限app-android、app-ios、app-harmony
export function uniUTSAppUniModulesPlugin(
  options: UniUTSPluginOptions = {}
): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  process.env.UNI_UTS_USING_ROLLUP = 'true'
  const uniModulesDir = normalizePath(path.resolve(inputDir, 'uni_modules'))

  const uniXKotlinCompiler =
    process.env.UNI_APP_X_TSC === 'true' &&
    (process.env.UNI_UTS_PLATFORM === 'app-android' ||
      process.env.UNI_UTS_PLATFORM === 'app')
      ? createUniXKotlinCompilerOnce()
      : null
  const uniXSwiftCompiler =
    process.env.UNI_APP_X_TSC === 'true' &&
    (process.env.UNI_UTS_PLATFORM === 'app-ios' ||
      process.env.UNI_UTS_PLATFORM === 'app')
      ? createUniXSwiftCompilerOnce()
      : null
  const uniXCompiler = uniXKotlinCompiler || uniXSwiftCompiler

  const changedFiles = new Map<
    string,
    {
      fileName: string
      event: ChangeEvent
    }[]
  >()

  const compilePlugin = async (pluginDir: string) => {
    const pluginId = path.basename(pluginDir)

    if (uniXKotlinCompiler) {
      await syncUniModuleFilesByCompiler(
        uniXKotlinCompiler,
        pluginDir,
        resolveOutputPluginDir('app-android', inputDir, pluginDir),
        resolveUVueOutputPluginDir('app-android', inputDir, pluginDir),
        uniModulesSyncFilePreprocessors
      )
    }

    if (uniXSwiftCompiler) {
      await syncUniModuleFilesByCompiler(
        uniXSwiftCompiler,
        pluginDir,
        resolveOutputPluginDir('app-ios', inputDir, pluginDir),
        resolveUVueOutputPluginDir('app-ios', inputDir, pluginDir),
        uniModulesSyncFilePreprocessors
      )
    }

    if (!utsPlugins.has(pluginId)) {
      utsPlugins.add(pluginId)
      if (uniXKotlinCompiler) {
        const indexFileName = resolveTscUniModuleIndexFileName(
          'app-android',
          resolveOutputPluginDir('app-android', inputDir, pluginDir)
        )
        if (indexFileName) {
          await uniXKotlinCompiler.addRootFile(indexFileName)
        }
      }
      if (uniXSwiftCompiler) {
        const indexFileName = resolveTscUniModuleIndexFileName(
          'app-ios',
          resolveOutputPluginDir('app-ios', inputDir, pluginDir)
        )
        if (indexFileName) {
          await uniXSwiftCompiler.addRootFile(indexFileName)
        }
      }
    }

    // 处理uni_modules中的文件变更
    const files = changedFiles.get(pluginId)
    if (files) {
      // 仅限watch模式是会生效
      changedFiles.delete(pluginId)
      if (uniXKotlinCompiler) {
        await uniXKotlinCompiler.invalidate(files)
      }
      if (uniXSwiftCompiler) {
        await uniXSwiftCompiler.invalidate(files)
      }
    }

    const pkgJson = require(path.join(pluginDir, 'package.json'))
    const isExtApi = !!pkgJson.uni_modules?.['uni-ext-api']
    const extApiProvider = resolveExtApiProvider(pkgJson)
    // 如果是 provider 扩展，需要判断 provider 的宿主插件是否在本地，在的话，自动导入该宿主插件包名
    let uniExtApiProviderServicePlugin = ''
    if (extApiProvider?.servicePlugin) {
      if (
        fs.existsSync(
          path.resolve(inputDir, 'uni_modules', extApiProvider.servicePlugin)
        )
      ) {
        uniExtApiProviderServicePlugin = extApiProvider.servicePlugin
      }
    }
    const compiler = resolveUTSCompiler()
    // 处理依赖的 uts 插件
    // TODO 当本地有ext-api时，也应该自动加入deps，不然uts内部使用了该api，也会导致编译失败
    const deps = parseUTSModuleDeps(
      pkgJson.uni_modules?.dependencies || [],
      inputDir
    )
    if (deps.length) {
      for (const dep of deps) {
        await compilePlugin(path.resolve(inputDir, 'uni_modules', dep))
      }
    }

    if (process.env.UNI_PLATFORM === 'app-harmony') {
      return compiler.compileArkTS(pluginDir, {
        isX: !!options.x,
        isExtApi,
        transform: {
          uniExtApiProviderName: extApiProvider?.name,
          uniExtApiProviderService: extApiProvider?.service,
          uniExtApiProviderServicePlugin,
        },
      })
    }

    function filterAutoImports(
      autoImports: Record<string, [string, (string | undefined)?][]>,
      source: string
    ) {
      if (autoImports[source]) {
        // 移除 source
        return Object.keys(autoImports).reduce((imports, key) => {
          if (key !== source) {
            imports[key] = autoImports[key]
          }
          return imports
        }, {})
      }
      return autoImports
    }

    return compiler.compile(pluginDir, {
      isX: !!options.x,
      isSingleThread: !!options.isSingleThread,
      isPlugin: true,
      isExtApi,
      extApis: options.extApis,
      sourceMap: enableSourceMap(),
      uni_modules: deps,
      transform: {
        uniExtApiProviderName: extApiProvider?.name,
        uniExtApiProviderService: extApiProvider?.service,
        uniExtApiProviderServicePlugin,
      },
      async kotlinAutoImports() {
        return initUTSKotlinAutoImportsOnce().then((autoImports) => {
          return filterAutoImports(
            autoImports,
            parseKotlinPackageWithPluginId(pluginId, true)
          )
        })
      },
      async swiftAutoImports() {
        return initUTSSwiftAutoImportsOnce().then((autoImports) => {
          return filterAutoImports(
            autoImports,
            parseSwiftPackageWithPluginId(pluginId, true)
          )
        })
      },
    })
  }

  uniExtApiCompiler = async () => {
    // 获取 provider 扩展(编译所有uni)
    const plugins = getUniExtApiPlugins().filter(
      (provider) => !utsPlugins.has(provider.plugin)
    )
    for (const plugin of plugins) {
      const pluginDir = path.resolve(inputDir, 'uni_modules', plugin.plugin)
      // 如果是 app-js 环境
      if (process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js') {
        if (
          fs.existsSync(
            path.resolve(pluginDir, 'utssdk', 'app-js', 'index.uts')
          )
        ) {
          continue
        }
      }
      const result = await compilePlugin(pluginDir)
      if (result) {
        // 时机不对，不能addWatch
        // result.deps.forEach((dep) => {
        //   this.addWatchFile(dep)
        // })
      }
    }
  }

  return {
    name: 'uni:uts-uni_modules',
    apply: 'build',
    enforce: 'pre',
    async configResolved() {
      if (uniXKotlinCompiler) {
        await uniXKotlinCompiler.init()
      }
      if (uniXSwiftCompiler) {
        await uniXSwiftCompiler.init()
      }
    },
    resolveId(id, importer) {
      if (isUTSProxy(id) || isUniHelpers(id)) {
        return id
      }
      // 加密插件缓存目录的css文件
      if (id.endsWith('.css')) {
        return
      }
      const module = resolveUTSAppModule(
        process.env.UNI_UTS_PLATFORM,
        id,
        importer ? path.dirname(importer) : inputDir,
        options.x !== true
      )
      if (module) {
        // app-js 会直接返回 index.uts 路径，不需要 uts-proxy
        if (module.endsWith('.uts')) {
          return module
        }
        // prefix the polyfill id with \0 to tell other plugins not to try to load or transform it
        return module + '?uts-proxy'
      }
    },
    load(id) {
      if (isUTSProxy(id)) {
        return ''
      }
    },
    async buildEnd() {
      utsModuleCaches.clear()
      changedFiles.clear()
      if (
        process.env.NODE_ENV !== 'development' ||
        process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ) {
        if (uniXKotlinCompiler) {
          await uniXKotlinCompiler.close()
        }
        if (uniXSwiftCompiler) {
          await uniXSwiftCompiler.close()
        }
      }
    },
    watchChange(fileName, change) {
      if (uniXCompiler) {
        fileName = normalizePath(fileName)
        if (fileName.startsWith(uniModulesDir)) {
          // 仅处理uni_modules中的文件
          const plugin = fileName.slice(uniModulesDir.length + 1).split('/')[0]
          if (utsPlugins.has(plugin)) {
            const changeFile = { fileName, event: change.event }
            if (!changedFiles.has(plugin)) {
              changedFiles.set(plugin, [changeFile])
            } else {
              changedFiles.get(plugin)!.push(changeFile)
            }
          }
        }
      }
    },
    async transform(_, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      if (!isUTSProxy(id)) {
        return
      }
      const { filename: pluginDir } = parseVueRequest(id.replace('\0', ''))
      // 当 vue 和 nvue 均引用了相同 uts 插件，解决两套编译器会编译两次 uts 插件的问题
      // 通过缓存，保证同一个 uts 插件只编译一次
      if (utsModuleCaches.get(pluginDir)) {
        return utsModuleCaches.get(pluginDir)!().then((result) => {
          if (result) {
            result.deps.forEach((dep) => {
              this.addWatchFile(dep)
            })
            return {
              code: result.code,
              map: null,
              syntheticNamedExports: result.encrypt,
              meta: result.meta,
            }
          }
        })
      }
      const compile = once(() => {
        return compilePlugin(pluginDir)
      })
      utsModuleCaches.set(pluginDir, compile)
      const result = await compile()
      if (result) {
        result.deps.forEach((dep) => {
          this.addWatchFile(dep)
        })
        return {
          code: result.code,
          map: null,
          syntheticNamedExports: result.encrypt,
          meta: result.meta,
        }
      }
    },
  }
}

export async function buildUniExtApis() {
  await uniExtApiCompiler()
}

export function resolveExtApiProvider(pkg: Record<string, any>) {
  const provider = pkg.uni_modules?.['uni-ext-api']?.provider as
    | {
        name?: string
        plugin?: string
        service: string
        servicePlugin: string
      }
    | undefined
  if (provider?.service) {
    if (provider.name && !provider.servicePlugin) {
      provider.servicePlugin = 'uni-' + provider.service
    }
    return provider
  }
}

export function uniDecryptUniModulesPlugin(): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const isX = process.env.UNI_APP_X === 'true'
  return {
    name: 'uni:uni_modules-d',
    enforce: 'pre',
    async configResolved() {
      if (isX && process.env.UNI_COMPILE_TARGET !== 'uni_modules') {
        const manifest = parseManifestJsonOnce(inputDir)
        await checkEncryptUniModules(inputDir, {
          mode:
            process.env.NODE_ENV !== 'development'
              ? 'production'
              : 'development',
          packType:
            process.env.UNI_APP_PACK_TYPE ||
            (process.env.NODE_ENV !== 'development' ? 'release' : 'debug'),
          compilerVersion: process.env.UNI_COMPILER_VERSION,
          appid: manifest.appid,
          appname: manifest.name,
          platform: process.env.UNI_UTS_PLATFORM,
          'uni-app-x': isX,
        })
      }
    },
    resolveId(id) {
      if (isUTSProxy(id) || isUniHelpers(id)) {
        return id
      }
      if (
        isX &&
        process.env.UNI_COMPILE_TARGET !== 'uni_modules' &&
        !id.endsWith('.css')
      ) {
        const resolvedId = resolveEncryptUniModule(
          id,
          process.env.UNI_UTS_PLATFORM,
          process.env.UNI_APP_X === 'true'
        )
        if (resolvedId) {
          return resolvedId
        }
      }
    },
  }
}
