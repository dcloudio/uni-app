import type { Plugin } from 'vite'
import fs from 'fs-extra'
import path from 'path'
import fg from 'fast-glob'
import { once } from '@dcloudio/uni-shared'

import {
  createUniXKotlinCompilerOnce,
  createUniXSwiftCompilerOnce,
  resolveUTSAppModule,
  resolveUTSCompiler,
} from '../../../uts'
import { parseVueRequest } from '../../utils'
import {
  checkEncryptUniModules,
  getUniExtApiPlugins,
  parseUTSModuleDeps,
  resolveEncryptUniModule,
} from '../../../uni_modules'
import { enableSourceMap, normalizePath } from '../../../utils'
import { parseManifestJsonOnce } from '../../../json'
import { preJson } from '../../../preprocess'
import type { ChangeEvent } from 'rollup'
import { dataToEsm } from '@rollup/pluginutils'
import type { UniXCompiler } from '@dcloudio/uni-uts-v1'

const UTSProxyRE = /\?uts-proxy$/
const UniHelpersRE = /\?uni_helpers$/

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

function resolveOutputPluginDir(
  platform: 'app-android' | 'app-ios',
  inputDir: string,
  pluginDir: string
) {
  return path.join(
    process.env.UNI_OUTPUT_DIR,
    '../.tsc',
    platform,
    path.relative(inputDir, pluginDir)
  )
}
async function syncUniModuleFilesByCompiler(
  compiler: UniXCompiler,
  pluginDir: string,
  outputPluginDir: string
) {
  const start = Date.now()
  // 目前每次编译，都全量比对同步uni_modules目录下的文件，不然还要 watch dir
  const files = await syncUniModuleFiles(
    process.env.UNI_UTS_PLATFORM as any,
    pluginDir,
    outputPluginDir
  )
  compiler.debug(
    `${path.basename(pluginDir)} sync files(${files.length})`,
    Date.now() - start
  )
}

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
    const plugin = path.basename(pluginDir)

    if (uniXKotlinCompiler) {
      await syncUniModuleFilesByCompiler(
        uniXKotlinCompiler,
        pluginDir,
        resolveOutputPluginDir('app-android', inputDir, pluginDir)
      )
    }

    if (uniXSwiftCompiler) {
      await syncUniModuleFilesByCompiler(
        uniXSwiftCompiler,
        pluginDir,
        resolveOutputPluginDir('app-ios', inputDir, pluginDir)
      )
    }

    if (!utsPlugins.has(plugin)) {
      utsPlugins.add(plugin)
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

    if (uniXCompiler) {
      // 处理uni_modules中的文件变更
      const files = changedFiles.get(plugin)
      if (files) {
        // 仅限watch模式是会生效
        changedFiles.delete(plugin)
        await uniXCompiler.invalidate(files)
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
    buildEnd() {
      utsModuleCaches.clear()
      changedFiles.clear()
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

function resolveTscUniModuleIndexFileName(
  platform: 'app-android' | 'app-ios',
  pluginDir: string
) {
  let indexFileName = path.resolve(pluginDir, `utssdk/${platform}/index.uts.ts`)
  if (fs.existsSync(indexFileName)) {
    return indexFileName
  }
  indexFileName = path.resolve(pluginDir, 'utssdk/index.uts.ts')
  if (fs.existsSync(indexFileName)) {
    return indexFileName
  }
}

function resolveUniModuleGlobs(platform: 'app-android' | 'app-ios' | 'app') {
  const extname = `.{uts,ts,json}`
  const globs = [
    // test-uts/common/**/*
    `common/**/*${extname}`,
    `utssdk/*${extname}`,
    `utssdk/common/**/*${extname}`,
    // 之所以app-android/app-ios都需要，是因为js引擎下，需要合并两个平台的代码
    `utssdk/app-android/**/*${extname}`,
    `utssdk/app-ios/**/*${extname}`,
  ]
  return globs
}

function resolveUniModuleIgnoreGlobs() {
  return [`utssdk/app-android/config.json`, `utssdk/app-ios/config.json`]
}

async function syncUniModuleFiles(
  platform: 'app-android' | 'app-ios' | 'app',
  pluginDir: string,
  outputPluginDir: string
) {
  return fg(resolveUniModuleGlobs(platform), {
    cwd: pluginDir,
    absolute: false,
    ignore: resolveUniModuleIgnoreGlobs(),
  }).then((files) => {
    return Promise.all(
      files.map((fileName) =>
        syncUniModuleFile(fileName, pluginDir, outputPluginDir).then(
          () => fileName
        )
      )
    )
  })
}

async function syncUniModuleFile(
  relativeFileName: string,
  pluginDir: string,
  outputPluginDir: string
) {
  const src = path.resolve(pluginDir, relativeFileName)
  const extname = path.extname(relativeFileName)
  if (extname === '.uts') {
    // test.uts => test.uts.ts
    const dest = path.resolve(outputPluginDir, relativeFileName + '.ts')
    return copyFile(src, dest)
  } else if (extname === '.json') {
    return fs.outputFile(
      path.resolve(outputPluginDir, relativeFileName + '.ts'),
      // TODO 目前的 preJson 有问题，需要明确app-android/app-ios
      dataToEsm(JSON.parse(preJson(fs.readFileSync(src, 'utf-8'))), {
        namedExports: true,
        preferConst: true,
      })
    )
  }
  return copyFile(src, path.resolve(outputPluginDir, relativeFileName))
}

const utsModuleFileCaches = new Map<string, number>()

async function copyFile(src: string, dest: string) {
  const stat = await fs.stat(src)
  if (utsModuleFileCaches.get(src) === stat.mtimeMs) {
    return
  }
  utsModuleFileCaches.set(src, stat.mtimeMs)
  return fs.copy(src, dest, { overwrite: true })
}
