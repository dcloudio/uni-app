import path from 'path'
import fs from 'fs-extra'

import type {
  UTSBundleOptions,
  UTSInputOptions,
  UTSOutputOptions,
  UTSResult,
} from '@dcloudio/uts'

import { type RunKotlinDevResult, kotlinDir } from '../kotlin'
import { parseUTSSyntaxError } from '../stacktrace'
import {
  getUTSCompiler,
  isEnableInlineReified,
  isEnableSplitClass,
  parseExtApiDefaultParameters,
  resolveUniAppXSourceMapPath,
  shouldAutoImportUniCloud,
} from '../utils'

import {
  type RunUVueKotlinBuildOptions,
  type RunUVueKotlinDevOptions,
  kotlinSrcDir,
  readKotlinManifestJson,
  runUVueKotlinBuild,
  runUVueKotlinDev,
} from './kotlin'

const DEFAULT_IMPORTS = [
  'kotlin.properties.Delegates',
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
    throw parseUTSSyntaxError(result.error, process.env.UNI_INPUT_DIR)
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
    return runUVueKotlinBuild(options, result)
  }

  return runUVueKotlinDev(options, result as RunKotlinDevResult, hasCache)
}

export type CompileVaporAppOptions = RunUVueKotlinDevOptions &
  RunUVueKotlinBuildOptions

export async function compileVaporApp(options: CompileVaporAppOptions) {
  let hasCache = false
  const result: UTSResult = {}
  const isProd = process.env.NODE_ENV !== 'development'
  if (isProd) {
    return runUVueKotlinBuild(options, result)
  }
  return runUVueKotlinDev(options, result as RunKotlinDevResult, hasCache)
}

export function uvueOutDir(
  platform: 'app-android' | 'app-ios' | 'app-harmony'
) {
  return path.join(process.env.UNI_APP_X_UVUE_DIR, platform)
}

export function tscOutDir(platform: 'app-android' | 'app-ios' | 'app-harmony') {
  return path.join(process.env.UNI_APP_X_TSC_DIR, platform)
}
