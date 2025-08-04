import type { Plugin } from 'vite'
import type {
  SyncUniModulesFilePreprocessor,
  UniXCompiler,
} from '@dcloudio/uni-uts-v1'
import path from 'path'
import fs from 'fs-extra'
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

let workersRootDir: string | null = null
let workers: Record<string, string> = {}

export function getWorkers() {
  return workers
}

export function getWorkersRootDir() {
  return workersRootDir
}

/**
 * 遍历目录下的所有uts文件，读取文件内容，正则匹配出定义的worker，返回文件名和类名的映射关系
 * export class MyWorkerTask extends WorkerTaskImpl {}
 * @param dir
 */
export function initWorkers(workersDir: string, rootDir: string) {
  const dir = path.join(rootDir, workersDir)
  if (!fs.existsSync(dir)) {
    return workers
  }
  workers = {}
  sync('**/*.uts', { cwd: dir }).forEach((file) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8')
    const match = content.match(
      /export\s+class\s+(.*)\s+extends\s+WorkerTaskImpl\s*{/
    )
    if (match && match[1]) {
      workers[normalizePath(path.join(workersDir, file))] = match[1]
    }
  })
  return workers
}

export function uniWorkersPlugin(): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const platform = process.env.UNI_UTS_PLATFORM
  const resolveWorkers = () => getWorkers()
  function refreshWorkers() {
    const workersDir = resolveWorkersDir(inputDir)
    if (workersDir) {
      workersRootDir = workersDir
      initWorkers(workersDir, inputDir)
      return true
    }
    return false
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
  const workersDir = resolveWorkersDir(inputDir)
  if (workersDir) {
    const { syncUTSFiles } = resolveUTSCompiler()
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

export function resolveWorkersDir(inputDir: string) {
  const manifestJson = parseManifestJsonOnce(inputDir)
  if (manifestJson.workers) {
    let workersDir =
      typeof manifestJson.workers === 'string'
        ? manifestJson.workers
        : manifestJson.workers.path
    if (workersDir) {
      workersDir = normalizePath(workersDir)
      const dir = path.join(inputDir, workersDir)
      if (fs.existsSync(dir)) {
        return workersDir
      }
    }
  }
}

export function uniJavaScriptWorkersPlugin(): Plugin {
  // 仅小程序平台外置uni-worker.mp.js
  const external = (process.env.UNI_UTS_PLATFORM || '').startsWith('mp-')
  let workerPolyfillCode = ''
  let isWrite = false
  const UniAppWorkerJSName = external ? 'uni-worker.mp.js' : 'uni-worker.web.js'
  return {
    name: 'uni:javascript-workers',
    generateBundle(_, bundle) {
      const workers = getWorkers()
      const workerPaths = Object.keys(workers).map((key) => {
        return key.replace('.uts', '.js')
      })
      if (workerPaths.length) {
        if (!workerPolyfillCode) {
          workerPolyfillCode = fs.readFileSync(
            resolveBuiltIn(`@dcloudio/uni-app/dist-x/${UniAppWorkerJSName}`),
            'utf-8'
          )
        }
        Object.keys(bundle).forEach((file) => {
          if (workerPaths.includes(file)) {
            const chunk = bundle[file]
            if (chunk.type === 'chunk') {
              const workerCode = external
                ? `require('${normalizePath(
                    path.relative(
                      path.dirname(file),
                      path.join(getWorkersRootDir()!, 'uni-worker.js')
                    )
                  )}')`
                : workerPolyfillCode
              chunk.code = `${workerCode}\n${chunk.code}\nnew ${
                workers[file.replace('.js', '.uts')]
              }()`
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
            getWorkersRootDir()!,
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
