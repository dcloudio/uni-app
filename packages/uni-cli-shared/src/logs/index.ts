import type { SourceLocation } from '@vue/compiler-core'
import { SPECIAL_CHARS } from '../constants'
import { generateCodeFrameColumns } from '../vite/utils/utils'

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

export function onCompileLog(
  type: 'warn' | 'error',
  error: CompileLogError,
  code: string,
  relativeFileName: string
) {
  const char =
    type === 'warn' ? SPECIAL_CHARS.WARN_BLOCK : SPECIAL_CHARS.ERROR_BLOCK
  console[type](char + type + ': ' + error.message + (error.loc ? '' : char))
  if (error.loc) {
    const start = error.loc.start
    console.log(
      'at ' + relativeFileName + ':' + start.line + ':' + start.column
    )
    console.log(generateCodeFrameColumns(code, error.loc) + char)
  }
}
