import path from 'path'
import type {
  BuildUniModulesOptions,
  CompileResult,
  UTSPluginCompilerOptions,
} from '../index'
import type { BuildUTSFileOptions } from './index'

type UTSPlatform = 'app' | 'app-android' | 'app-ios' | 'app-harmony'
type UTSFilePlatform = Exclude<UTSPlatform, 'app'>
type UTSTargetLanguage = 'javascript' | 'kotlin' | 'swift' | 'arkts'
type AutoImports = Required<
  NonNullable<UTSPluginCompilerOptions['transform']>
>['autoImports']

interface CLIArgs {
  file: string
  uniModule: string
}

interface UTSCompiler {
  buildUTSFile: (
    platform: UTSFilePlatform,
    fileName: string,
    options: BuildUTSFileOptions,
    compilerOptions: UTSPluginCompilerOptions
  ) => Promise<CompileResult | void>
  buildUniModule: (
    platform: UTSPlatform,
    pluginDir: string,
    options: BuildUniModulesOptions,
    compilerOptions: UTSPluginCompilerOptions
  ) => Promise<CompileResult | void>
}

interface UniModulesShared {
  createAppAndroidUniModulesSyncFilePreprocessorOnce: (
    isX: boolean
  ) => BuildUniModulesOptions['syncUniModulesFilePreprocessors']['android']
  createAppIosUniModulesSyncFilePreprocessorOnce: (
    isX: boolean
  ) => BuildUniModulesOptions['syncUniModulesFilePreprocessors']['ios']
  createAppHarmonyUniModulesSyncFilePreprocessorOnce: (
    isX: boolean
  ) => BuildUniModulesOptions['syncUniModulesFilePreprocessors']['harmony']
  rewriteUniModulesConsoleExpr: (fileName: string, content: string) => string
}

interface UTSShared {
  initUTSKotlinAutoImportsOnce: () => Promise<AutoImports>
  initUTSSwiftAutoImportsOnce: () => Promise<AutoImports>
  parseKotlinPackageWithPluginId: (id: string, isUniModules: boolean) => string
  parseSwiftModuleWithPluginId: (id: string, isUniModules: boolean) => string
  parseUniExtApiNamespacesOnce: (
    platform: UTSPlatform,
    language: UTSTargetLanguage
  ) => Record<string, [string, string]>
}

const VALID_PLATFORMS: UTSPlatform[] = [
  'app',
  'app-android',
  'app-ios',
  'app-harmony',
]
const VALID_FILE_PLATFORMS: UTSFilePlatform[] = [
  'app-android',
  'app-ios',
  'app-harmony',
]

// CLI 只做参数解析和编译器参数拼装，具体编译逻辑继续复用 uni-uts-v1。
async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.file && !args.uniModule) {
    throw new Error('请通过 --file 或 --uni_module 指定要编译的内容')
  }
  if (args.file && args.uniModule) {
    throw new Error('--file 和 --uni_module 不能同时使用')
  }

  if (args.file) {
    await buildSingleUTSFile(args.file)
  } else {
    await buildSingleUniModule(args.uniModule)
  }
}

export async function buildSingleUTSFile(fileName: string) {
  const { buildUTSFile } = loadUTSCompiler()
  const sourceFile = path.resolve(fileName)
  const platform = readUTSFilePlatform()

  // 单文件编译默认以当前 uts 文件所在目录作为源码根目录。
  if (!process.env.UNI_INPUT_DIR) {
    process.env.UNI_INPUT_DIR = path.dirname(sourceFile)
  }
  await buildUTSFile(
    platform,
    sourceFile,
    {
      workDir: process.env.UNI_OUTPUT_DIR,
      sourceRoot: process.env.UNI_INPUT_DIR,
      clean: true,
    },
    {
      isX: process.env.UNI_APP_X === 'true',
      isPlugin: true,
      isSingleThread: true,
      sourceMap: true,
    }
  )
}

