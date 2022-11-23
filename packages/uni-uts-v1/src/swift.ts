import fs from 'fs-extra'
import { capitalize } from '@vue/shared'
import {
  genUTSPlatformResource,
  getCompilerServer,
  getUtsCompiler,
  moveRootIndexSourceMap,
  resolveIOSDir,
  resolvePackage,
  resolveUTSPlatformFile,
  resolveUTSSourceMapPath,
  ToSwiftOptions,
} from './utils'
import { isInHBuilderX } from './shared'
import { UtsResult } from '@dcloudio/uts'
import path from 'path'

function parseSwiftPackage(filename: string) {
  const res = resolvePackage(filename)
  if (!res) {
    return {
      namespace: '',
    }
  }
  const namespace =
    'UTSSDK' + (res.is_uni_modules ? 'Modules' : '') + capitalize(res.name)
  return {
    namespace,
  }
}

export async function runSwiftProd(filename: string) {
  // 文件有可能是 app-android 里边的，因为编译到 ios 时，为了保证不报错，可能会去读取 android 下的 uts
  if (filename.includes('app-android')) {
    return
  }
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  await compile(filename, { inputDir, outputDir, sourceMap: true })
  genUTSPlatformResource(filename, {
    inputDir,
    outputDir,
    platform: 'app-ios',
    extname: '.swift',
  })
}

export type RunSwiftDevResult = UtsResult & {
  type: 'swift'
  code: number
  msg: string
  changed: string[]
}

let isEnvReady = true
export async function runSwiftDev(filename: string) {
  // 文件有可能是 app-android 里边的，因为编译到 ios 时，为了保证不报错，可能会去读取 android 下的 uts
  if (filename.includes('app-android')) {
    return
  }
  if (!isEnvReady) {
    console.error(`已跳过uts插件[${resolvePackage(filename)?.id}]的编译`)
    return
  }
  const compilerServer = getCompilerServer<SwiftCompilerServer>(
    'uts-development-ios'
  )
  if (!compilerServer) {
    throw `项目使用了uts插件，正在安装 uts iOS 运行扩展...`
  }
  if (compilerServer.checkEnv) {
    const { code, msg } = compilerServer.checkEnv()
    if (code) {
      isEnvReady = false
      console.error(msg)
      return
    }
  }
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const result = (await compile(filename, {
    inputDir,
    outputDir,
    sourceMap: true,
  })) as RunSwiftDevResult

  result.type = 'swift'

  const swiftFile = resolveUTSPlatformFile(filename, {
    inputDir,
    outputDir,
    platform: 'app-ios',
    extname: '.swift',
  })
  result.changed = []
  // 开发模式下，需要生成 framework
  if (fs.existsSync(swiftFile)) {
    let projectPath = inputDir
    const isCli = isCliProject(projectPath)
    if (isCli) {
      projectPath = path.resolve(projectPath, '..')
    }
    const { id, is_uni_modules } = resolvePackage(filename)!
    const { code, msg } = await compilerServer.compile({
      projectPath,
      isCli,
      type: 1,
      pluginName: id,
      utsPath: resolveCompilerUtsPath(inputDir, is_uni_modules),
      swiftPath: resolveCompilerSwiftPath(outputDir, is_uni_modules),
    })
    result.code = code
    result.msg = msg
    result.changed = [swiftFile]
  }
  return result
}

function resolveCompilerUtsPath(projectPath: string, is_uni_modules: boolean) {
  return path.resolve(projectPath, is_uni_modules ? 'uni_modules' : 'utssdk')
}

function resolveCompilerSwiftPath(outputDir: string, is_uni_modules: boolean) {
  return path.resolve(outputDir, is_uni_modules ? 'uni_modules' : 'utssdk')
}

function isCliProject(projectPath: string) {
  if (projectPath.endsWith('src')) {
    return true
  }
  return false
}

export async function compile(
  filename: string,
  { inputDir, outputDir, sourceMap }: ToSwiftOptions
) {
  const { bundle, UtsTarget } = getUtsCompiler()
  // let time = Date.now()
  const result = await bundle(UtsTarget.SWIFT, {
    input: {
      root: inputDir,
      filename,
    },
    output: {
      isPlugin: true,
      outDir: outputDir,
      package: parseSwiftPackage(filename).namespace,
      sourceMap: sourceMap ? resolveUTSSourceMapPath() : false,
      extname: 'swift',
      imports: ['DCUTSFoundation'],
      logFilename: true,
      noColor: isInHBuilderX(),
    },
  })
  sourceMap &&
    moveRootIndexSourceMap(filename, {
      inputDir,
      outputDir,
      platform: 'app-ios',
      extname: '.swift',
    })
  return result
}

const deps = ['Info.plist', 'config.json']

export function resolveIOSDepFiles(filename: string) {
  const dir = resolveIOSDir(filename)
  return deps.map((dep) => path.resolve(dir, dep))
}

interface SwiftCompilerServer {
  compile(options: {
    projectPath: string
    isCli: boolean
    type: 1 | 2 // 1 => uni_modules , 2 => utssdk
    pluginName: string
    utsPath: string
    swiftPath: string
  }): Promise<{ code: number; msg: string }>
  checkEnv?: () => { code: number; msg: string }
}
