import { extend, isArray } from '@vue/shared'
import { extname, join, relative, resolve } from 'path'

import { resolveAndroidDepFiles } from './kotlin'
import { resolveIOSDepFiles } from './swift'

import {
  FORMATS,
  type GenProxyCodeOptions,
  genProxyCode,
  resolvePlatformIndex,
  resolvePlatformIndexFilename,
  resolveRootIndex,
} from './code'
import {
  ERR_MSG_PLACEHOLDER,
  genConfigJson,
  resolveAndroidComponents,
  resolveConfigProvider,
  resolveCustomElements,
  resolveIOSComponents,
  resolvePackage,
} from './utils'
import { parseUTSSwiftPluginStacktrace } from './stacktrace'
import { resolveUTSPluginSourceMapFile } from './sourceMap'
import { isWindows, normalizePath } from './shared'
import {
  generateCodeFrameWithKotlinStacktrace,
  generateCodeFrameWithSwiftStacktrace,
} from './legacy'
import {
  checkCompile,
  genManifestFile,
  initCheckOptionsEnv,
  restoreDex,
  restoreSourceMap,
  storeSourceMap,
} from './manifest'
import { cacheTips } from './manifest/utils'
import { compileEncrypt, isEncrypt } from './encrypt'
import type { UTSOutputOptions } from '@dcloudio/uts'
import { isModule } from './module'
import { getCompiler } from './compiler'
import { uvueOutDir } from './uvue/index'
import {
  type SyncUniModulesFilePreprocessor,
  type UniXCompilerPlatform,
  compileUniModuleWithTsc,
  createUniXArkTSCompiler,
  createUniXKotlinCompiler,
  createUniXSwiftCompiler,
  resolveOutputPluginDir,
  resolveUVueOutputPluginDir,
} from './uni_modules'
import { existsSync, readdirSync, rmSync } from 'fs-extra'
import { restoreDebuggerFiles } from './manifest/dex'
import { compileArkTS, requireUTSPluginCode } from './arkts'

export { syncUTSFiles } from './uni_modules'
export * from './tsc'

export { getPluginInjectApis, getPluginInjectComponents } from './utils'

export { parseExportIdentifiers, parseInterfaceTypes } from './code'

export {
  compileArkTS,
  compileArkTSExtApi,
  getArkTSAutoImports,
  resolveAppHarmonyUniModulesRootDir,
  resolveAppHarmonyUniModulesEntryDir,
} from './arkts'

export const sourcemap = {
  generateCodeFrameWithKotlinStacktrace,
  generateCodeFrameWithSwiftStacktrace,
}

export { compileApp, CompileAppOptions } from './uvue/index'

export { parseInjectModules, parseExtApiProviders } from './utils'

export * from './sourceMap'

export {
  parseCompileStacktrace,
  parseRuntimeStacktrace,
  parseUTSRuntimeStacktrace,
  parseUTSKotlinRuntimeStacktrace,
  parseUTSJavaScriptRuntimeStacktrace,
  parseUTSArkTSPluginStacktrace,
  resolveUTSKotlinFilenameByClassName,
} from './stacktrace'

export { compile as toKotlin } from './kotlin'
export { compile as toSwift } from './swift'

function parseErrMsg(code: string, errMsg: string) {
  return code.replace(ERR_MSG_PLACEHOLDER, errMsg)
}

function compileErrMsg(id: string) {
  return `uts插件[${id}]编译失败，无法使用`
}

function warn(msg: string) {
  console.warn(`提示：${msg}`)
}

export interface CompileResult {
  code: string
  deps: string[]
  encrypt: boolean
  meta?: any
  dir: string
  inject_apis: string[]
  scoped_slots: string[]
  custom_elements: Record<string, string>
}

function createResult(
  dir: string,
  errMsg: string,
  code: string,
  deps: string[],
  inject_apis: string[],
  scoped_slots: string[],
  custom_elements: Record<string, string>,
  meta: unknown
): CompileResult {
  return {
    dir,
    code: parseErrMsg(code, errMsg),
    deps,
    encrypt: false,
    inject_apis,
    scoped_slots,
    custom_elements,
    meta,
  }
}

