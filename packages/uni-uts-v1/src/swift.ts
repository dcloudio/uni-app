import fs from 'fs-extra'
import path, { join } from 'path'
import {
  genComponentsCode,
  genUTSPlatformResource,
  getCompilerServer,
  getUtsCompiler,
  isColorSupported,
  moveRootIndexSourceMap,
  parseSwiftPackageWithPluginId,
  resolveIOSDir,
  resolvePackage,
  resolveUTSPlatformFile,
  resolveUTSSourceMapPath,
  ToSwiftOptions,
} from './utils'
import { parseJson } from './shared'
import { UtsResult } from '@dcloudio/uts'

function parseSwiftPackage(filename: string) {
  const res = resolvePackage(filename)
  if (!res) {
    return {
      id: '',
      namespace: '',
    }
  }
  const namespace = parseSwiftPackageWithPluginId(res.name, res.is_uni_modules)
  return {
    id: res.id,
    namespace,
  }
}

export async function runSwiftProd(
  filename: string,
  components: Record<string, string>
) {
  // 文件有可能是 app-android 里边的，因为编译到 ios 时，为了保证不报错，可能会去读取 android 下的 uts
  if (filename.includes('app-android')) {
    return
  }
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const res = await compile(filename, {
    inputDir,
    outputDir,
    sourceMap: true,
    components,
  })
  if (!res) {
    return
  }
  genUTSPlatformResource(filename, {
    inputDir,
    outputDir,
    platform: 'app-ios',
    extname: '.swift',
    components,
    package: parseSwiftPackage(filename).namespace,
  })
}

export type RunSwiftDevResult = UtsResult & {
  type: 'swift'
  code: number
  msg: string
  changed: string[]
}

let isEnvReady = true
export async function runSwiftDev(
  filename: string,
  components: Record<string, string>
) {
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
    components,
  })) as RunSwiftDevResult

  if (!result) {
    return
  }

  result.type = 'swift'

  const swiftFile = resolveUTSPlatformFile(filename, {
    inputDir,
    outputDir,
    platform: 'app-ios',
    extname: '.swift',
    components,
    package: '',
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
      type: is_uni_modules ? 1 : 2,
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
  { inputDir, outputDir, sourceMap, components }: ToSwiftOptions
) {
  const { bundle, UtsTarget } = getUtsCompiler()
  // let time = Date.now()
  const componentsCode = genComponentsCode(filename, components)
  const { namespace, id: pluginId } = parseSwiftPackage(filename)
  const input: Parameters<typeof bundle>[1]['input'] = {
    root: inputDir,
    filename,
    pluginId,
    paths: {},
  }
  const isUTSFileExists = fs.existsSync(filename)
  if (componentsCode) {
    if (!isUTSFileExists) {
      input.fileContent = componentsCode
    } else {
      input.fileContent =
        fs.readFileSync(filename, 'utf8') + `\n` + componentsCode
    }
  } else {
    // uts文件不存在，且也无组件
    if (!isUTSFileExists) {
      return
    }
  }
  const result = await bundle(UtsTarget.SWIFT, {
    input,
    output: {
      isPlugin: true,
      outDir: outputDir,
      package: namespace,
      sourceMap: sourceMap ? resolveUTSSourceMapPath() : false,
      extname: 'swift',
      imports: ['DCloudUTSFoundation'],
      logFilename: true,
      noColor: !isColorSupported(),
    },
  })
  sourceMap &&
    moveRootIndexSourceMap(filename, {
      inputDir,
      outputDir,
      platform: 'app-ios',
      extname: '.swift',
      components,
      package: '',
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

export function checkIOSVersionTips(
  pluginId: string,
  pluginDir: string,
  is_uni_modules: boolean
) {
  const configJsonFile = join(
    pluginDir,
    is_uni_modules ? 'utssdk' : '',
    'app-ios',
    'config.json'
  )
  if (configJsonFile && fs.existsSync(configJsonFile)) {
    try {
      const configJson = parseJson(fs.readFileSync(configJsonFile, 'utf8'))
      if (configJson.deploymentTarget) {
        return `uts插件[${pluginId}]需在 iOS ${configJson.deploymentTarget} 版本及以上方可正常使用`
      }
    } catch (e) {}
  }
}
