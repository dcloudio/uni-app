import path from 'path'
import fs from 'fs-extra'

import type {
  UTSBundleOptions,
  UTSInputOptions,
  UTSOutputOptions,
  UTSResult,
} from '@dcloudio/uts'

import {
  D8_DEFAULT_ARGS,
  type KotlinCompilerServer,
  type RunKotlinBuildResult,
  type RunKotlinDevResult,
  createStderrListener,
  getUniModulesCacheJars,
  getUniModulesEncryptCacheJars,
  getUniModulesJars,
  kotlinDir,
  parseUTSModuleConfigJsonJars,
  parseUTSModuleLibsJars,
  resolveKotlincArgs,
} from '../kotlin'
import { parseUTSSyntaxError } from '../stacktrace'
import {
  addPluginInjectComponents,
  getCompilerServer,
  getPluginInjectApis,
  getPluginInjectComponents,
  getUTSCompiler,
  isEnableInlineReified,
  isEnableSplitClass,
  parseExtApiDefaultParameters,
  parseInjectModules,
  resolveUniAppXSourceMapPath,
  shouldAutoImportUniCloud,
} from '../utils'
import {
  type KotlinManifestCache,
  hbuilderFormatter,
} from '../stacktrace/kotlin'
import { isWindows } from '../shared'

const DEFAULT_IMPORTS = [
  'io.dcloud.uts.Map',
  'io.dcloud.uts.Set',
  'io.dcloud.uts.UTSAndroid',
  'io.dcloud.uts.*',
  'io.dcloud.uniapp.*',
  'io.dcloud.uniapp.framework.*',
  'io.dcloud.uniapp.vue.*',
  'io.dcloud.uniapp.vue.shared.*',
  'io.dcloud.uniapp.runtime.*',
  'io.dcloud.uniapp.extapi.*',
]

type UniCloudObjectInfo = {
  name: string
  methodList: string[]
}

export interface CompileAppOptions {
  inputDir: string
  outputDir: string
  outFilename?: string
  package: string
  sourceMap: boolean
  uni_modules: string[]
  pages: string[]
  extApis?: Record<string, [string, string]>
  split?: boolean
  disableSplitManifest?: boolean
  uniCloudObjectInfo?: Array<UniCloudObjectInfo>
  pageCount: number
  extApiComponents: string[]
  uvueClassNamePrefix?: string
  autoImports?: Record<string, [string, string?][]>
  // service、name、class
  extApiProviders?: [string, string, string][]
  uniModulesArtifacts?: {
    name: string
    package: string
    scopedSlots: string[]
    declaration: string
  }[]
  env?: Record<string, unknown>
  transform?: UTSOutputOptions['transform']
}