export interface UTSPluginCompilerOptions {
  isX: boolean
  isPlugin: boolean
  isSingleThread: boolean
  isExtApi?: boolean
  extApis?: Record<string, [string, string]>
  transform?: UTSOutputOptions['transform']
  sourceMap?: boolean
  uni_modules?: string[]
  kotlinAutoImports?: () => Promise<
    Required<UTSOutputOptions>['transform']['autoImports']
  >
  swiftAutoImports?: () => Promise<
    Required<UTSOutputOptions>['transform']['autoImports']
  >
  androidPreprocessor?: SyncUniModulesFilePreprocessor
  iosPreprocessor?: SyncUniModulesFilePreprocessor
  harmonyPreprocessor?: SyncUniModulesFilePreprocessor
  rewriteConsoleExpr?: (fileName: string, content: string) => string
}

// 重要：当调整参数时，需要同步调整 vue2 编译器 uni-cli-shared/lib/uts/uts-loader.js
export async function compile(
  pluginDir: string,
  compilerOptions: UTSPluginCompilerOptions = {
    isX: false,
    isPlugin: true,
    isSingleThread: true,
  }
): Promise<CompileResult | void> {
  const isCompileUniModules = process.env.UNI_COMPILE_TARGET === 'uni_modules'
  const pkg = resolvePackage(pluginDir)
  if (!pkg) {
    return
  }

  // 加密插件
  if (isEncrypt(pluginDir)) {
    return compileEncrypt(pluginDir, compilerOptions.isX)
  }
  const {
    isX,
    extApis,
    isExtApi,
    transform,
    sourceMap,
    isSingleThread,
    uni_modules,
    rewriteConsoleExpr,
  } = compilerOptions

  let isPlugin = compilerOptions.isPlugin

  const cacheDir = process.env.HX_DEPENDENCIES_DIR || ''
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const utsPlatform = process.env.UNI_UTS_PLATFORM

  const pluginRelativeDir = relative(
    isCompileUniModules ? uvueOutDir('app-android') : inputDir,
    pluginDir
  )
  const outputPluginDir = normalizePath(join(outputDir, pluginRelativeDir))

  const indexModuleFilename = isModule(pluginDir)
    ? normalizePath(join(pluginDir, 'index.module.uts'))
    : ''

  if (indexModuleFilename) {
    isPlugin = false
  }

  const androidComponents = indexModuleFilename
    ? {}
    : resolveAndroidComponents(pluginDir, pkg.is_uni_modules)
  const iosComponents = indexModuleFilename
    ? {}
    : resolveIOSComponents(pluginDir, pkg.is_uni_modules)

  const customElements = resolveCustomElements(pluginDir)

  const env = initCheckOptionsEnv()
  const deps: string[] = []
  const inject_apis: string[] = []
  const scoped_slots: string[] = []
  const custom_elements: Record<string, string> = {}
  const meta = {
    exports: {},
    types: {},
    typeParams: [],
    components: [],
    customElements: Object.keys(customElements),
  }
  let moduleName = pkg.id
  try {
    moduleName = require(join(pluginDir, 'package.json')).displayName
  } catch (e) {}
  const proxyCodeOptions: GenProxyCodeOptions = extend(
    {
      androidComponents,
      iosComponents,
      customElements,
      format:
        process.env.UNI_UTS_JS_CODE_FORMAT === 'cjs' ? FORMATS.CJS : FORMATS.ES,
      pluginRelativeDir,
      moduleName,
      moduleType: process.env.UNI_UTS_MODULE_TYPE || '',
      meta,
      inputDir,
      isExtApi,
      androidPreprocessor: compilerOptions.androidPreprocessor,
      iosPreprocessor: compilerOptions.iosPreprocessor,
    },
    pkg
  )

  const code = isCompileUniModules
    ? ''
    : await genProxyCode(pluginDir, proxyCodeOptions)

  let errMsg = ''
  if (process.env.NODE_ENV !== 'development' || isCompileUniModules) {
    // uts 插件 wgt 模式，本地资源模式不需要编译、ext-api模式也不需要编译（已经有前置编译过了）
    if (
      process.env.UNI_APP_PRODUCTION_TYPE === 'WGT' ||
      // 当编译 ext-api 中的 pages/components 时，不需要编译 utssdk 插件
      (process.env.UNI_COMPILE_TARGET === 'ext-api' &&
        (process.env.UNI_COMPILE_EXT_API_TYPE === 'pages' ||
          process.env.UNI_COMPILE_EXT_API_TYPE === 'components'))
    ) {
      const result = createResult(
        outputPluginDir,
        errMsg,
        code,
        deps,
        [],
        [],
        {},
        meta
      )
      // 依赖的插件，不需要编译
      if (
        process.env.UNI_COMPILE_EXT_API_PLUGIN_ID &&
        process.env.UNI_COMPILE_EXT_API_PLUGIN_ID !== pkg.id
      ) {
        result.code = requireUTSPluginCode(pkg.id, true)
        result.encrypt = true
      }
      return result
    }
    // 生产模式 支持同时生成 android 和 ios 的 uts 插件
    if (
      utsPlatform === 'app-android' ||
      utsPlatform === 'app' ||
      utsPlatform === 'app-plus'
    ) {
      let filename =
        indexModuleFilename ||
        resolvePlatformIndex('app-android', pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)
      if (
        !filename &&
        (Object.keys(androidComponents).length ||
          Object.keys(customElements).length)
      ) {
        filename = resolvePlatformIndexFilename('app-android', pluginDir, pkg)
      }
      if (filename) {
        const result = await getCompiler('kotlin').runProd(filename, {
          components: androidComponents,
          customElements,
          uniModuleId: pkg.id,
          isX,
          isSingleThread,
          isPlugin,
          isExtApi,
          isModule: !!indexModuleFilename,
          extApis,
          transform: await initCompilerOptionsTransform(
            'kotlin',
            compilerOptions
          ),
          sourceMap: !!sourceMap,
          hookClass: proxyCodeOptions.androidHookClass || '',
          uniModules: uni_modules || [],
          outFilename: indexModuleFilename
            ? normalizePath(
                join(pluginRelativeDir, 'utssdk', 'app-android', 'index.kt')
              )
            : '',
        })
        if (result) {
          if (result.inject_apis) {
            inject_apis.push(...result.inject_apis)
          }
          if (result.scoped_slots) {
            scoped_slots.push(...result.scoped_slots)
          }
          const custom_elements = result.custom_elements || {}
          Object.keys(custom_elements).forEach((key) => {
            custom_elements[key] = custom_elements[key]
          })
        }
        if (!isCompileUniModules && cacheDir) {
          // 存储 sourcemap
          storeSourceMap(
            'app-android',
            pluginRelativeDir,
            outputDir,
            cacheDir,
            pkg.is_uni_modules
          )
          genManifestFile('app-android', {
            pluginDir,
            env,
            cacheDir,
            pluginRelativeDir,
            is_uni_modules: pkg.is_uni_modules,
            deps: result?.deps,
          })
        }
      }
    }
    if (
      utsPlatform === 'app-ios' ||
      utsPlatform === 'app' ||
      utsPlatform === 'app-plus'
    ) {
      let filename =
        indexModuleFilename ||
        resolvePlatformIndex('app-ios', pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)
      if (
        !filename &&
        (Object.keys(androidComponents).length ||
          Object.keys(customElements).length)
      ) {
        filename = resolvePlatformIndexFilename('app-ios', pluginDir, pkg)
      }
      if (filename) {
        const result = await getCompiler('swift').runProd(filename, {
          components: iosComponents,
          customElements,
          uniModuleId: pkg.id,
          isX,
          isSingleThread,
          isPlugin: true, // iOS 目前仅有 plugin 模式
          isExtApi,
          extApis,
          transform: await initCompilerOptionsTransform(
            'swift',
            compilerOptions
          ),
          sourceMap: !!sourceMap,
          hookClass: proxyCodeOptions.iOSHookClass || '',
          uniModules: uni_modules || [],
        })
        if (result) {
          if (result.inject_apis) {
            inject_apis.push(...result.inject_apis)
          }
          if (result.scoped_slots) {
            scoped_slots.push(...result.scoped_slots)
          }
        }
        if (!isCompileUniModules && cacheDir) {
          storeSourceMap(
            'app-ios',
            pluginRelativeDir,
            outputDir,
            cacheDir,
            pkg.is_uni_modules
          )
          genManifestFile('app-ios', {
            pluginDir,
            env,
            cacheDir,
            pluginRelativeDir,
            is_uni_modules: pkg.is_uni_modules,
            deps: result?.deps,
          })
        }
      }
    }
  } else {
    const compilerType = utsPlatform === 'app-android' ? 'kotlin' : 'swift'
    const versionTips = getCompiler(compilerType).checkVersionTips(
      pkg.id,
      pluginDir,
      pkg.is_uni_modules
    )
    // iOS windows 平台，标准基座不编译
    if (utsPlatform === 'app-ios') {
      if (isWindows) {
        process.env.UNI_UTS_ERRORS = `iOS手机在windows上使用标准基座真机运行无法使用uts插件，如需使用uts插件请提交云端打包自定义基座`
        return createResult(
          outputPluginDir,
          errMsg,
          code,
          deps,
          [],
          [],
          {},
          meta
        )
      }
    }
    if (utsPlatform === 'app-android' || utsPlatform === 'app-ios') {
      const components =
        utsPlatform === 'app-android' ? androidComponents : iosComponents
      let tips = ''
      // dev 模式
      if (cacheDir) {
        // 检查缓存
        // let start = Date.now()
        // console.log('uts插件[' + pkg.id + ']start', start)
        const res = await checkCompile(
          utsPlatform,
          process.env.HX_USE_BASE_TYPE,
          {
            id: pkg.id,
            env,
            cacheDir,
            outputDir,
            pluginDir,
            pluginRelativeDir,
            is_uni_modules: pkg.is_uni_modules,
          }
        )
        if (res.tips) {
          tips = res.tips
        }
        // console.log('uts插件[' + pkg.id + ']end', Date.now())
        // console.log('uts插件[' + pkg.id + ']缓存检查耗时：', Date.now() - start)
        if (!res.expired) {
          if (utsPlatform === 'app-android') {
            // debugger 专用
            restoreDebuggerFiles(
              pluginRelativeDir,
              cacheDir,
              outputDir,
              pkg.is_uni_modules,
              inputDir,
              rewriteConsoleExpr
            )
            restoreDex(
              pluginRelativeDir,
              cacheDir,
              outputDir,
              pkg.is_uni_modules
            )
          }

          // 还原 sourcemap
          restoreSourceMap(
            utsPlatform,
            pluginRelativeDir,
            outputDir,
            cacheDir,
            pkg.is_uni_modules
          )
          // 处理 config.json
          genConfigJson(
            utsPlatform,
            isX,
            (utsPlatform === 'app-android'
              ? proxyCodeOptions.androidHookClass
              : proxyCodeOptions.iOSHookClass) || '',
            components,
            customElements,
            pluginRelativeDir,
            pkg.is_uni_modules,
            inputDir,
            outputDir,
            resolveConfigProvider(utsPlatform, pkg.id, transform)
          )

          console.log(cacheTips(pkg.id))

          if (res.tips) {
            warn(res.tips)
          }
          if (versionTips) {
            warn(versionTips)
          }
          // 所有文件加入依赖
          return createResult(
            outputPluginDir,
            errMsg,
            code,
            res.files.map((name) => join(pluginDir, name)),
            [],
            [],
            {},
            meta
          )
        }
      }
      let filename =
        resolvePlatformIndex(utsPlatform, pluginDir, pkg) ||
        resolveRootIndex(pluginDir, pkg)

      if (
        !filename &&
        (Object.keys(components).length || Object.keys(customElements).length)
      ) {
        filename = resolvePlatformIndexFilename(utsPlatform, pluginDir, pkg)
      }

      if (filename) {
        deps.push(filename)
        if (utsPlatform === 'app-android') {
          deps.push(...resolveAndroidDepFiles(filename))
        } else {
          deps.push(...resolveIOSDepFiles(filename))
        }
        // 处理 config.json
        genConfigJson(
          utsPlatform,
          isX,
          (utsPlatform === 'app-android'
            ? proxyCodeOptions.androidHookClass
            : proxyCodeOptions.iOSHookClass) || '',
          components,
          customElements,
          pluginRelativeDir,
          pkg.is_uni_modules,
          inputDir,
          outputDir,
          resolveConfigProvider(utsPlatform, pkg.id, transform)
        )
        const res = await getCompiler(compilerType).runDev(filename, {
          components,
          customElements,
          isX,
          isSingleThread,
          isPlugin,
          isExtApi,
          cacheDir,
          pluginRelativeDir,
          is_uni_modules: pkg.is_uni_modules,
          rewriteConsoleExpr,
          extApis,
          transform: await initCompilerOptionsTransform(
            compilerType,
            compilerOptions
          ),
          sourceMap: !!sourceMap,
          uniModules: uni_modules || [],
        })
        if (res) {
          if (res.code) {
            //重要：该日志会被HBuilderX使用，用于识别uts插件编译是否失败，如果调整文案，需要通知HBuilderX。
            console.error(`uts插件[${pkg.id}]编译失败`)
          }
          if (isArray(res.deps) && res.deps.length) {
            // 添加其他文件的依赖
            deps.push(...res.deps)
          }
          let isSuccess = false
          if (res.type === 'swift') {
            if (res.code) {
              errMsg = compileErrMsg(pkg.id)
              try {
                const stacktrace = await parseUTSSwiftPluginStacktrace({
                  stacktrace: res.msg,
                  sourceMapFile: resolveUTSPluginSourceMapFile(
                    'swift',
                    filename,
                    inputDir,
                    outputDir
                  ),
                  sourceRoot: inputDir,
                })
                console.log(stacktrace)
              } catch (e) {
                console.error(`error: ` + res.msg)
              }
            } else {
              isSuccess = true
            }
          } else if (res.type === 'kotlin') {
            if (res.changed.length) {
              isSuccess = true
            }
          }
          if (isSuccess) {
            // 生成缓存文件
            if (cacheDir) {
              // 存储 sourcemap
              storeSourceMap(
                utsPlatform,
                pluginRelativeDir,
                outputDir,
                cacheDir,
                pkg.is_uni_modules
              )
              // 生成 manifest
              genManifestFile(utsPlatform, {
                pluginDir,
                env,
                cacheDir,
                pluginRelativeDir,
                is_uni_modules: pkg.is_uni_modules,
                deps: res?.deps,
              })
            }
            if (tips) {
              warn(tips)
            }
            if (versionTips) {
              warn(versionTips)
            }
          }
          const files: string[] = []
          if (process.env.UNI_APP_UTS_CHANGED_FILES) {
            try {
              files.push(...JSON.parse(process.env.UNI_APP_UTS_CHANGED_FILES))
            } catch (e) {}
          }
          if (res.changed && res.changed.length) {
            files.push(...res.changed)
          } else {
            if (res.type === 'kotlin') {
              errMsg = compileErrMsg(pkg.id)
            }
          }
          process.env.UNI_APP_UTS_CHANGED_FILES = JSON.stringify([
            ...new Set(files),
          ])
        } else {
          errMsg = compileErrMsg(pkg.id)
        }
      }
    }
  }
  return createResult(
    outputPluginDir,
    errMsg,
    code,
    deps,
    inject_apis,
    scoped_slots,
    custom_elements,
    meta
  )
}

