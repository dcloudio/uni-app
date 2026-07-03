import crypto from 'crypto'
import path from 'path'
import fs from 'fs-extra'
import type { SyncUniModulesFilePreprocessor } from '../uni_modules'

type BuildPlatform = 'app' | 'app-android' | 'app-ios' | 'app-harmony'

interface BuildUniModulesOptions {
  syncUniModulesFilePreprocessors: {
    android: SyncUniModulesFilePreprocessor
    ios: SyncUniModulesFilePreprocessor
    harmony: SyncUniModulesFilePreprocessor
  }
}

interface UTSPluginCompilerOptions {
  isX: boolean
  isPlugin: boolean
  isSingleThread: boolean
  sourceMap?: boolean
  rewriteConsoleExpr?: (fileName: string, content: string) => string
}

type BuildUniModule = (
  platform: BuildPlatform,
  pluginDir: string,
  options: BuildUniModulesOptions,
  compilerOptions: UTSPluginCompilerOptions
) => Promise<unknown>

export interface StandaloneUTSOptions {
  file?: string
  uni_module?: string
  uniModule?: string
  platform?: string
  inputDir?: string
  outputDir?: string
  tscDir?: string
  uvueDir?: string
  tscCacheDir?: string
  hbuilderxPlugins?: string
}

interface ResolvedOptions {
  file?: string
  uniModule?: string
  platform: BuildPlatform
  projectRoot: string
  inputDir: string
  outputDir: string
}

interface UniModulesShared {
  createAppAndroidUniModulesSyncFilePreprocessorOnce: (
    isX: boolean
  ) => SyncUniModulesFilePreprocessor
  createAppIosUniModulesSyncFilePreprocessorOnce: (
    isX: boolean
  ) => SyncUniModulesFilePreprocessor
  createAppHarmonyUniModulesSyncFilePreprocessorOnce: (
    isX: boolean
  ) => SyncUniModulesFilePreprocessor
  rewriteUniModulesConsoleExpr?: (fileName: string, content: string) => string
}

interface TempUniModule {
  id: string
  pluginDir: string
  entryFile: string
}

export async function buildStandaloneUTS(options: StandaloneUTSOptions) {
  const resolved = resolveOptions(options)
  initStandaloneEnv(resolved, options)

  const fileUniModule = resolved.file
    ? resolveFileUniModule(resolved.file, resolved.inputDir)
    : undefined
  const tempUniModule =
    resolved.file && !fileUniModule
      ? createTempUniModule(
          resolved.file,
          resolved.outputDir,
          resolved.inputDir
        )
      : undefined
  const pluginDir =
    fileUniModule ||
    (tempUniModule ? tempUniModule.pluginDir : resolved.uniModule!)

  const buildUniModule = loadBuildUniModule()
  const rewriteTempPath =
    resolved.file && tempUniModule
      ? createTempPathRewriter(
          tempUniModule.id,
          resolved.file,
          resolved.projectRoot,
          resolved.inputDir,
          tempUniModule.entryFile
        )
      : undefined
  const restoreConsole = rewriteTempPath
    ? installConsolePathRewriter(rewriteTempPath)
    : undefined
  try {
    const result = await buildUniModule(
      resolved.platform,
      pluginDir,
      {
        syncUniModulesFilePreprocessors: {
          android: createUniXPreprocessor('app-android'),
          ios: createUniXPreprocessor('app-ios'),
          harmony: createUniXPreprocessor('app-harmony'),
        },
      },
      {
        isX: true,
        isPlugin: true,
        isSingleThread: process.env.UNI_APP_X_SINGLE_THREAD !== 'false',
        // standalone CLI 面向单次定位问题，file/uni_module 都默认开启 sourcemap，保证编译错误回到 UTS 源码。
        sourceMap:
          !!resolved.file ||
          !!resolved.uniModule ||
          process.env.UNI_APP_SOURCEMAP === 'true',
        rewriteConsoleExpr: createUniModulesConsoleExprRewriter(),
      }
    )
    // 单文件模式复用 uni_module 编译链路，编译完成后只把最终平台产物收拢到 output/index。
    relocateStandaloneOutput(resolved, tempUniModule)
    console.log(`Build complete.`)
    return result
  } catch (error: any) {
    if (rewriteTempPath && error?.customPrint) {
      const customPrint = error.customPrint
      error.customPrint = () => {
        const restore = installConsolePathRewriter(rewriteTempPath)
        try {
          customPrint()
        } finally {
          restore()
        }
      }
    }
    throw error
  } finally {
    if (restoreConsole) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      restoreConsole()
    }
  }
}

