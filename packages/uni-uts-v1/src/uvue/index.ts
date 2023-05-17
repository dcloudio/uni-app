import path from 'path'
import fs from 'fs-extra'
import {
  KotlinCompilerServer,
  RunKotlinDevResult,
  resolveD8Args,
  resolveDexFile,
  resolveJarPath,
  resolveKotlincArgs,
} from '../kotlin'
import { parseUTSSyntaxError } from '../stacktrace'
import {
  getCompilerServer,
  getUTSCompiler,
  resolveSourceMapFile,
  resolveUTSSourceMapPath,
} from '../utils'
import { UTSResult } from '@dcloudio/uts'
import { normalizePath } from '../shared'

const DEFAULT_IMPORTS = [
  'kotlinx.coroutines.async',
  'kotlinx.coroutines.CoroutineScope',
  'kotlinx.coroutines.Deferred',
  'kotlinx.coroutines.Dispatchers',
  'io.dcloud.uts.Map',
  'io.dcloud.uts.*',
  'io.dcloud.uts.framework.*',
  'io.dcloud.uts.vue.*',
  'io.dcloud.uts.vue.shared.*',
  'io.dcloud.uts.vue.reactivity.*',
  'io.dcloud.uniapp.runtime.*',
]

export interface CompileAppOptions {
  inputDir: string
  outputDir: string
  package: string
  sourceMap: boolean
}
export async function compileApp(entry: string, options: CompileAppOptions) {
  const { bundle, UTSTarget } = getUTSCompiler()
  const imports = [...DEFAULT_IMPORTS]

  const { package: pkg, inputDir, outputDir, sourceMap } = options

  const input: Parameters<typeof bundle>[1]['input'] = {
    root: inputDir,
    filename: entry,
    paths: {
      vue: 'io.dcloud.uts.vue',
    },
  }

  const result = await bundle(UTSTarget.KOTLIN, {
    input,
    output: {
      isPlugin: false,
      outDir: outputDir,
      package: pkg,
      sourceMap: sourceMap !== false ? resolveUTSSourceMapPath() : false,
      extname: 'kt',
      imports,
      logFilename: true,
      noColor: true,
      transform: {
        uniExtApiPackage: 'io.dcloud.uts.extapi',
        uvueClassNamePrefix: 'Gen',
      },
    },
  })
  if (!result) {
    return
  }
  if (result.error) {
    throw parseUTSSyntaxError(result.error, inputDir)
  }

  if (process.env.NODE_ENV !== 'development') {
    return runKotlinBuild(options, result)
  }
  return runKotlinDev(options, result as RunKotlinDevResult)
}

async function runKotlinDev(
  options: CompileAppOptions,
  result: RunKotlinDevResult
) {
  result.type = 'kotlin'
  result.changed = []

  const { inputDir, outputDir } = options
  const kotlinFile = path.resolve(outputDir, result.filename!)
  // 开发模式下，需要生成 dex
  if (fs.existsSync(kotlinFile)) {
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

    // time = Date.now()
    const jarFile = resolveJarPath(kotlinFile)
    const options = {
      kotlinc: resolveKotlincArgs(
        kotlinFile,
        getKotlincHome(),
        getDefaultJar(2)
      ),
      d8: resolveD8Args(jarFile),
      sourceRoot: inputDir,
      sourceMapPath: resolveSourceMapFile(outputDir, kotlinFile),
    }
    const res = await compileDex(options, inputDir)
    // console.log('dex compile time: ' + (Date.now() - time) + 'ms')
    if (res) {
      try {
        fs.unlinkSync(jarFile)
        // 短期内先不删除，方便排查问题
        // fs.unlinkSync(kotlinFile)
      } catch (e) {}
      const dexFile = resolveDexFile(jarFile)
      if (fs.existsSync(dexFile)) {
        result.changed = [normalizePath(path.relative(outputDir, dexFile))]
      }
    }
  }
  return result
}

async function runKotlinBuild(options: CompileAppOptions, result: UTSResult) {
  const { outputDir } = options
  const kotlinFile = path.resolve(outputDir, result.filename!)
  fs.moveSync(
    kotlinFile,
    path.resolve(
      outputDir,
      '.uniappx/android/src/' + path.basename(result.filename!)
    )
  )
}
