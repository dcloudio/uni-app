import type { Plugin } from 'vite'
import type { SyncUniModulesFilePreprocessor } from '@dcloudio/uni-uts-v1'
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
import { offsetToLineColumn } from './vite/plugins/vitejs/utils'
import { createRollupError } from './vite'
import { resolveBuiltIn } from './resolve'

let workers: Record<string, string> = {}

export function getWorkers() {
  return workers
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
  function refreshWorkers() {
    const workersDir = resolveWorkersDir(inputDir)
    if (workersDir) {
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
  return {
    name: 'uni-workers',
    enforce: 'pre',
    async buildStart() {
      if (refreshWorkers()) {
        if (preprocessor) {
          await syncWorkersFiles(platform, inputDir, preprocessor, cache)
        }
      }
    },
    // transform(code) {
    //   return {
    //     code: rewriteCreateWorker(code, platform),
    //     map: null,
    //   }
    // },
  }
}

export function parseCreateWorker(
  code: string,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  filename?: string
) {
  const importCodes: string[] = []
  const matches = code.matchAll(/uni\.createWorker\(['|"](.*)['|"]\)/g)
  for (const match of matches) {
    let workerPath = match[1]
    if (workerPath.startsWith('/')) {
      workerPath = workerPath.slice(1)
    } else if (workerPath.startsWith('@/')) {
      workerPath = workerPath.slice(2)
    }
    const workerClass = workers[normalizePath(workerPath)]
    if (workerClass) {
      importCodes.push(`import { ${workerClass} } from '@/${workerPath}'`)
      code = code.replace(
        match[0],
        `uni.createWorker(${resolveWorkerPath(workerClass, platform)})`
      )
    } else {
      const index = match.index
      if (typeof index === 'number') {
        const startIndex = index + /* uni.createWorker(*/ 18
        const endIndex = index + match[0].length
        const start = offsetToLineColumn(code, startIndex)
        const end = offsetToLineColumn(code, endIndex)
        // 解析对应的行号、列号
        throw createRollupError(
          '',
          filename || '',
          {
            name: 'SyntaxError',
            code: '',
            message: `worker[${workerPath}]不存在或未正确实现`,
            loc: {
              start: {
                line: start.line,
                column: start.column,
                offset: startIndex,
              },
              end: {
                line: end.line,
                column: end.column,
                offset: endIndex,
              },
              source: '',
            },
          },
          code
        )
      }
    }
  }
  return {
    code,
    importCodes,
  }
}

export function rewriteCreateWorker(
  code: string,
  platform: typeof process.env.UNI_UTS_PLATFORM,
  filename?: string
) {
  let { importCodes, code: newCode } = parseCreateWorker(
    code,
    platform,
    filename
  )
  if (importCodes.length > 0) {
    newCode = newCode + '\n' + importCodes.join('\n')
  }
  return newCode
}

function resolveWorkerPath(
  className: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  if (platform === 'app-android') {
    return `UTSAndroid.getJavaClass(${className})`
  } else if (platform === 'app-ios') {
    return `${className}.self`
  }
  return className
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

function resolveWorkersDir(inputDir: string) {
  const manifestJson = parseManifestJsonOnce(inputDir)
  if (manifestJson.workers && typeof manifestJson.workers === 'string') {
    const workersDir: string = normalizePath(manifestJson.workers)
    const dir = path.join(inputDir, workersDir)
    if (fs.existsSync(dir)) {
      return workersDir
    }
  }
}

export function uniJavaScriptWorkersPlugin(): Plugin {
  const workerPolyfillCode = fs.readFileSync(
    resolveBuiltIn('@dcloudio/uni-app/dist-x/uni-worker.js'),
    'utf-8'
  )
  return {
    name: 'uni-javascript-workers',
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
              chunk.code = `${workerPolyfillCode}\n${chunk.code}\nnew ${
                workers[file.replace('.js', '.uts')]
              }()`
            }
          }
        })
      }
    },
  }
}
