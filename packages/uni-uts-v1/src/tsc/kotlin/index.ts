import path from 'path'
import debug from 'debug'
import type * as tsTypes from 'typescript'

import type {
  RunAndroidOptions,
  RunAndroidResult,
  WatchProgramHelper,
} from '../../../lib/kotlin/dist/index'
import { originalPositionForSync } from '../../sourceMap'
import { normalizePath } from '../../shared'

const debugTscWatcher = debug('uts:tsc:watcher')

export function runUTS2Kotlin(
  mode: 'development' | 'production',
  options: {
    inputDir: string
    outputDir: string
    cacheDir: string
    rootFiles?: string[]
    normalizeFileName: (str: string) => string
  }
): {
  watcher?: WatchProgramHelper
} {
  const inputDir = normalizePath(options.inputDir)
  const utsLibDir = path.resolve(__dirname, '../../../lib')

  const pluginPath = process.env.UNI_HBUILDERX_PLUGINS
    ? process.env.UNI_HBUILDERX_PLUGINS
    : path.resolve(process.cwd(), '../')

  const hxLanguageServiceDir = path.resolve(
    pluginPath,
    'hbuilderx-language-services/builtin-dts'
  )

  const ts = require(path.resolve(utsLibDir, 'typescript')) as typeof tsTypes

  const fileWatcher = new UTSFileWatcher({
    tscDir: inputDir,
    inputDir: process.env.UNI_INPUT_DIR,
  })

  const watchFile: RunAndroidOptions['watchFile'] =
    mode === 'development'
      ? (fileName, callback, pollingInterval, options) => {
          // 仅监听工程目录内的文件
          if (fileName.startsWith(inputDir)) {
            if (fileName.includes('?type=page')) {
              fileName = fileName.replace('?type=page', '')
            }
            return fileWatcher.watchFile(
              fileName,
              callback,
              pollingInterval,
              options
            )
          }
          return {
            close() {
              /* noop */
            },
          }
        }
      : undefined

  const androidOptions: RunAndroidOptions = {
    typescript: ts,
    utsLibDir,
    hxLanguageServiceDir,
    originalPositionForSync,
    watchFile,
    ...options,
  }
  const result: RunAndroidResult =
    require('../../../lib/kotlin/dist/index').runAndroid(mode, androidOptions)
  const { watcher } = result
  if (watcher) {
    watcher.invalidate = async (files) => {
      let timeout = 300
      if (files) {
        for (const { fileName, event } of files) {
          if (fileWatcher.onWatchFileChange(fileName, event!)) {
            timeout = 2000
          }
        }
      }
      watcher.watch(timeout)
      return watcher.wait()
    }
  }
  return result
}

const replacements = /(\.uts|\.uvue|\.vue|\.json)\.ts$/
class UTSFileWatcher {
  private _inputDir: string
  private _tscDir: string
  private _watchFiles = new Map<
    string,
    { fileName: string; callback: tsTypes.FileWatcherCallback }
  >()
  constructor({ tscDir, inputDir }: { tscDir: string; inputDir: string }) {
    this._tscDir = tscDir
    this._inputDir = inputDir
  }
  watchFile(
    fileName: string,
    callback: tsTypes.FileWatcherCallback,
    pollingInterval?: number,
    options?: tsTypes.WatchOptions
  ): tsTypes.FileWatcher {
    // 此时记录的是emit出来的.tsc目录的文件
    const key = path
      .relative(this._tscDir, fileName)
      .replace(replacements, '$1')

    this._watchFiles.set(key, { fileName, callback })
    return {
      close: () => {
        this._watchFiles.delete(fileName)
      },
    }
  }
  onWatchFileChange(fileName: string, event: 'create' | 'update' | 'delete') {
    const relativeFileName = normalizePath(
      path.relative(this._inputDir, fileName)
    )
    const watcher = this._watchFiles.get(relativeFileName)
    if (watcher) {
      // Created = 0,
      // Changed = 1,
      // Deleted = 2,
      debugTscWatcher(relativeFileName, event)
      watcher.callback(
        watcher.fileName,
        event === 'update' ? 1 : event === 'delete' ? 2 : 0
      )
      return true
    } else {
      debugTscWatcher(relativeFileName, ' not found')
    }
    return false
  }
}
