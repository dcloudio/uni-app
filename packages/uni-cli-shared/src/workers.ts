import type { Plugin, ViteDevServer } from 'vite'
import type {
  SyncUniModulesFilePreprocessor,
  UniXCompiler,
} from '@dcloudio/uni-uts-v1'
import path from 'path'
import fs from 'fs-extra'
import debug from 'debug'
import { sync } from 'fast-glob'
import { normalizePath } from './utils'
import { parseManifestJsonOnce } from './json'
import { resolveUTSCompiler, tscOutDir } from './uts'
import {
  createAppAndroidUniModulesSyncFilePreprocessorOnce,
  createAppHarmonyUniModulesSyncFilePreprocessorOnce,
  createAppIosUniModulesSyncFilePreprocessorOnce,
} from './vite/plugins/uts/uni_modules'
import { resolveBuiltIn } from './resolve'

const debugWorkers = debug('uni:workers')

let workersRootDir: string | null = null
let workersRootDirs: string[] = []
let workers: Record<string, string> = {}
export function getWorkers() {
  return workers
}

export function resolveWorkersRootDir() {
  // 默认是 workers
  return workersRootDir || 'workers'
}

export function getWorkersRootDirs() {
  return workersRootDirs
}

/**
 * 遍历目录下的所有uts文件，读取文件内容，正则匹配出定义的worker，返回文件名和类名的映射关系
 * export class MyWorkerTask extends WorkerTaskImpl {}
 * @param dir
 */
export function initWorkers(workersDirs: string[], rootDir: string) {
  workers = {}
  for (const workersDir of workersDirs) {
    const dir = path.join(rootDir, workersDir)
    if (!fs.existsSync(dir)) {
      continue
    }
    sync('**/*.uts', { cwd: dir }).forEach((file) => {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8')
      const match = content.match(/class\s+(.*)\s+extends\s+WorkerTaskImpl/)
      if (match && match[1]) {
        const key = normalizePath(path.join(workersDir, file))
        workers[key] = match[1]
      }
    })
  }
  debugWorkers('workers', workers)
  return workers
}

export function uniWorkersPlugin(): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const platform = process.env.UNI_UTS_PLATFORM
  const resolveWorkers = () => getWorkers()
  function refreshWorkers() {
    workersRootDirs = resolveWorkersDir(inputDir)
    initWorkers(workersRootDirs, inputDir)
    return Object.keys(getWorkers()).length > 0
  }
  refreshWorkers()
  const preprocessor =
    platform === 'app-android'
      ? createAppAndroidUniModulesSyncFilePreprocessorOnce(false)
      : platform === 'app-ios'
      ? createAppIosUniModulesSyncFilePreprocessorOnce(false)
      : platform === 'app-harmony'
      ? createAppHarmonyUniModulesSyncFilePreprocessorOnce(false)
      : null
  const cache: Record<string, number> = {}

  const uniXKotlinCompiler =
    platform === 'app-android'
      ? resolveUTSCompiler().createUniXKotlinCompilerOnce({
          resolveWorkers,
        })
      : null

  const uniXSwiftCompiler =
    platform === 'app-ios'
      ? resolveUTSCompiler().createUniXSwiftCompilerOnce({
          resolveWorkers,
        })
      : null

  const uniXArkTSCompiler =
    platform === 'app-harmony'
      ? resolveUTSCompiler().createUniXArkTSCompilerOnce({
          resolveWorkers,
        })
      : null

  return {
    name: 'uni-workers',
    enforce: 'pre',
    async buildStart() {
      if (refreshWorkers()) {
        if (preprocessor) {
          await syncWorkersFiles(platform, inputDir, preprocessor, cache)
        }
      }
      // 需要等待 workers 文件同步完之后，添加到 rootFiles 中，触发 tsc 的编译
      if (uniXKotlinCompiler) {
        await initUniXCompilerRootWorkers(
          tscOutDir('app-android'),
          uniXKotlinCompiler
        )
      }
      if (uniXSwiftCompiler) {
        await initUniXCompilerRootWorkers(
          tscOutDir('app-ios'),
          uniXSwiftCompiler
        )
      }
      if (uniXArkTSCompiler) {
        await initUniXCompilerRootWorkers(
          tscOutDir('app-harmony'),
          uniXArkTSCompiler
        )
      }
    },
  }
}

async function syncWorkersFiles(
  platform: typeof process.env.UNI_UTS_PLATFORM,
  inputDir: string,
  preprocessor: SyncUniModulesFilePreprocessor,
  cache?: Record<string, number>
) {
  if (
    platform !== 'app-harmony' &&
    platform !== 'app-android' &&
    platform !== 'app-ios'
  ) {
    return
  }
  const workersDirs = resolveWorkersDir(inputDir)
  if (workersDirs.length) {
    const { syncUTSFiles } = resolveUTSCompiler()
    for (const workersDir of workersDirs) {
      await syncUTSFiles(
        normalizePath(path.join(workersDir, '**/*.uts')),
        inputDir,
        tscOutDir(platform as 'app-android' | 'app-ios' | 'app-harmony'),
        true,
        preprocessor,
        cache
      )
    }
  }
}