export async function initCompilerOptionsTransform(
  compilerType: 'kotlin' | 'swift',
  options: UTSPluginCompilerOptions
) {
  const transform: Required<UTSPluginCompilerOptions>['transform'] = JSON.parse(
    JSON.stringify(options.transform || {})
  )
  const customAutoImports = await initCompilerOptionsTransformAutoImports(
    compilerType === 'kotlin'
      ? options.kotlinAutoImports
      : options.swiftAutoImports
  )
  if (customAutoImports && Object.keys(customAutoImports).length) {
    const autoImports = transform.autoImports || {}
    Object.keys(customAutoImports).forEach((source) => {
      if (autoImports[source]) {
        autoImports[source].push(...customAutoImports[source])
      } else {
        autoImports[source] = customAutoImports[source]
      }
    })
    transform.autoImports = autoImports
  }

  return transform
}

async function initCompilerOptionsTransformAutoImports(
  autoImports: UTSPluginCompilerOptions['kotlinAutoImports']
) {
  return autoImports?.()
}

function emptyCacheDir(
  platform: 'app-android' | 'app-ios' | 'app-harmony',
  inputDir: string,
  pluginDir: string
) {
  const outputPluginDir = resolveOutputPluginDir(platform, inputDir, pluginDir)
  const uvueOutputPluginDir = resolveUVueOutputPluginDir(
    platform,
    inputDir,
    pluginDir
  )
  if (existsSync(outputPluginDir)) {
    emptyDir(outputPluginDir)
  }
  if (existsSync(uvueOutputPluginDir)) {
    emptyDir(uvueOutputPluginDir)
  }
}