export async function buildSingleUniModule(pluginDir: string) {
  const { buildUniModule } = loadUTSCompiler()
  const {
    createAppAndroidUniModulesSyncFilePreprocessorOnce,
    createAppIosUniModulesSyncFilePreprocessorOnce,
    createAppHarmonyUniModulesSyncFilePreprocessorOnce,
    rewriteUniModulesConsoleExpr,
  } = loadUniModulesShared()
  const {
    initUTSKotlinAutoImportsOnce,
    initUTSSwiftAutoImportsOnce,
    parseKotlinPackageWithPluginId,
    parseSwiftModuleWithPluginId,
    parseUniExtApiNamespacesOnce,
  } = loadUTSShared()
  const resolvedPluginDir = path.resolve(pluginDir)
  const platform = readUTSPlatform()
  const targetLanguage = resolveUTSTargetLanguage(platform)

  process.env.UNI_UTS_TARGET_LANGUAGE = targetLanguage

  await buildUniModule(
    platform,
    resolvedPluginDir,
    {
      syncUniModulesFilePreprocessors: {
        android: createAppAndroidUniModulesSyncFilePreprocessorOnce(true),
        ios: createAppIosUniModulesSyncFilePreprocessorOnce(true),
        harmony: createAppHarmonyUniModulesSyncFilePreprocessorOnce(true),
      },
    },
    {
      isX: true,
      isPlugin: true,
      isSingleThread: true,
      sourceMap: true,
      // ext-api 的 platform/language 必须和当前 UNI_UTS_PLATFORM 保持一致。
      extApis: parseUniExtApiNamespacesOnce(platform, targetLanguage),
      async kotlinAutoImports() {
        return filterAutoImports(
          await initUTSKotlinAutoImportsOnce(),
          parseKotlinPackageWithPluginId(path.basename(resolvedPluginDir), true)
        )
      },
      async swiftAutoImports() {
        return filterAutoImports(
          await initUTSSwiftAutoImportsOnce(),
          parseSwiftModuleWithPluginId(path.basename(resolvedPluginDir), true)
        )
      },
      rewriteConsoleExpr: rewriteUniModulesConsoleExpr,
    }
  )
}

function filterAutoImports(autoImports: AutoImports, source: string) {
  if (!autoImports[source]) {
    return autoImports
  }
  return Object.keys(autoImports).reduce<AutoImports>((imports, key) => {
    if (key !== source) {
      imports[key] = autoImports[key]
    }
    return imports
  }, {})
}

export function resolveUTSTargetLanguage(
  platform: UTSPlatform
): UTSTargetLanguage {
  if (platform === 'app-android') {
    return 'kotlin'
  }
  if (platform === 'app-ios') {
    return 'swift'
  }
  if (platform === 'app-harmony') {
    return 'arkts'
  }
  return 'javascript'
}

function readUTSFilePlatform() {
  const platform = readUTSPlatform()
  if (!VALID_FILE_PLATFORMS.includes(platform as UTSFilePlatform)) {
    throw new Error(`单文件编译不支持 UNI_UTS_PLATFORM：${platform}`)
  }
  return platform as UTSFilePlatform
}

function readUTSPlatform() {
  const platform = process.env.UNI_UTS_PLATFORM as UTSPlatform | undefined
  if (!platform) {
    throw new Error('请先设置环境变量 UNI_UTS_PLATFORM')
  }
  if (!VALID_PLATFORMS.includes(platform)) {
    throw new Error(`不支持的 UNI_UTS_PLATFORM：${platform}`)
  }
  return platform
}

function loadUTSCompiler() {
  return require('../..') as UTSCompiler
}

function loadUniModulesShared() {
  return require(resolveHBuilderXPluginModule(
    'uniapp-cli-vite/node_modules/@dcloudio/uni-cli-shared/dist/vite/plugins/uts/uni_modules.js'
  )) as UniModulesShared
}

function loadUTSShared() {
  return require(resolveHBuilderXPluginModule(
    'uniapp-cli-vite/node_modules/@dcloudio/uni-cli-shared/dist/uts.js'
  )) as UTSShared
}

function resolveHBuilderXPluginModule(moduleName: string) {
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    throw new Error('请先设置环境变量 UNI_HBUILDERX_PLUGINS')
  }
  return path.join(process.env.UNI_HBUILDERX_PLUGINS, moduleName)
}

export function parseArgs(argv: string[]) {
  const args: CLIArgs = {
    file: '',
    uniModule: '',
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--file') {
      args.file = readArgValue(argv, ++i, '--file')
    } else if (arg.startsWith('--file=')) {
      args.file = arg.slice('--file='.length)
    } else if (arg === '--uni_module') {
      args.uniModule = readArgValue(argv, ++i, '--uni_module')
    } else if (arg.startsWith('--uni_module=')) {
      args.uniModule = arg.slice('--uni_module='.length)
    } else {
      throw new Error(`未知参数：${arg}`)
    }
  }
  return args
}

function readArgValue(argv: string[], index: number, name: string) {
  const value = argv[index]
  if (!value || value.startsWith('--')) {
    throw new Error(`${name} 缺少参数值`)
  }
  return value
}

if (require.main === module) {
  main()
    .then(() => {
      process.exit()
    })
    .catch((e) => {
      if (e && typeof e.customPrint === 'function') {
        e.customPrint()
      } else {
        console.error(e)
      }
      process.exitCode = 1
      process.exit()
    })
}
