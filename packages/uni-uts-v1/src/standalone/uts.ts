import crypto from 'crypto'
import path from 'path'
import fs from 'fs-extra'
import { dataToEsm } from '@rollup/pluginutils'
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

interface UniCliShared {
  initPreContext: (
    platform: string,
    userPreContext?: Record<string, boolean> | string,
    utsPlatform?: string,
    isX?: boolean
  ) => void
  preUVueHtml: (code: string, fileName: string) => string
  preUVueJs: (code: string, fileName: string) => string
}

export async function buildStandaloneUTS(options: StandaloneUTSOptions) {
  const resolved = resolveOptions(options)
  initStandaloneEnv(resolved, options)

  const tempUniModule = resolved.file
    ? createTempUniModule(resolved.file, resolved.outputDir)
    : undefined
  const pluginDir = tempUniModule
    ? tempUniModule.pluginDir
    : resolved.uniModule!

  const buildUniModule = loadBuildUniModule()
  const rewriteTempPath =
    resolved.file && tempUniModule
      ? createTempPathRewriter(
          tempUniModule.id,
          resolved.file,
          resolved.projectRoot
        )
      : undefined
  const restoreConsole = rewriteTempPath
    ? installConsolePathRewriter(rewriteTempPath)
    : undefined
  try {
    return await buildUniModule(
      resolved.platform,
      pluginDir,
      {
        syncUniModulesFilePreprocessors: {
          android: createUniXPreprocessor('app', 'app-android'),
          ios: createUniXPreprocessor('app', 'app-ios'),
          harmony: createUniXPreprocessor('app-harmony', 'app-harmony'),
        },
      },
      {
        isX: true,
        isPlugin: true,
        isSingleThread: process.env.UNI_APP_X_SINGLE_THREAD !== 'false',
        sourceMap: process.env.UNI_APP_SOURCEMAP === 'true',
        rewriteConsoleExpr: (_fileName, content) => content,
      }
    )
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
    restoreConsole?.()
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

  const platform = normalizePlatform(
    options.platform || process.env.UNI_UTS_PLATFORM
  )
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

function createTempUniModule(file: string, outputDir: string) {
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
  fs.copyFileSync(file, path.resolve(utsDir, 'index.uts'))
  return { id, pluginDir }
}

function createTempPathRewriter(
  pluginId: string,
  sourceFile: string,
  projectRoot: string
) {
  const displayFile = normalizePath(
    path.isAbsolute(sourceFile) && isSubPath(projectRoot, sourceFile)
      ? path.relative(projectRoot, sourceFile)
      : sourceFile
  )
  const pattern = new RegExp(
    `(?:[A-Za-z]:[\\\\/][^\\n\\r]*?[\\\\/]|[^\\s\\n\\r]*?[\\\\/])?uni_modules[\\\\/]${escapeRegExp(
      pluginId
    )}[\\\\/]utssdk(?:[\\\\/](?:app-android|app-ios|app-harmony))?[\\\\/]index\\.uts(?:\\.ts)?`,
    'g'
  )
  return (message: string) => {
    return message.replace(pattern, displayFile)
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
  platform: 'app' | 'app-harmony',
  utsPlatform: 'app-android' | 'app-ios' | 'app-harmony'
): SyncUniModulesFilePreprocessor {
  return async (content, fileName) => {
    const cliShared = loadUniCliShared()
    cliShared.initPreContext(
      platform,
      process.env.UNI_CUSTOM_CONTEXT,
      utsPlatform,
      true
    )

    const extname = path.extname(fileName)
    if (extname === '.json') {
      return dataToEsm(JSON.parse(cliShared.preUVueJs(content, fileName)), {
        namedExports: true,
        preferConst: true,
      })
    }
    if (extname === '.uts' || extname === '.ts') {
      return cliShared.preUVueJs(content, fileName)
    }
    if (extname === '.uvue' || extname === '.vue') {
      return cliShared.preUVueJs(
        preUTSSDKVueFile(fileName, cliShared.preUVueHtml(content, fileName)),
        fileName
      )
    }
    return content
  }
}

function loadUniCliShared(): UniCliShared {
  return require(path.join(
    process.env.UNI_HBUILDERX_PLUGINS,
    'uniapp-cli-vite',
    'node_modules',
    '@dcloudio',
    'uni-cli-shared'
  )) as UniCliShared
}

function preUTSSDKVueFile(fileName: string, content: string) {
  if (
    fileName.includes('utssdk') &&
    (fileName.includes('app-android') || fileName.includes('app-ios'))
  ) {
    // eslint-disable-next-line no-restricted-globals
    const { parse } =
      require('@vue/compiler-sfc') as typeof import('@vue/compiler-sfc')
    const { descriptor } = parse(content, {
      sourceMap: false,
      pad: 'line',
    })
    if (descriptor.script?.content) {
      return descriptor.script.content + `/*${descriptor.template?.content}*/`
    }
  }
  return content
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
    if (!arg.startsWith('--')) {
      continue
    }
    const rawKey = arg.slice(2)
    const key = rawKey.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase()
    )
    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      options[key] = true
    } else {
      options[key] = next
      i++
    }
  }
  return options as StandaloneUTSOptions
}

export async function run() {
  await buildStandaloneUTS(parseArgs(process.argv))
}

if (require.main === module) {
  run()
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      if (error?.customPrint) {
        error.customPrint()
      } else {
        console.error(error?.message || error)
      }
      console.error(`Build failed with errors.`)
      process.exit(1)
    })
}
