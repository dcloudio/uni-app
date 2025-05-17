import fs from 'fs-extra'
import path, { join } from 'path'
import {
  type RunDevOptions,
  type RunProdOptions,
  type ToSwiftOptions,
  addPluginInjectApis,
  copyPlatformNativeLanguageFiles,
  genComponentsCode,
  genUTSPlatformResource,
  getCompilerServer,
  getUTSCompiler,
  isColorSupported,
  moveRootIndexSourceMap,
  normalizeUTSResult,
  parseExtApiDefaultParameters,
  parseSwiftPackageWithPluginId,
  resolveBundleInputFileName,
  resolveBundleInputRoot,
  resolveConfigProvider,
  resolveIOSDir,
  resolvePackage,
  resolveUTSPlatformFile,
  resolveUTSSourceMapPath,
  shouldAutoImportUniCloud,
  updateManifestModulesByCloud,
} from './utils'
import { parseJson } from './shared'
import type {
  UTSBundleOptions,
  UTSInputOptions,
  UTSResult,
} from '@dcloudio/uts'
import { parseUTSSyntaxError } from './stacktrace'

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
  {
    components,
    customElements,
    uniModuleId,
    isPlugin,
    isModule,
    isX,
    isSingleThread,
    isExtApi,
    extApis,
    transform,
    sourceMap,
    hookClass,
    uniModules,
  }: RunProdOptions
) {
  // 文件有可能是 app-android 里边的，因为编译到 ios 时，为了保证不报错，可能会去读取 android 下的 uts
  if (filename.includes('app-android')) {
    return
  }
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const result = await compile(filename, {
    inputDir,
    outputDir,
    sourceMap: !!sourceMap,
    components,
    customElements,
    isX,
    isSingleThread,
    isPlugin,
    isExtApi,
    extApis,
    transform,
    uniModules,
  })
  if (!result) {
    return
  }
  if (result.error) {
    throw parseUTSSyntaxError(result.error, inputDir)
  }

  const autoImportUniCloud = shouldAutoImportUniCloud()
  const useUniCloudApi =
    result.inject_apis &&
    result.inject_apis.find((api) => api.startsWith('uniCloud.'))
  if (autoImportUniCloud && !useUniCloudApi) {
    result.inject_apis = result.inject_apis || []
    result.inject_apis.push('uniCloud.importObject')
  }

  if (result.inject_apis && result.inject_apis.length) {
    if (isModule) {
      // noop
    } else if (isX && process.env.UNI_UTS_COMPILER_TYPE === 'cloud') {
      updateManifestModulesByCloud(
        'app-ios',
        inputDir,
        result.inject_apis,
        extApis
      )
    } else {
      addPluginInjectApis(result.inject_apis)
    }
  }

  genUTSPlatformResource(filename, {
    isX,
    pluginId: uniModuleId,
    inputDir,
    outputDir,
    platform: 'app-ios',
    extname: '.swift',
    components,
    customElements,
    package: parseSwiftPackage(filename).namespace,
    hookClass,
    result,
    provider: resolveConfigProvider('app-ios', uniModuleId, transform),
    uniModules,
  })
}

export type RunSwiftDevResult = UTSResult & {
  type: 'swift'
  code: number
  msg: string
  changed: string[]
}

let isEnvReady = true