function loadBuildUniModule(): BuildUniModule {
  // eslint-disable-next-line no-restricted-globals
  const compiler = require('../index') as { buildUniModule: BuildUniModule }
  return compiler.buildUniModule
}

function resolveOptions(options: StandaloneUTSOptions): ResolvedOptions {
  const file = options.file && path.resolve(options.file)
  const uniModule =
    (options.uni_module || options.uniModule) &&
    path.resolve((options.uni_module || options.uniModule)!)

  if (!!file === !!uniModule) {
    throw new Error('Please pass exactly one of --file or --uni_module.')
  }
  if (file) {
    if (path.extname(file) !== '.uts') {
      throw new Error(`--file must point to a .uts file: ${file}`)
    }
    if (!fs.existsSync(file)) {
      throw new Error(`UTS file does not exist: ${file}`)
    }
  }
  if (uniModule) {
    if (!fs.existsSync(uniModule) || !fs.statSync(uniModule).isDirectory()) {
      throw new Error(
        `uni_modules plugin directory does not exist: ${uniModule}`
      )
    }
    if (!normalizePath(uniModule).split('/').includes('uni_modules')) {
      throw new Error(
        `--uni_module must point to a uni_modules plugin directory.`
      )
    }
  }

  const platform = normalizePlatform(resolvePlatformOption(options.platform))
  const projectRoot = file
    ? findProjectRoot(path.dirname(file))
    : resolveUniModuleProjectRoot(uniModule!)
  const outputDir =
    options.outputDir ||
    process.env.UNI_OUTPUT_DIR ||
    path.resolve(projectRoot, 'dist', 'dev', getPlatformOutputDir(platform))
  const inputDir =
    options.inputDir ||
    process.env.UNI_INPUT_DIR ||
    (file ? outputDir : projectRoot)

  return {
    file,
    uniModule,
    platform,
    projectRoot,
    inputDir: path.resolve(inputDir),
    outputDir: path.resolve(outputDir),
  }
}

function initStandaloneEnv(
  { platform, inputDir, outputDir }: ResolvedOptions,
  options: StandaloneUTSOptions
) {
  const normalizedOutputDir = path.resolve(outputDir)
  const cacheDir =
    process.env.UNI_APP_X_CACHE_DIR ||
    path.resolve(
      normalizedOutputDir,
      '../cache/.' + path.basename(normalizedOutputDir)
    )

  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  process.env.UNI_NODE_ENV = process.env.UNI_NODE_ENV || process.env.NODE_ENV
  process.env.UNI_INPUT_DIR = inputDir
  process.env.UNI_OUTPUT_DIR = normalizedOutputDir
  process.env.UNI_PLATFORM = platform === 'app-harmony' ? 'app-harmony' : 'app'
  process.env.UNI_UTS_PLATFORM = platform
  process.env.UNI_UTS_TARGET_LANGUAGE = resolveTargetLanguage(platform)
  process.env.UNI_APP_X = process.env.UNI_APP_X || 'true'
  process.env.UNI_APP_X_TSC = process.env.UNI_APP_X_TSC || 'true'
  process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE =
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE || 'native'
  process.env.UNI_APP_X_CACHE_DIR = cacheDir
  process.env.UNI_APP_X_TSC_DIR =
    options.tscDir ||
    process.env.UNI_APP_X_TSC_DIR ||
    path.resolve(normalizedOutputDir, '../.tsc')
  process.env.UNI_APP_X_UVUE_DIR =
    options.uvueDir ||
    process.env.UNI_APP_X_UVUE_DIR ||
    path.resolve(normalizedOutputDir, '../.uvue')
  process.env.UNI_APP_X_TSC_CACHE_DIR =
    options.tscCacheDir ||
    process.env.UNI_APP_X_TSC_CACHE_DIR ||
    path.resolve(cacheDir, 'tsc')
  process.env.HX_DEPENDENCIES_DIR =
    process.env.HX_DEPENDENCIES_DIR ||
    path.resolve(
      normalizedOutputDir,
      '../hx/' + path.basename(normalizedOutputDir)
    )

  if (options.hbuilderxPlugins) {
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve(options.hbuilderxPlugins)
  } else if (!process.env.UNI_HBUILDERX_PLUGINS) {
    process.env.UNI_HBUILDERX_PLUGINS = resolveHBuilderXPlugins()
  }
}