function emptyDir(dir: string) {
  try {
    for (const file of readdirSync(dir)) {
      // node >= 14.14.0
      rmSync(resolve(dir, file), { recursive: true, force: true })
    }
  } catch (e) {}
}

/**
 * 发行模式(会自动清理临时目录)
 * 目前仅 ext-api 框架的地方使用了
 * @param platform
 * @param pluginDir
 * @param param2
 * @param compilerOptions
 */
export async function buildUniModules(
  platform: 'app' | 'app-android' | 'app-ios' | 'app-harmony',
  pluginDir: string,
  options: {
    syncUniModulesFilePreprocessors: {
      android: SyncUniModulesFilePreprocessor
      ios: SyncUniModulesFilePreprocessor
      harmony: SyncUniModulesFilePreprocessor
    }
    transformVueFile?: (
      platform: UniXCompilerPlatform,
      fileName: string
    ) => Promise<string>
    rootFiles?: string[]
  },
  compilerOptions: UTSPluginCompilerOptions
) {
  const inputDir = process.env.UNI_INPUT_DIR

  const syncUniModulesFilePreprocessors = options.transformVueFile
    ? patchSyncUniModulesFilePreprocessors(
        options.syncUniModulesFilePreprocessors,
        options.transformVueFile
      )
    : options.syncUniModulesFilePreprocessors

  if (platform === 'app-android' || platform === 'app') {
    const platform = 'app-android'
    emptyCacheDir(platform, inputDir, pluginDir)
    await compileUniModuleWithTsc(
      'app-android',
      pluginDir,
      createUniXKotlinCompiler(),
      {
        rootFiles: options.rootFiles,
        preprocessor: syncUniModulesFilePreprocessors.android,
      }
    )
  }
  if (platform === 'app-ios' || platform === 'app') {
    const platform = 'app-ios'
    emptyCacheDir(platform, inputDir, pluginDir)
    await compileUniModuleWithTsc(
      'app-ios',
      pluginDir,
      createUniXSwiftCompiler(),
      {
        rootFiles: options.rootFiles,
        preprocessor: syncUniModulesFilePreprocessors.ios,
      }
    )
  }
  if (platform === 'app-harmony') {
    const platform = 'app-harmony'
    emptyCacheDir(platform, inputDir, pluginDir)
    await compileUniModuleWithTsc(
      'app-harmony',
      pluginDir,
      createUniXArkTSCompiler(),
      {
        rootFiles: options.rootFiles,
        preprocessor: syncUniModulesFilePreprocessors.harmony,
      }
    )
  }
  if (process.env.UNI_UTS_MODULE_TYPE === 'built-in') {
    compilerOptions.androidPreprocessor =
      syncUniModulesFilePreprocessors.android
    compilerOptions.iosPreprocessor = syncUniModulesFilePreprocessors.ios
    compilerOptions.harmonyPreprocessor =
      syncUniModulesFilePreprocessors.harmony
  }
  if (platform === 'app-harmony') {
    return compileArkTS(pluginDir, {
      isX: compilerOptions.isX,
      isExtApi: compilerOptions.isExtApi,
      sourceMap: compilerOptions.sourceMap,
      rewriteConsoleExpr: compilerOptions.rewriteConsoleExpr,
      transform: {
        uniExtApiProviderName: compilerOptions.transform?.uniExtApiProviderName,
        uniExtApiProviderService:
          compilerOptions.transform?.uniExtApiProviderService,
        uniExtApiProviderServicePlugin:
          compilerOptions.transform?.uniExtApiProviderServicePlugin,
      },
    })
  }
  return compile(pluginDir, compilerOptions)
}