export async function runSwiftDev(
  filename: string,
  {
    components,
    customElements,
    isX,
    isSingleThread,
    isPlugin,
    isExtApi,
    extApis,
    transform,
    sourceMap,
    uniModules,
    rewriteConsoleExpr,
  }: RunDevOptions
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
    throw new Error(`项目使用了uts插件，正在安装 uts iOS 运行扩展...`)
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
    sourceMap: !!sourceMap,
    components,
    customElements,
    isX,
    isSingleThread,
    isPlugin,
    isExtApi,
    extApis,
    transform,
    uniModules,
  })) as RunSwiftDevResult

  if (!result) {
    return
  }
  if (result.error) {
    throw parseUTSSyntaxError(result.error, inputDir)
  }
  result.type = 'swift'

  const swiftFile = resolveUTSPlatformFile(filename, {
    isX,
    inputDir,
    outputDir,
    platform: 'app-ios',
    extname: '.swift',
    package: '',
    result,
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

    const { srcFiles } = copyPlatformNativeLanguageFiles(
      path.resolve(inputDir, 'uni_modules', id, 'utssdk', 'app-ios'),
      path.resolve(outputDir, 'uni_modules', id, 'utssdk', 'app-ios'),
      ['.swift'],
      (fileName, content) => {
        if (!isX) {
          // 非 x 平台，需要替换所有 DCloudUniappRuntime 导入为 DCloudUTSFoundation
          content = content.replace(
            /DCloudUniappRuntime/g,
            'DCloudUTSFoundation'
          )
        }
        return rewriteConsoleExpr
          ? rewriteConsoleExpr(fileName, content)
          : content
      }
    )

    const { code, msg } = await compilerServer.compile({
      projectPath,
      isCli,
      type: is_uni_modules ? 1 : 2,
      pluginName: id,
      utsPath: resolveCompilerUTSPath(inputDir, is_uni_modules),
      swiftPath: resolveCompilerSwiftPath(outputDir, is_uni_modules),
    })
    result.deps = [...(result.deps || []), ...srcFiles]
    result.code = code
    result.msg = msg
    result.changed = [swiftFile]
  }
  return result
}

function resolveCompilerUTSPath(projectPath: string, is_uni_modules: boolean) {
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
  {
    inputDir,
    outputDir,
    sourceMap,
    components,
    customElements,
    isX,
    isSingleThread,
    isPlugin,
    isExtApi,
    extApis,
    transform,
    uniModules,
  }: ToSwiftOptions
) {
  const { bundle, UTSTarget } = getUTSCompiler()
  // let time = Date.now()
  const componentsCode = genComponentsCode(filename, components, isX)
  const { namespace, id: pluginId } = parseSwiftPackage(filename)
  const input: UTSInputOptions = {
    root: resolveBundleInputRoot('app-ios', inputDir),
    filename: resolveBundleInputFileName('app-ios', filename),
    pluginId,
    paths: {},
    uniModules,
    uniModulesPrefix: process.env.UNI_UTS_MODULE_PREFIX || '',
  }
  // 必须判断input.filename，因为input.filename可能跟filename不一样（可能会变成.uvue目录的文件）
  const isUTSFileExists = fs.existsSync(input.filename)
  if (componentsCode) {
    if (!isUTSFileExists) {
      input.fileContent = componentsCode
    } else {
      input.fileContent =
        fs.readFileSync(input.filename, 'utf8') + `\n` + componentsCode
    }
  } else {
    // uts文件不存在，且也无组件
    if (!isUTSFileExists) {
      return
    }
  }
  const options: UTSBundleOptions = {
    mode: process.env.NODE_ENV,
    hbxVersion: process.env.HX_Version || process.env.UNI_COMPILER_VERSION,
    input,
    output: {
      isX,
      isSingleThread,
      isPlugin,
      isExtApi,
      outDir: outputDir,
      package: namespace,
      sourceMap: sourceMap ? resolveUTSSourceMapPath() : false,
      extname: 'swift',
      imports: [
        ...(transform?.uniExtApiProviderName ? ['DCloudUTSExtAPI'] : []),
        'DCloudUTSFoundation',
        ...(isX ? ['DCloudUniappRuntime'] : []),
      ],
      logFilename: true,
      noColor: !isColorSupported(),
      transform: {
        uniExtApiDefaultNamespace: 'DCloudUTSExtAPI',
        uniExtApiNamespaces: extApis,
        uniExtApiDefaultParameters: parseExtApiDefaultParameters(),
        ...transform,
      },
    },
  }
  const result = await bundle(UTSTarget.SWIFT, options)
  sourceMap &&
    moveRootIndexSourceMap(filename, {
      isX,
      inputDir,
      outputDir,
      platform: 'app-ios',
      extname: '.swift',
      package: '',
      result,
    })
  return normalizeUTSResult('app-ios', result)
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
      if (
        configJson.deploymentTarget &&
        parseFloat(configJson.deploymentTarget) > 12
      ) {
        return `uts插件[${pluginId}]需在 iOS ${configJson.deploymentTarget} 版本及以上方可正常使用`
      }
    } catch (e) {}
  }
}