function createTempUniModule(
  file: string,
  outputDir: string,
  inputDir: string
): TempUniModule {
  const id = createTempPluginId(file)
  const pluginDir = path.resolve(outputDir, 'uni_modules', id)
  const utsDir = path.resolve(pluginDir, 'utssdk')

  fs.emptyDirSync(pluginDir)
  fs.outputJsonSync(
    path.resolve(pluginDir, 'package.json'),
    {
      id,
      displayName: id,
      version: '1.0.0',
      uni_modules: {},
    },
    { spaces: 2 }
  )
  fs.ensureDirSync(utsDir)
  // 单文件模式需要保留项目内 UTS 文件之间的相对路径，避免同名文件或相对 import 失效。
  copyStandaloneSourceDir(inputDir, utsDir)
  if (isSamePath(inputDir, outputDir)) {
    // 未显式传入 UNI_INPUT_DIR 时，历史默认值是 outputDir，这里兼容旧的“入口同级目录”复制行为。
    copyStandaloneSourceDir(path.dirname(file), utsDir)
  }
  const entryFile = resolveStandaloneEntryFile(
    file,
    inputDir,
    outputDir,
    utsDir
  )
  fs.outputFileSync(
    path.resolve(utsDir, 'index.uts'),
    createStandaloneIndexSource(entryFile)
  )
  return { id, pluginDir, entryFile }
}

function relocateStandaloneOutput(
  resolved: ResolvedOptions,
  tempUniModule?: TempUniModule
) {
  if (!tempUniModule) {
    // --file 命中 uni_modules 时走真实插件编译，不能改动单个 uni_module 的原有产物结构。
    return
  }

  const platforms = resolveStandaloneOutputPlatforms(resolved.platform)
  if (!platforms.length) {
    return
  }

  const targetDir = path.resolve(resolved.outputDir, 'index')
  let copied = false
  for (const platform of platforms) {
    const sourceDir = resolveStandaloneGeneratedPlatformDir(
      resolved,
      tempUniModule,
      platform
    )
    if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
      continue
    }
    if (!copied) {
      fs.emptyDirSync(targetDir)
    }
    fs.copySync(sourceDir, targetDir, { overwrite: true })
    copied = true
  }

  if (copied) {
    // 复制成功后清理由绝对路径相对化导致的 output/unpackage 嵌套目录。
    removeStandaloneNestedUnpackageDir(resolved.outputDir)
  }
}

function resolveStandaloneOutputPlatforms(platform: BuildPlatform) {
  if (platform === 'app-android') {
    return ['app-android'] as const
  }
  if (platform === 'app-ios') {
    return ['app-ios'] as const
  }
  if (platform === 'app') {
    return ['app-android', 'app-ios'] as const
  }
  // standalone 单文件暂不整理鸿蒙产物，避免影响现有鸿蒙编译链路。
  return []
}

function resolveStandaloneGeneratedPlatformDir(
  resolved: ResolvedOptions,
  tempUniModule: TempUniModule,
  platform: 'app-android' | 'app-ios'
) {
  // 与 src/index.ts 的 pluginRelativeDir/outputPluginDir 计算保持一致，避免重复造轮子。
  const pluginRelativeDir = path.relative(
    resolved.inputDir,
    tempUniModule.pluginDir
  )
  return path.join(resolved.outputDir, pluginRelativeDir, 'utssdk', platform)
}