export async function compileApp(entry: string, options: CompileAppOptions) {
  const split = !!options.split
  const { bundle, UTSTarget } = getUTSCompiler()
  const imports = [...DEFAULT_IMPORTS]
  const isProd = process.env.NODE_ENV !== 'development'
  const {
    package: pkg,
    inputDir,
    outputDir,
    sourceMap,
    uni_modules,
    extApis,
    autoImports = {},
    pages,
  } = options

  if (shouldAutoImportUniCloud()) {
    imports.push('io.dcloud.unicloud.*')
  }

  const input: UTSInputOptions = {
    root: inputDir,
    filename: entry,
    paths: {
      vue: 'io.dcloud.uniapp.vue',
      '@dcloudio/uni-app': 'io.dcloud.uniapp.framework',
      '@dcloudio/uni-runtime': 'io.dcloud.uniapp.framework.runtime',
    },
    uniModules: uni_modules,
    uniModulesPrefix: process.env.UNI_UTS_MODULE_PREFIX || '',
    uniXPages: pages,
    globals: {
      envs: {
        ...options.env,
        // 自动化测试
        NODE_ENV: process.env.NODE_ENV,
        UNI_AUTOMATOR_WS_ENDPOINT: process.env.UNI_AUTOMATOR_WS_ENDPOINT || '',
        UNI_AUTOMATOR_APP_WEBVIEW_SRC:
          process.env.UNI_AUTOMATOR_APP_WEBVIEW_SRC || '',
      },
    },
  }

  const hbxVersion = process.env.HX_Version || process.env.UNI_COMPILER_VERSION

  const bundleOptions: UTSBundleOptions = {
    mode: process.env.NODE_ENV,
    hbxVersion,
    input,
    output: {
      errorFormat: 'json',
      isX: true,
      isSingleThread: true,
      isApp: true,
      isPlugin: false,
      outDir: isProd
        ? kotlinSrcDir(path.resolve(outputDir, '.uniappx/android/'))
        : kotlinSrcDir(kotlinDir(outputDir)),
      outFilename: options.outFilename || 'index.kt', // 强制 main.kt => index.kt 因为云端，真机运行识别的都是 index.kt
      package: pkg,
      sourceMap:
        sourceMap !== false
          ? resolveUniAppXSourceMapPath(kotlinDir(outputDir))
          : false,
      extname: 'kt',
      imports,
      logFilename: true,
      noColor: true,
      split,
      splitClass: isEnableSplitClass(),
      disableSplitManifest: options.disableSplitManifest,
      uniAppX: {
        uvueOutDir: uvueOutDir('app-android'),
      },
      transform: {
        uniExtApiDefaultNamespace: 'io.dcloud.uniapp.extapi',
        uniExtApiNamespaces: extApis,
        uniExtApiDefaultParameters: parseExtApiDefaultParameters(),
        uniExtApiProviders: options.extApiProviders,
        uvueClassNamePrefix: options.uvueClassNamePrefix || 'Gen',
        uvueGenDefaultAs: '__sfc__',
        uniCloudObjectInfo: options.uniCloudObjectInfo,
        autoImports,
        uniModulesArtifacts: options.uniModulesArtifacts,
        enableUtsNumber: false,
        enableNarrowType: false, // 这里的启用是把部分typeof转换成instanceof，这样确实好一点，但会引发一些kotlin之类的警告，暂不开启
        enableInlineReified: isEnableInlineReified(),
        ...options.transform,
      },
    },
  }
  let hasCache = false
  if (!isProd) {
    const kotlinRootOutDir = kotlinDir(outputDir)
    const kotlinSrcOutDir = kotlinSrcDir(kotlinRootOutDir)
    const manifest = readKotlinManifestJson(kotlinSrcOutDir)
    if (manifest && manifest.env) {
      if (manifest.env.compiler_version !== hbxVersion) {
        // 优先判断版本是否有变更，有变更，清除所有缓存
        fs.removeSync(kotlinRootOutDir)
      } else {
        hasCache = true
      }
    }
  }

  // const time = Date.now()
  // console.log(bundleOptions)

  const result = await bundle(UTSTarget.KOTLIN, bundleOptions)
  // console.log('UTS编译耗时: ' + (Date.now() - time) + 'ms')
  if (!result) {
    return
  }

  if (result.error) {
    throw parseUTSSyntaxError(result.error, inputDir)
  }
  if (isProd) {
    const autoImportUniCloud = shouldAutoImportUniCloud()
    const useUniCloudApi =
      result.inject_apis &&
      result.inject_apis.find((api) => api.startsWith('uniCloud.'))
    if (autoImportUniCloud && !useUniCloudApi) {
      result.inject_apis = result.inject_apis || []
      result.inject_apis.push('uniCloud.importObject')
    }
    return runKotlinBuild(options, result)
  }

  return runKotlinDev(options, result as RunKotlinDevResult, hasCache)
}

export function uvueOutDir(
  platform: 'app-android' | 'app-ios' | 'app-harmony'
) {
  return path.join(process.env.UNI_APP_X_UVUE_DIR, platform)
}

export function tscOutDir(platform: 'app-android' | 'app-ios' | 'app-harmony') {
  return path.join(process.env.UNI_APP_X_TSC_DIR, platform)
}

export function kotlinSrcDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'src')
}

function kotlinDexDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'dex')
}

function kotlinClassDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'class')
}

function resolveDexByKotlinFile(kotlinDexOutDir: string, kotlinFile: string) {
  return path.join(
    path.resolve(kotlinDexOutDir, kotlinFile).replace('.kt', ''),
    'classes.dex'
  )
}

function parseKotlinChangedFiles(
  result: RunKotlinDevResult,
  kotlinSrcOutDir: string,
  kotlinDexOutDir: string,
  outputDir: string
) {
  // 解析发生变化的
  const kotlinChangedFiles = result.changed.map((file) => {
    const dexFile = resolveDexByKotlinFile(kotlinDexOutDir, file)
    // 如果kt文件变化，则删除对应的dex文件
    if (fs.existsSync(dexFile)) {
      fs.unlinkSync(dexFile)
    }
    return path.resolve(kotlinSrcOutDir, file)
  })
  // 解析未发生变化，但dex不存在的
  ;['index.kt', ...(result.chunks || [])].forEach((chunk) => {
    const chunkFile = path.resolve(kotlinSrcOutDir, chunk)
    if (!kotlinChangedFiles.includes(chunkFile)) {
      const dexFile = resolveDexByKotlinFile(kotlinDexOutDir, chunk)
      if (fs.existsSync(dexFile)) {
        // 如果缓存的dex文件存在，则不需要重新编译，但需要确定outputDir中存在dex文件
        const targetDexFile = resolveDexByKotlinFile(outputDir, chunk)
        if (!fs.existsSync(targetDexFile)) {
          fs.copySync(dexFile, targetDexFile)
        }
      } else {
        kotlinChangedFiles.push(chunkFile)
      }
    }
  })
  return kotlinChangedFiles
}

function syncDexList(
  dexList: string[],
  kotlinDexOutDir: string,
  outputDir: string
) {
  dexList.forEach((dex) => {
    const dexFile = path.resolve(kotlinDexOutDir, dex)
    const targetDexFile = path.resolve(outputDir, dex)
    fs.copySync(dexFile, targetDexFile)
  })
}

