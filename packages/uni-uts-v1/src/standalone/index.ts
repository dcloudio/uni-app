import path from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { normalizePath } from '../shared'
import { getKotlinCompilerServer, getSwiftCompilerServer } from '../utils'
import type { CompileResult, UTSPluginCompilerOptions } from '../index'
import { compile } from '../index'
import {
  installStandaloneSourceMapReadPatch,
  rewriteStandaloneSourceMapSources,
} from './sourceMap'

export interface BuildUTSFileOptions {
  // 兼容旧调用方保留，standalone 目录改为完全读取外部环境变量。
  workDir?: string
  sourceRoot?: string
  clean?: boolean
  // standalone 常用于一次性脚本，默认关闭编译服务，避免 node 进程常驻。
  autoClose?: boolean
}

type BuildUTSFilePlatform = 'app-android' | 'app-ios' | 'app-harmony'

const SINGLE_UTS_PLUGIN_ID = '__single_uts_file__'
const SOURCE_DIR = '__src__'
const COPY_PATTERNS = ['**/*.uts', '**/*.ts', '**/*.json']
const REQUIRED_EXTERNAL_ENVS = [
  'UNI_INPUT_DIR',
  'UNI_OUTPUT_DIR',
  'UNI_UTS_PLATFORM',
] as const

/**
 * 编译单个 uts 文件。
 *
 * 这里不新增编译链路，只把孤立文件同步到临时标准 utssdk 插件结构，
 * 后续继续复用现有 compile -> runDev/runProd 流程。
 */
export async function buildUTSFile(
  platform: BuildUTSFilePlatform,
  fileName: string,
  options: BuildUTSFileOptions,
  compilerOptions: UTSPluginCompilerOptions
): Promise<CompileResult | void> {
  const sourceFile = path.resolve(fileName)
  if (path.extname(sourceFile) !== '.uts') {
    throw new Error(`buildUTSFile 仅支持 .uts 文件：${fileName}`)
  }
  if (!fs.existsSync(sourceFile) || !fs.statSync(sourceFile).isFile()) {
    throw new Error(`buildUTSFile 找不到 uts 文件：${fileName}`)
  }

  const sourceRoot = path.resolve(
    options.sourceRoot || path.dirname(sourceFile)
  )
  if (!fs.existsSync(sourceRoot) || !fs.statSync(sourceRoot).isDirectory()) {
    throw new Error(`buildUTSFile 的 sourceRoot 必须是目录：${sourceRoot}`)
  }
  if (!isSubFile(sourceRoot, sourceFile)) {
    throw new Error(
      `buildUTSFile 的 fileName 必须位于 sourceRoot 内：${fileName}`
    )
  }
  const inputDir = path.resolve(readExternalEnv('UNI_INPUT_DIR'))
  const outputDir = path.resolve(readExternalEnv('UNI_OUTPUT_DIR'))
  const utsPlatform = readExternalEnv('UNI_UTS_PLATFORM')
  if (utsPlatform !== platform) {
    throw new Error(
      `buildUTSFile 的 UNI_UTS_PLATFORM 必须与 platform 一致：${utsPlatform} !== ${platform}`
    )
  }
  const cacheDir = process.env.HX_DEPENDENCIES_DIR
    ? path.resolve(process.env.HX_DEPENDENCIES_DIR)
    : ''
  const pluginDir = path.resolve(outputDir, 'utssdk', SINGLE_UTS_PLUGIN_ID)
  const platformDir = path.resolve(pluginDir, platform)
  const sourceDir = path.resolve(platformDir, SOURCE_DIR)
  const compilerHandles = options.autoClose === false ? [] : getActiveHandles()

  // 默认清理当前 standalone 的 input，避免删除过的依赖在临时目录中残留。
  if (options.clean !== false) {
    fs.emptyDirSync(pluginDir)
  }
  fs.ensureDirSync(sourceDir)
  fs.ensureDirSync(outputDir)
  if (cacheDir) {
    fs.ensureDirSync(cacheDir)
  }

  syncSourceFiles(sourceRoot, sourceDir)
  genStandaloneIndex(sourceRoot, sourceFile, platformDir)

  const sourceMapContext = {
    sourceRoot,
    tempSourceDir: sourceDir,
    inputDir,
  }
  let restoreSourceMapReadPatch = () => {}
  try {
    restoreSourceMapReadPatch =
      installStandaloneSourceMapReadPatch(sourceMapContext)
    return await compile(pluginDir, compilerOptions)
  } finally {
    // kotlin/swift 编译日志存在异步输出，先让日志落到控制台再结束 standalone。
    await waitForPendingLogs()
    restoreSourceMapReadPatch()
    rewriteStandaloneSourceMapSources(
      resolveGeneratedSourceMapFile(platform, outputDir),
      sourceMapContext
    )
    try {
      if (options.autoClose !== false) {
        await closeCompilerServer(platform, compilerHandles)
      }
    } catch (e) {
      console.warn(
        `buildUTSFile 关闭编译服务失败：${
          e instanceof Error ? e.message : String(e)
        }`
      )
    }
  }
}