function removeStandaloneNestedUnpackageDir(outputDir: string) {
  const nestedUnpackageDir = path.resolve(outputDir, 'unpackage')
  if (
    fs.existsSync(nestedUnpackageDir) &&
    fs.statSync(nestedUnpackageDir).isDirectory() &&
    isSubPath(outputDir, nestedUnpackageDir)
  ) {
    fs.removeSync(nestedUnpackageDir)
  }
}

const STANDALONE_SOURCE_EXT = '.uts'

const STANDALONE_IGNORE_DIRS = new Set([
  'node_modules',
  'dist',
  'unpackage',
  'uni_modules',
])

function copyStandaloneSourceDir(sourceDir: string, utsDir: string) {
  if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    return
  }
  copyStandaloneSourceFiles(sourceDir, utsDir, sourceDir)
}

function copyStandaloneSourceFiles(
  sourceDir: string,
  utsDir: string,
  currentDir: string
) {
  for (const name of fs.readdirSync(currentDir)) {
    const src = path.resolve(currentDir, name)
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      if (name.startsWith('.') || STANDALONE_IGNORE_DIRS.has(name)) {
        continue
      }
      copyStandaloneSourceFiles(sourceDir, utsDir, src)
      continue
    }
    // 只复制 UNI_INPUT_DIR 下的 UTS 文件；其它资源交给既有编译链路处理，避免放大单文件编译成本。
    if (stat.isFile() && path.extname(src) === STANDALONE_SOURCE_EXT) {
      fs.copySync(src, path.resolve(utsDir, path.relative(sourceDir, src)))
    }
  }
}

function resolveStandaloneEntryFile(
  file: string,
  inputDir: string,
  outputDir: string,
  utsDir: string
) {
  let entryFile =
    isSubPathOrSame(inputDir, file) && !isSamePath(inputDir, outputDir)
      ? path.relative(inputDir, file)
      : path.basename(file)

  if (!fs.existsSync(path.resolve(utsDir, entryFile))) {
    // 兼容显式传入的 UNI_INPUT_DIR 不包含入口文件的场景。
    copyStandaloneSourceDir(path.dirname(file), utsDir)
    entryFile = path.basename(file)
  }

  if (normalizePath(entryFile) === 'index.uts') {
    const aliasedEntryFile = 'index.entry.uts'
    fs.copyFileSync(file, path.resolve(utsDir, aliasedEntryFile))
    return aliasedEntryFile
  }
  return entryFile
}

function createStandaloneIndexSource(entryFile: string) {
  const importPath = './' + normalizePath(entryFile)
  return `import ${JSON.stringify(importPath)}\n`
}

function resolveFileUniModule(file: string, inputDir: string) {
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  const relative = path.relative(uniModulesDir, file)
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    return
  }

  const parts = normalizePath(relative).split('/')
  const pluginDir = path.resolve(uniModulesDir, parts[0])
  if (
    parts.length > 1 &&
    fs.existsSync(pluginDir) &&
    fs.statSync(pluginDir).isDirectory()
  ) {
    // --file 指向 UNI_INPUT_DIR/uni_modules/模块名 下的文件时，直接复用单插件编译流程。
    return pluginDir
  }
}