export function resolveWorkersDir(inputDir: string): Array<string> {
  const workersDirs: string[] = []
  const manifestJson = parseManifestJsonOnce(inputDir)
  if (manifestJson.workers) {
    let workersDir: string | undefined =
      typeof manifestJson.workers === 'string'
        ? manifestJson.workers
        : manifestJson.workers.path
    if (workersDir) {
      workersDir = normalizePath(workersDir)
      const dir = path.join(inputDir, workersDir)
      if (fs.existsSync(dir)) {
        workersRootDir = workersDir
        workersDirs.push(workersDir)
      }
    }
  }
  // 遍历uni_modules插件目录是否有workers目录
  const uniModulesDir = path.join(inputDir, 'uni_modules')
  if (fs.existsSync(uniModulesDir)) {
    fs.readdirSync(uniModulesDir).forEach((dir) => {
      if (fs.existsSync(path.join(uniModulesDir, dir, 'workers'))) {
        workersDirs.push('uni_modules/' + dir + '/workers')
      }
    })
  }
  debugWorkers('workersDirs', workersDirs)
  return workersDirs
}

export function uniJavaScriptWorkersPlugin(): Plugin {
  // 仅小程序平台外置uni-worker.mp.js
  const external = (process.env.UNI_UTS_PLATFORM || '').startsWith('mp-')
  let workerPolyfillCode = ''
  let isWrite = false
  const UniAppWorkerJSName = external ? 'uni-worker.mp.js' : 'uni-worker.web.js'
  let viteServer: ViteDevServer | null = null
  const workersRootPaths: string[] = []
  const workerPolyfillPath = `@dcloudio/uni-app/dist-x/${UniAppWorkerJSName}`
  const workerPolyfillAbsPath = normalizePath(
    resolveBuiltIn(workerPolyfillPath)
  )
  function isWorkerFile(id: string) {
    if (workersRootPaths.length) {
      return workersRootPaths.some((dir) => id.startsWith(dir))
    }
    return false
  }
  function parseWorkerEntryFile(workerJsPath: string) {
    const workerPath = workerJsPath.slice(1).replace('.js', '.uts')
    if (workerPath in workers) {
      return normalizePath(path.resolve(process.env.UNI_INPUT_DIR, workerPath))
    }
  }
  function parseWorkerClass(id: string) {
    const filename = id.split('?')[0]
    if (isWorkerFile(filename)) {
      const workerPath = normalizePath(
        path.relative(process.env.UNI_INPUT_DIR, filename)
      )
      return workers[workerPath] || ''
    }
    return false
  }
  return {
    name: 'uni:javascript-workers',
    configureServer(server) {
      viteServer = server
    },
    buildStart() {
      if (!workerPolyfillCode && Object.keys(getWorkers()).length) {
        workerPolyfillCode = fs.readFileSync(workerPolyfillAbsPath, 'utf-8')
      }
      workersRootPaths.length = 0
      for (const workersRootDir of getWorkersRootDirs()) {
        workersRootPaths.push(
          normalizePath(
            path.resolve(process.env.UNI_INPUT_DIR!, workersRootDir)
          )
        )
      }
    },
    resolveId(id) {
      // uni.createWorker('workers/request/index.uts')
      // 编译阶段调整为 uni.createWorker('workers/request/index.js')，确保开发和运行时都是用.js后缀加载
      // 不调整成js后缀或.uts?import这些格式， vite 是不会走transform逻辑的，而是直接读取文件内容
      if (viteServer) {
        const workerEntryFile = parseWorkerEntryFile(id)
        if (workerEntryFile) {
          return workerEntryFile
        }
        if (id === workerPolyfillPath) {
          return workerPolyfillAbsPath
        }
      }
    },
    load(id) {
      const filename = id.split('?')[0]
      const workerClass = parseWorkerClass(filename)
      if (workerClass === false) {
        return
      }
      if (fs.existsSync(filename)) {
        let code =
          (viteServer ? `import '${workerPolyfillPath}';` : '') +
          fs
            .readFileSync(filename, 'utf-8')
            // 移除 export
            .replace(
              /export\s+class\s+(.*)\s+extends\s+WorkerTaskImpl\s*{/,
              'class $1 extends WorkerTaskImpl {'
            )
        // 如果是入口文件，需要追加初始化代码
        if (workerClass) {
          code += `\n;new ${workerClass}().entry()`
        }
        return code
      }
    },
    generateBundle(_, bundle) {
      const workers = getWorkers()
      const workerPaths = Object.keys(workers).map((key) => {
        return key.replace('.uts', '.js')
      })
      if (workerPaths.length) {
        Object.keys(bundle).forEach((file) => {
          if (workerPaths.includes(file)) {
            const chunk = bundle[file]
            if (chunk.type === 'chunk') {
              const workerCode = external
                ? `require('${normalizePath(
                    path.relative(
                      path.dirname(file),
                      path.join(resolveWorkersRootDir(), 'uni-worker.js')
                    )
                  )}')`
                : workerPolyfillCode
              chunk.code = `${workerCode}\n${chunk.code}`
            }
          }
        })
      }
    },
    writeBundle() {
      if (external && Object.keys(getWorkers()).length && !isWrite) {
        isWrite = true
        // 写入uni-worker.js
        fs.outputFileSync(
          path.resolve(
            process.env.UNI_OUTPUT_DIR!,
            resolveWorkersRootDir(),
            'uni-worker.js'
          ),
          workerPolyfillCode
        )
      }
    },
  }
}

export async function initUniXCompilerRootWorkers(
  rootDir: string,
  compiler: UniXCompiler
) {
  const workers = getWorkers()
  if (Object.keys(workers).length) {
    for (const key in workers) {
      const file = path.join(rootDir, key + '.ts')
      if (fs.existsSync(file)) {
        if (!compiler.hasRootFile(file)) {
          await compiler.addRootFile(file)
        }
      }
    }
  }
}