let isFirst = true
let checkConfigJsonDeps = true
async function runKotlinDev(
  options: CompileAppOptions,
  result: RunKotlinDevResult,
  hasCache: boolean
) {
  result.type = 'kotlin'
  const { inputDir, outputDir, pageCount, uni_modules } = options
  const kotlinRootOutDir = kotlinDir(outputDir)
  const kotlinDexOutDir = kotlinDexDir(kotlinRootOutDir)
  const kotlinSrcOutDir = kotlinSrcDir(kotlinRootOutDir)
  const kotlinChangedFiles = parseKotlinChangedFiles(
    result,
    kotlinSrcOutDir,
    kotlinDexOutDir,
    outputDir
  )
  const kotlinMainFile = path.resolve(kotlinSrcOutDir, result.filename!)
  // 开发模式下，需要生成 dex
  if (fs.existsSync(kotlinMainFile)) {
    if (!kotlinChangedFiles.length) {
      if (isFirst) {
        isFirst = false
        console.log(
          `检测到编译缓存有效，跳过编译。详见：https://uniapp.dcloud.net.cn/uni-app-x/compiler/#cache`
        )
      }
    } else {
      const compilerServer = getCompilerServer<KotlinCompilerServer>(
        'uniapp-runextension'
      )
      if (!compilerServer) {
        throw new Error(`项目使用了uts插件，正在安装 uts Android 运行扩展...`)
      }
      // 检查是否有缓存文件
      if (isFirst) {
        isFirst = false
        if (hasCache) {
          console.log(
            `检测到编译缓存部分失效，开始差量编译。详见：https://uniapp.dcloud.net.cn/uni-app-x/compiler/#cache`
          )
        }
        // 仅windows
        if (isWindows) {
          console.log(
            `请在杀毒软件中设置扫描排除名单，减少系统资源消耗。[详情](https://uniapp.dcloud.net.cn/uni-app-x/compiler/#tips)`
          )
        }
      }
      const {
        getDefaultJar,
        getKotlincHome,
        compile: compileDex,
        checkDependencies,
      } = compilerServer

      const libsJars = parseUTSModuleLibsJars(uni_modules)

      let hasError = false
      const configJsonJars = await parseUTSModuleConfigJsonJars(
        2,
        uni_modules,
        checkDependencies!,
        checkConfigJsonDeps,
        () => {
          hasError = true
        }
      )
      // 发生错误需要重新check
      checkConfigJsonDeps = hasError

      // console.log('uni_modules', uni_modules)
      // console.log('libsJars', libsJars)
      // console.log('configJsonJars', configJsonJars)

      const cacheDir = process.env.HX_DEPENDENCIES_DIR || ''
      const kotlinClassOutDir = kotlinClassDir(kotlinRootOutDir)
      const waiting = { done: undefined }

      const compileOptions = {
        version: 'v2',
        pageCount,
        kotlinc: resolveKotlincArgs(
          kotlinChangedFiles,
          kotlinClassOutDir,
          getKotlincHome(),
          [kotlinClassOutDir].concat(
            getDefaultJar(2)
              // 加密插件已经迁移到普通插件目录了，理论上不需要了
              .concat(getUniModulesEncryptCacheJars(cacheDir)) // 加密插件jar
              .concat(getUniModulesCacheJars(cacheDir)) // 普通插件jar
              .concat(getUniModulesJars(outputDir)) // cli版本插件jar（没有指定cache的时候）
              .concat(configJsonJars) // 插件config.json依赖
              .concat(libsJars) // 插件本地libs
          )
        ).concat(['-module-name', `main-${+Date.now()}`]),
        d8: D8_DEFAULT_ARGS,
        kotlinOutDir: kotlinClassOutDir,
        dexOutDir: kotlinDexOutDir,
        inputDir: kotlinSrcOutDir,
        stderrListener: createStderrListener(
          kotlinSrcOutDir,
          resolveUniAppXSourceMapPath(kotlinRootOutDir),
          waiting,
          hbuilderFormatter
        ),
      }
      result.kotlinc = true
      // console.log('DEX编译参数:', compileOptions)
      const { code, msg, data } = await compileDex(compileOptions, inputDir)
      // 等待 stderrListener 执行完毕
      if (waiting.done) {
        await waiting.done
      }
      // console.log('DEX编译结果:', code, data)
      if (!code && data) {
        result.changed = data.dexList
        syncDexList(data.dexList, kotlinDexOutDir, outputDir)
      } else {
        // 编译失败，需要调整缓存的 manifest.json
        if (result.changed.length) {
          const manifest = readKotlinManifestJson(kotlinSrcOutDir)
          if (manifest && manifest.files) {
            result.changed.forEach((file) => {
              delete manifest.files[file]
            })
            writeKotlinManifestJson(kotlinSrcOutDir, manifest)
          }
          result.changed = []
        }

        if (msg) {
          console.error(msg)
        }
      }
    }
  }
  return result
}

async function runKotlinBuild(options: CompileAppOptions, result: UTSResult) {
  ;(result as RunKotlinBuildResult).type = 'kotlin'
  addPluginInjectComponents(options.extApiComponents)
  ;(result as RunKotlinBuildResult).inject_modules = parseInjectModules(
    (result.inject_apis || []).concat(getPluginInjectApis()),
    options.extApis || {},
    getPluginInjectComponents()
  )
  ;(result as RunKotlinBuildResult).kotlinc = false
  return result as RunKotlinBuildResult
}

function readKotlinManifestJson(
  kotlinSrcOutDir: string
): KotlinManifestCache | undefined {
  const file = path.resolve(kotlinSrcOutDir, '.manifest.json')
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  }
}

function writeKotlinManifestJson(
  kotlinSrcOutDir: string,
  manifest: KotlinManifestCache
) {
  fs.writeFileSync(
    path.resolve(kotlinSrcOutDir, '.manifest.json'),
    JSON.stringify(manifest)
  )
}
