import type { SourceLocation } from '@vue/compiler-core'
import colors from 'picocolors'
import { SPECIAL_CHARS } from '../constants'
import { generateCodeFrameColumns } from '../vite/utils/utils'
import { formatAtFilename } from '../hbx/log'
import { generateCodeFrame } from '../vite/plugins/vitejs/utils'

export { formatErrMsg, formatInfoMsg, formatWarnMsg } from './format'

type LogType = 'error' | 'warn' | 'info' | 'log'
let lastType: LogType | undefined
let lastMsg: string | undefined

export function resetOutput(type: LogType) {
  if (type === lastType) {
    lastType = undefined
    lastMsg = ''
  }
}

export function output(type: LogType, msg: string) {
  if (type === lastType && msg === lastMsg) {
    return
  }
  lastMsg = msg
  lastType = type
  const method = type === 'info' ? 'log' : type
  console[method](msg)
}

export interface CompileLogError extends Error {
  loc?: Omit<SourceLocation, 'source'>
  customPrint?: () => void
}

export interface CompileLogOptions {
  plugin?: string
  line?: number
  column?: number
}

const suppressedCompileLogs: Array<() => void> = []

let isSuppressed = false

export function suppressVueCompileLog(suppressed: boolean) {
  isSuppressed = suppressed
  if (!suppressed) {
    suppressedCompileLogs.forEach((fn) => fn())
    suppressedCompileLogs.length = 0
  }
}

export function onCompileLog(
  type: 'warn' | 'error',
  error: CompileLogError,
  code: string,
  relativeFileName: string,
  options?: CompileLogOptions
) {
  if (isSuppressed) {
    // 不会导致内存泄漏吧？
    suppressedCompileLogs.push(print)
    return
  }
  print()
  function print() {
    const char =
      type === 'warn' ? SPECIAL_CHARS.WARN_BLOCK : SPECIAL_CHARS.ERROR_BLOCK
    if (options?.plugin) {
      // CSS 插件格式
      const colorFn = type === 'warn' ? colors.yellow : (s: string) => s
      console[type](
        char + colorFn(`[plugin:${options.plugin}] ${error.message}`)
      )
      let msg = formatAtFilename(relativeFileName, options.line, options.column)
      if (options.line && options.column) {
        msg += `\n${generateCodeFrame(code, {
          line: options.line,
          column: options.column,
        }).replace(/\t/g, ' ')}\n`
      }
      console.log(msg + char)
    } else {
      console[type](
        char + type + ': ' + error.message + (error.loc ? '' : char)
      )
      if (error.loc) {
        const start = error.loc.start
        console.log(
          'at ' + relativeFileName + ':' + start.line + ':' + start.column
        )
        console.log(generateCodeFrameColumns(code, error.loc) + char)
      }
    }
  }
}