function createTempPathRewriter(
  pluginId: string,
  sourceFile: string,
  projectRoot: string,
  inputDir: string,
  entryFile = 'index.uts'
) {
  const displayFile = createDisplayFileResolver(projectRoot)
  const displayEntryFile = displayFile(sourceFile)
  const normalizedEntryFile = normalizePath(entryFile)
  const sourceRoot =
    normalizedEntryFile === path.basename(normalizedEntryFile)
      ? path.dirname(sourceFile)
      : inputDir
  const pattern = new RegExp(
    `(?:[A-Za-z]:[\\\\/][^\\n\\r]*?[\\\\/]|[^\\s\\n\\r]*?[\\\\/])?uni_modules[\\\\/]${escapeRegExp(
      pluginId
    )}[\\\\/]utssdk(?:[\\\\/](?:app-android|app-ios|app-harmony))?[\\\\/]([^\\s\\n\\r]*?\\.uts)(?:\\.ts)?`,
    'g'
  )
  return (message: string) => {
    return message.replace(pattern, (_match, tempFile: string) => {
      const normalizedTempFile = normalizePath(tempFile)
      if (
        normalizedTempFile === 'index.uts' ||
        normalizedTempFile === normalizedEntryFile
      ) {
        return displayEntryFile
      }
      // 单文件编译会把依赖 UTS 复制到临时插件，报错时按复制前的相对路径还原文件名。
      return displayFile(path.resolve(sourceRoot, normalizedTempFile))
    })
  }
}

function createDisplayFileResolver(projectRoot: string) {
  return (file: string) => {
    return normalizePath(
      path.isAbsolute(file) && isSubPath(projectRoot, file)
        ? path.relative(projectRoot, file)
        : file
    )
  }
}

function installConsolePathRewriter(rewrite: (message: string) => string) {
  const methods = ['log', 'info', 'warn', 'error'] as const
  const originals = methods.map((method) => [method, console[method]] as const)
  methods.forEach((method) => {
    console[method] = ((...args: unknown[]) => {
      return originals
        .find(([name]) => name === method)![1]
        .apply(
          console,
          args.map((arg) => (typeof arg === 'string' ? rewrite(arg) : arg))
        )
    }) as (typeof console)[typeof method]
  })
  return () => {
    originals.forEach(([method, original]) => {
      console[method] = original
    })
  }
}

function isSubPath(parent: string, child: string) {
  const relative = path.relative(parent, child)
  return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative)
}

