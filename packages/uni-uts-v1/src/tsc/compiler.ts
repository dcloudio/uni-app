import path from 'path'
import debug from 'debug'
import fs from 'fs-extra'
import type * as tsTypes from 'typescript'
import type { RollupError } from 'rollup'
import type {
  UniXCompiler,
  UniXCompilerOptions,
} from '../../lib/uni-x/dist/compiler'
import { originalPositionForSync } from '../sourceMap'
import { normalizePath } from '../shared'
import { SPECIAL_CHARS, isEnableGenericsParameterDefaults } from '../utils'
import { COLORS, generateCodeFrame } from '../stacktrace/utils'

export type { UniXCompiler } from '../../lib/uni-x/dist/compiler'

const debugTscWatcher = debug('uts:tsc:watcher')
const debugCompile = debug('uts:tsc:compile')

type TargetLanguage = `${UniXCompilerOptions['targetLanguage']}`

export function createUniXCompiler(
  mode: UniXCompilerOptions['mode'],
  targetLanguage: TargetLanguage,
  options: {
    inputDir: string
    outputDir: string
    cacheDir: string
    paths?: tsTypes.CompilerOptions['paths']
    rootFiles?: string[]
    normalizeFileName: (str: string) => string
    isPureSwift?: boolean
    resolveWorkers: () => Record<string, string>
  }
) {
  const inputDir = normalizePath(options.inputDir)
  const utsLibDir = path.resolve(__dirname, '../../lib')

  const pluginPath = process.env.UNI_HBUILDERX_PLUGINS
    ? process.env.UNI_HBUILDERX_PLUGINS
    : path.resolve(process.cwd(), '../')

  const hxLanguageServiceDir = path.resolve(
    pluginPath,
    'hbuilderx-language-services'
  )

  const tsFactory = require(path.resolve(
    utsLibDir,
    'typescript/lib/typescript.factory.js'
  ))

  const fileWatcher = new UTSFileWatcher({
    tscDir: inputDir,
    inputDir: process.env.UNI_INPUT_DIR,
  })

  const watchFile: UniXCompilerOptions['watchFile'] = (
    fileName,
    callback,
    pollingInterval,
    options
  ) => {
    // 仅监听工程目录内的文件
    if (fileName.startsWith(inputDir)) {
      return fileWatcher.watchFile(fileName, callback, pollingInterval, options)
    }
    return {
      close() {
        /* noop */
      },
    }
  }

  const sourceMap =
    process.env.UNI_APP_SOURCEMAP === 'true' ||
    process.env.NODE_ENV === 'development'

  const compilerOptions: UniXCompilerOptions = {
    mode,
    targetLanguage: targetLanguage as UniXCompilerOptions['targetLanguage'],
    tsFactory,
    hxPluginDir: pluginPath,
    paths: options.paths,
    utsLibDir,
    hxLanguageServiceDir,
    sourceMap,
    inlineSources: sourceMap,
    watchFile,
    incremental: mode === 'development',
    transformOptions: {
      enableUTSNumber: false,
      enableNarrowType: true, // 默认开启
      enableGenericsParameterDefaults: isEnableGenericsParameterDefaults(),
      // TODO 调整参数传递方式
      isPureSwift: options.isPureSwift,
      resolveWorkers: options.resolveWorkers,
    },
    ...options,
  }
  const { UniXCompiler } = require('../../lib/uni-x/dist/compiler')
  const compiler: UniXCompiler = new UniXCompiler(compilerOptions)
  const reportDiagnostic = createReportDiagnostic(compiler, inputDir)
  // 目前触发编译的，只有addRootFile、addRootFiles、invalidate
  // 所以这里监听这些方法，并打印出诊断信息
  const oldAddRootFile = compiler.addRootFile
  compiler.addRootFile = async function (file) {
    await oldAddRootFile.call(compiler, file)
    reportDiagnostics()
  }
  const oldAddRootFiles = compiler.addRootFiles
  compiler.addRootFiles = async function (files) {
    await oldAddRootFiles.call(compiler, files)
    reportDiagnostics()
  }
  compiler.invalidate = async (files) => {
    let timeout = 300
    for (const { fileName, event } of files) {
      if (fileWatcher.onWatchFileChange(fileName, event!)) {
        timeout = 2000
      }
    }
    await compiler.wait(timeout)
    reportDiagnostics()
  }

  return compiler

  function reportDiagnostics() {
    const program = compiler.getProgram()
    if (program) {
      const syntacticDiagnostics = program.getSyntacticDiagnostics()
      syntacticDiagnostics.forEach((diagnostic) => {
        reportDiagnostic('syntactic', diagnostic)
      })
      const semanticDiagnostics = program.getSemanticDiagnostics()
      semanticDiagnostics.forEach((diagnostic) => {
        reportDiagnostic('semantic', diagnostic)
      })
    }
  }
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
    const key = normalizePath(
      path.relative(this._tscDir, fileName).replace(replacements, '$1')
    )

    this._watchFiles.set(key, { fileName, callback })
    return {
      close: () => {
        this._watchFiles.delete(key)
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

function createReportDiagnostic(compiler: UniXCompiler, inputDir: string) {
  const formatHost: tsTypes.FormatDiagnosticsHost = {
    getCanonicalFileName: (path) => path,
    getCurrentDirectory: () => inputDir,
    getNewLine: () => compiler.getTypeScript().sys.newLine,
  }
  return reportDiagnostic
  function diagnosticCategoryName(
    d: { category: tsTypes.DiagnosticCategory },
    lowerCase = true
  ): string {
    const name = compiler.getTypeScript().DiagnosticCategory[d.category]
    return lowerCase ? name.toLowerCase() : name
  }

  function reportDiagnostic(
    _type: 'syntactic' | 'semantic',
    diagnostic: tsTypes.Diagnostic
  ) {
    // 暂时屏蔽错误
    // const throwError = diagnostic.__throwError

    const throwError = [2300, 100006, 110111101, 110111163, 110111120].includes(
      diagnostic.code
    )
    const isDebug = debugCompile.enabled
    if (throwError) {
      const error = formatDiagnostic(diagnostic, formatHost)
      // 仅回源成功的才抛出错误，否则只打印一下
      if (error.file && error.frame) {
        throw createRollupError(error)
      } else {
        printError(error, COLORS.error, SPECIAL_CHARS.ERROR_BLOCK)
      }
    }
    if (isDebug) {
      printError(
        formatDiagnostic(diagnostic, formatHost),
        COLORS.error,
        SPECIAL_CHARS.ERROR_BLOCK
      )
    }
  }

  function formatDiagnostic(
    diagnostic: tsTypes.Diagnostic,
    host: tsTypes.FormatDiagnosticsHost
  ): DiagnosticError {
    const ts = compiler.getTypeScript()
    const errorMessage = `${diagnosticCategoryName(diagnostic)}${
      diagnostic.code ? ' UTS' + diagnostic.code : ''
    }: ${ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      host.getNewLine()
    )}`
    if (diagnostic.file) {
      let frame: string | undefined
      let { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start!
      )
      line = line + 1
      character = character + 1
      let fileName = diagnostic.file.fileName

      const sourceMapFile = fileName + '.map'
      if (fs.existsSync(sourceMapFile)) {
        const pos = originalPositionForSync({
          sourceMapFile,
          line,
          column: character - 1,
          withSourceContent: true,
        })
        if (pos && pos.source) {
          line = pos.line
          character = pos.column
          fileName = pos.source
          if (pos.sourceContent) {
            frame = generateCodeFrame(pos.sourceContent, {
              line,
              column: character,
            }).replace(/\t/g, ' ')
          }
        }
      } else {
        frame = generateCodeFrame(diagnostic.file.text, {
          line,
          column: character,
        }).replace(/\t/g, ' ')
      }

      if (path.isAbsolute(fileName)) {
        fileName = path.relative(inputDir, fileName)
      }
      fileName = fileName.replace(/\.(uvue|vue|uts)\.ts/, '.$1')
      return {
        msg: errorMessage,
        file: fileName,
        line,
        column: character,
        frame,
      }
    }

    return {
      msg: errorMessage,
    }
  }
}
interface DiagnosticError {
  msg: string
  file?: string
  line?: number
  column?: number
  frame?: string
}

export function createRollupError(error: DiagnosticError): RollupError {
  const rollupError: RollupError & { customPrint?: () => void } = new Error(
    error.msg
  )
  rollupError.customPrint = () => {
    printError(error, COLORS.error, SPECIAL_CHARS.ERROR_BLOCK)
  }
  return rollupError
}

function printError(error: DiagnosticError, color: string, block: string) {
  const blockContent = error.file && error.frame ? block : ''
  console.log(color + blockContent + error.msg + color)
  if (error.file) {
    console.log(`at ${error.file}:${error.line}:${error.column}`)
  }
  if (error.frame) {
    console.log(error.frame + blockContent)
  }
}

declare module 'typescript' {
  interface Diagnostic {
    __throwError?: boolean
  }
}
