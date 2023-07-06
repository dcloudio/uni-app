import path from 'path'
import fs from 'fs-extra'
import {
  D8_DEFAULT_ARGS,
  KotlinCompilerServer,
  RunKotlinDevResult,
  getUniModulesCacheJars,
  getUniModulesJars,
  resolveKotlincArgs,
  createStderrListener,
} from '../kotlin'
import { parseUTSSyntaxError } from '../stacktrace'
import {
  getCompilerServer,
  getUTSCompiler,
  resolveSourceMapFile,
  resolveUTSSourceMapPath,
} from '../utils'
import { UTSBundleOptions, UTSInputOptions, UTSResult } from '@dcloudio/uts'
import { resolveSourceMapPath } from '../shared'

const DEFAULT_IMPORTS = [
  'kotlinx.coroutines.async',
  'kotlinx.coroutines.CoroutineScope',
  'kotlinx.coroutines.Deferred',
  'kotlinx.coroutines.Dispatchers',
  'io.dcloud.uts.Map',
  'io.dcloud.uts.Set',
  'io.dcloud.uts.UTSAndroid',
  'io.dcloud.uts.*',
  'io.dcloud.uts.framework.*',
  'io.dcloud.uts.vue.*',
  'io.dcloud.uts.vue.shared.*',
  'io.dcloud.uniapp.runtime.*',
]

export interface CompileAppOptions {
  inputDir: string
  outputDir: string
  package: string
  sourceMap: boolean
  uni_modules: string[]
  extApis?: Record<string, [string, string]>
  split?: boolean
  disableSplitManifest?: boolean
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
  } = options

  const input: UTSInputOptions = {
    root: inputDir,
    filename: entry,
    paths: {
      vue: 'io.dcloud.uts.vue',
    },
    uniModules: uni_modules,
    globals: {
      envs: {
        // 自动化测试
        NODE_ENV: process.env.NODE_ENV,
        UNI_AUTOMATOR_WS_ENDPOINT: process.env.UNI_AUTOMATOR_WS_ENDPOINT || '',
      },
    },
  }

  const bundleOptions: UTSBundleOptions = {
    input,
    output: {
      isX: true,
      isPlugin: false,
      outDir: isProd
        ? kotlinSrcDir(path.resolve(outputDir, '.uniappx/android/'))
        : kotlinSrcDir(kotlinDir(outputDir)),
      package: pkg,
      sourceMap: sourceMap !== false ? resolveUTSSourceMapPath() : false,
      extname: 'kt',
      imports,
      logFilename: true,
      noColor: true,
      split,
      disableSplitManifest: options.disableSplitManifest,
      transform: {
        uniExtApiDefaultNamespace: 'io.dcloud.uts.extapi',
        uniExtApiNamespaces: extApis,
        uvueClassNamePrefix: 'Gen',
      },
    },
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
    return runKotlinBuild(options, result)
  }

  return runKotlinDev(options, result as RunKotlinDevResult)
}

function kotlinDir(outputDir: string) {
  return path.resolve(outputDir, '../.kotlin')
}

function kotlinSrcDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'src')
}

function kotlinClassDir(kotlinDir: string) {
  return path.resolve(kotlinDir, 'class')
}

async function runKotlinDev(
  options: CompileAppOptions,
  result: RunKotlinDevResult
) {
  result.type = 'kotlin'
  const kotlinRootOutDir = kotlinDir(options.outputDir)
  const kotlinSrcOutDir = kotlinSrcDir(kotlinRootOutDir)
  const kotlinChangedFiles = result.changed.map((file) => {
    return path.resolve(kotlinSrcOutDir, file)
  })

  const { inputDir, outputDir } = options
  const kotlinMainFile = path.resolve(kotlinSrcOutDir, result.filename!)
  // 开发模式下，需要生成 dex
  if (kotlinChangedFiles.length && fs.existsSync(kotlinMainFile)) {
    const compilerServer = getCompilerServer<KotlinCompilerServer>(
      'uniapp-runextension'
    )
    if (!compilerServer) {
      throw `项目使用了uts插件，正在安装 uts Android 运行扩展...`
    }
    const {
      getDefaultJar,
      getKotlincHome,
      compile: compileDex,
    } = compilerServer

    const cacheDir = process.env.HX_DEPENDENCIES_DIR || ''

    const kotlinClassOutDir = kotlinClassDir(kotlinRootOutDir)
    const waiting = { done: undefined }
    const options = {
      version: 'v2',
      kotlinc: resolveKotlincArgs(
        kotlinChangedFiles,
        kotlinClassOutDir,
        getKotlincHome(),
        [kotlinClassOutDir].concat(
          getDefaultJar(2)
            .concat(getUniModulesCacheJars(cacheDir))
            .concat(getUniModulesJars(outputDir))
        )
      ).concat(['-module-name', `main-${+Date.now()}`]),
      d8: D8_DEFAULT_ARGS,
      kotlinOutDir: kotlinClassOutDir,
      dexOutDir: outputDir,
      inputDir: kotlinSrcOutDir,
      sourceRoot: inputDir,
      sourceMapPath: resolveSourceMapFile(outputDir, kotlinMainFile),
      stderrListener: createStderrListener(
        kotlinSrcOutDir,
        resolveSourceMapPath(),
        waiting
      ),
    }
    // console.log('DEX编译参数:', options)
    const { code, msg, data } = await compileDex(options, inputDir)
    // 等待 stderrListener 执行完毕
    if (waiting.done) {
      await waiting.done
    }
    // console.log('DEX编译结果:', code, data)
    if (!code && data) {
      result.changed = data.dexList
    } else {
      result.changed = []
      if (msg) {
        console.error(msg)
      }
    }
  }
  return result
}

async function runKotlinBuild(_options: CompileAppOptions, _result: UTSResult) {
  // TODO
}