function isSubPathOrSame(parent: string, child: string) {
  const relative = path.relative(parent, child)
  return !relative || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

function isSamePath(left: string, right: string) {
  return path.resolve(left) === path.resolve(right)
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function createTempPluginId(file: string) {
  const name = path
    .basename(file, path.extname(file))
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
  const hash = crypto.createHash('sha1').update(file).digest('hex').slice(0, 8)
  return `standalone-uts-${name || 'file'}-${hash}`
}

function createUniXPreprocessor(
  utsPlatform: 'app-android' | 'app-ios' | 'app-harmony'
): SyncUniModulesFilePreprocessor {
  let preprocessor: SyncUniModulesFilePreprocessor | undefined
  return async (content, fileName) => {
    if (!preprocessor) {
      const shared = loadUniModulesShared()
      if (utsPlatform === 'app-android') {
        preprocessor =
          shared.createAppAndroidUniModulesSyncFilePreprocessorOnce(true)
      } else if (utsPlatform === 'app-ios') {
        preprocessor =
          shared.createAppIosUniModulesSyncFilePreprocessorOnce(true)
      } else {
        preprocessor =
          shared.createAppHarmonyUniModulesSyncFilePreprocessorOnce(true)
      }
    }
    return preprocessor(content, fileName)
  }
}

function createUniModulesConsoleExprRewriter() {
  return (fileName: string, content: string) => {
    const rewrite = loadUniModulesShared().rewriteUniModulesConsoleExpr
    return rewrite ? rewrite(fileName, content) : content
  }
}

function loadUniModulesShared(): UniModulesShared {
  return require(resolveHBuilderXPluginModule(
    'uniapp-cli-vite/node_modules/@dcloudio/uni-cli-shared/dist/vite/plugins/uts/uni_modules.js'
  )) as UniModulesShared
}

function resolveHBuilderXPluginModule(moduleName: string) {
  return path.join(process.env.UNI_HBUILDERX_PLUGINS, moduleName)
}

function normalizePlatform(platform?: string): BuildPlatform {
  if (!platform || platform === 'android') {
    return 'app-android'
  }
  if (platform === 'ios') {
    return 'app-ios'
  }
  if (platform === 'app-plus') {
    return 'app'
  }
  if (
    platform === 'app' ||
    platform === 'app-android' ||
    platform === 'app-ios' ||
    platform === 'app-harmony'
  ) {
    return platform
  }
  throw new Error(`Unsupported --platform: ${platform}`)
}

function resolvePlatformOption(platform?: string) {
  // CLI 明确传入 --platform app 时，优先使用外部环境注入的真实 app 平台。
  if (platform === 'app' && process.env.UNI_APP_PLATFORM) {
    return process.env.UNI_APP_PLATFORM
  }
  return platform || process.env.UNI_UTS_PLATFORM
}

function resolveTargetLanguage(platform: BuildPlatform) {
  if (platform === 'app-android' || platform === 'app') {
    return 'kotlin'
  }
  if (platform === 'app-ios') {
    return 'swift'
  }
  return 'arkts'
}

function getPlatformOutputDir(platform: BuildPlatform) {
  if (platform === 'app-harmony') {
    return 'app-harmony'
  }
  return 'app'
}

function resolveUniModuleProjectRoot(pluginDir: string) {
  const parts = normalizePath(pluginDir).split('/')
  const index = parts.lastIndexOf('uni_modules')
  return index > 0 ? parts.slice(0, index).join('/') : path.dirname(pluginDir)
}

function findProjectRoot(startDir: string) {
  let dir = path.resolve(startDir)
  while (true) {
    if (
      fs.existsSync(path.resolve(dir, 'pages.json')) ||
      fs.existsSync(path.resolve(dir, 'manifest.json')) ||
      fs.existsSync(path.resolve(dir, 'uni_modules'))
    ) {
      return dir
    }
    const parent = path.dirname(dir)
    if (parent === dir) {
      return process.cwd()
    }
    dir = parent
  }
}

function resolveHBuilderXPlugins() {
  if (process.env.HX_APP_ROOT) {
    return path.resolve(process.env.HX_APP_ROOT, 'plugins')
  }
  try {
    // eslint-disable-next-line no-restricted-globals
    const about = require(path.resolve(process.cwd(), '../about/package.json'))
    if (about.name === 'about') {
      return path.resolve(process.cwd(), '..')
    }
  } catch (e) {}
  return path.resolve(process.cwd(), '..')
}

function normalizePath(fileName: string) {
  return fileName.replace(/\\/g, '/')
}

function parseArgs(argv: string[]): StandaloneUTSOptions {
  const options: Record<string, string | boolean> = {}
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    const rawKey = resolveArgKey(arg)
    if (!rawKey) {
      continue
    }

    const key = rawKey.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase()
    )

    const next = argv[i + 1]
    if (!next || isStandaloneArg(next)) {
      options[key] = true
    } else {
      options[key] = next
      i++
    }
  }
  return options as StandaloneUTSOptions
}

const STANDALONE_ARG_ALIASES: Record<string, string> = {
  // 兼容 standalone CLI 简写：--p 等同 --platform，-f 等同 --file。
  p: 'platform',
  f: 'file',
}

function resolveArgKey(arg: string) {
  if (arg.startsWith('--')) {
    const key = arg.slice(2)
    return STANDALONE_ARG_ALIASES[key] || key
  }
  if (arg.startsWith('-')) {
    return STANDALONE_ARG_ALIASES[arg.slice(1)]
  }
}

function isStandaloneArg(arg: string) {
  return !!resolveArgKey(arg)
}

export async function run() {
  process.env.UTS_CLI_ENV = process.env.UTS_CLI_ENV || 'true'
  await buildStandaloneUTS(parseArgs(process.argv))
}

if (require.main === module) {
  run()
    .then(() => {
      process.exit(0)
    })
    .catch(async (error) => {
      if (error?.customPrint) {
        error.customPrint()
      } else {
        console.error(error?.message || error)
      }
      await new Promise((resolve) => setTimeout(resolve, 50))
      console.error(`Build failed with errors.`)
      process.exit(1)
    })
}