function resolveUniPlatform(platform: BuildUTSFilePlatform) {
  return platform === 'app-harmony' ? 'app-harmony' : 'app'
}

function resolveGeneratedSourceMapFile(
  platform: BuildUTSFilePlatform,
  outputDir: string
) {
  const extname =
    platform === 'app-android'
      ? '.kt'
      : platform === 'app-ios'
      ? '.swift'
      : '.ets'
  return path.resolve(
    outputDir,
    '../.sourcemap',
    resolveUniPlatform(platform),
    'utssdk',
    SINGLE_UTS_PLUGIN_ID,
    platform,
    'index' + extname + '.map'
  )
}

function waitForPendingLogs() {
  return new Promise<void>((resolve) => setTimeout(resolve))
}

async function closeCompilerServer(
  platform: BuildUTSFilePlatform,
  oldHandles: unknown[]
) {
  if (!process.env.UNI_HBUILDERX_PLUGINS) {
    return
  }
  const server =
    platform === 'app-android'
      ? getKotlinCompilerServer()
      : platform === 'app-ios'
      ? getSwiftCompilerServer()
      : undefined
  const closeServer = server as unknown as {
    deactivate?: () => void | Promise<void>
  }
  if (closeServer?.deactivate) {
    await closeServer.deactivate()
  }
  // Android 编译服务会拉起常驻 java 进程；standalone 默认是一次性编译，需要主动释放。
  closeNewCompilerProcesses(platform, oldHandles)
}

function getActiveHandles() {
  return (
    (
      process as unknown as { _getActiveHandles?: () => unknown[] }
    )._getActiveHandles?.() || []
  )
}

function closeNewCompilerProcesses(
  platform: BuildUTSFilePlatform,
  oldHandles: unknown[]
) {
  if (platform !== 'app-android') {
    return
  }
  const oldHandleSet = new Set(oldHandles)
  for (const handle of getActiveHandles()) {
    if (oldHandleSet.has(handle) || !isAndroidCompilerProcess(handle)) {
      continue
    }
    closeChildProcess(handle)
  }
}

function isAndroidCompilerProcess(handle: unknown) {
  const child = handle as {
    spawnfile?: string
    spawnargs?: string[]
  }
  const spawnfile = (child.spawnfile || '').toLowerCase()
  if (!spawnfile.endsWith('java.exe') && !spawnfile.endsWith('java')) {
    return false
  }
  const args = normalizePath((child.spawnargs || []).join(' ')).toLowerCase()
  const runextensionDir = normalizePath(
    path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uniapp-runextension')
  ).toLowerCase()
  return args.includes(runextensionDir)
}

function closeChildProcess(handle: unknown) {
  const child = handle as {
    kill?: (signal?: NodeJS.Signals | number) => boolean
    unref?: () => void
    stdio?: Array<{ destroy?: () => void; unref?: () => void } | null>
  }
  child.stdio?.forEach((stdio) => {
    stdio?.unref?.()
    stdio?.destroy?.()
  })
  child.kill?.()
  child.unref?.()
}

function readExternalEnv(key: (typeof REQUIRED_EXTERNAL_ENVS)[number]) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`buildUTSFile 必须由外部环境变量传入 ${key}`)
  }
  return value
}

function isSubFile(root: string, fileName: string) {
  const relativeFile = path.relative(root, fileName)
  return (
    !!relativeFile &&
    !relativeFile.startsWith('..') &&
    !path.isAbsolute(relativeFile)
  )
}

function syncSourceFiles(sourceRoot: string, sourceDir: string) {
  const files = fg.sync(COPY_PATTERNS, {
    cwd: sourceRoot,
    absolute: false,
    dot: true,
    onlyFiles: true,
    ignore: ['**/node_modules/**', '**/.git/**'],
  })
  for (const file of files) {
    copyFileIfChanged(
      path.resolve(sourceRoot, file),
      path.resolve(sourceDir, file)
    )
  }
}

function copyFileIfChanged(src: string, dest: string) {
  const srcStat = fs.statSync(src)
  if (fs.existsSync(dest)) {
    const destStat = fs.statSync(dest)
    if (destStat.size === srcStat.size && destStat.mtimeMs >= srcStat.mtimeMs) {
      return
    }
  }
  fs.ensureDirSync(path.dirname(dest))
  fs.copyFileSync(src, dest)
  // 保留 mtime，下一次 clean:false 时可快速跳过未变化文件。
  fs.utimesSync(dest, srcStat.atime, srcStat.mtime)
}

function genStandaloneIndex(
  sourceRoot: string,
  sourceFile: string,
  platformDir: string
) {
  const sourceRelativeFile = path.relative(sourceRoot, sourceFile)
  const importFile = path.resolve(
    platformDir,
    SOURCE_DIR,
    sourceRelativeFile.slice(0, -path.extname(sourceRelativeFile).length)
  )
  const importPath =
    './' + normalizePath(path.relative(platformDir, importFile))
  fs.outputFileSync(
    path.resolve(platformDir, 'index.uts'),
    `import ${JSON.stringify(importPath)}\nexport * from ${JSON.stringify(
      importPath
    )}\n`
  )
}