function patchSyncUniModulesFilePreprocessors(
  syncUniModulesFilePreprocessors: {
    android: SyncUniModulesFilePreprocessor
    ios: SyncUniModulesFilePreprocessor
    harmony: SyncUniModulesFilePreprocessor
  },
  transformVueFile: (
    platform: UniXCompilerPlatform,
    fileName: string
  ) => Promise<string>
) {
  return {
    android: patchSyncUniModulesFilePreprocessor(
      'app-android',
      syncUniModulesFilePreprocessors.android,
      transformVueFile
    ),
    ios: patchSyncUniModulesFilePreprocessor(
      'app-ios',
      syncUniModulesFilePreprocessors.ios,
      transformVueFile
    ),
    harmony: patchSyncUniModulesFilePreprocessor(
      'app-harmony',
      syncUniModulesFilePreprocessors.harmony,
      transformVueFile
    ),
  }
}

function patchSyncUniModulesFilePreprocessor(
  platform: UniXCompilerPlatform,
  preprocessor: SyncUniModulesFilePreprocessor,
  transformVueFile: (
    platform: UniXCompilerPlatform,
    fileName: string
  ) => Promise<string>
) {
  return async (content: string, fileName: string) => {
    const fileExtname = extname(fileName)
    if (['.vue', '.uvue'].includes(fileExtname)) {
      return transformVueFile(platform, fileName)
    }
    return preprocessor(content, fileName)
  }
}

export * from './uni_modules'
