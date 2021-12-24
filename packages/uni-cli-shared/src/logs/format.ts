import { once } from '@dcloudio/uni-shared'

import { isInHBuilderX, runByHBuilderX } from '../hbx/env'
import { moduleAliasFormatter } from '../hbx/alias'
import {
  h5ServeFormatter,
  removeInfoFormatter,
  removeWarnFormatter,
  errorFormatter,
} from '../hbx/log'
import { LogErrorOptions, LogOptions } from 'vite'

export interface Formatter<T extends LogOptions = LogOptions> {
  test: (msg: string, options?: T) => boolean
  format: (msg: string, options?: T) => string
}

const errFormatters: Formatter<LogErrorOptions>[] = []
const infoFormatters: Formatter[] = []
const warnFormatters: Formatter[] = []

const initErrFormattersOnce = once(() => {
  if (isInHBuilderX()) {
    errFormatters.push(moduleAliasFormatter)
  }
  errFormatters.push(errorFormatter)
})

const initInfoFormattersOnce = once(() => {
  if (runByHBuilderX()) {
    if (
      // 开发模式下
      process.env.UNI_PLATFORM === 'h5' &&
      process.env.NODE_ENV !== 'production'
    ) {
      infoFormatters.push(h5ServeFormatter)
    }
  }
  infoFormatters.push(removeInfoFormatter)
})

const initWarnFormattersOnce = once(() => {
  warnFormatters.push(removeWarnFormatter)
})

export function formatErrMsg(msg: string, options?: LogErrorOptions) {
  initErrFormattersOnce()
  const formatter = errFormatters.find(({ test }) => test(msg, options))
  if (formatter) {
    return formatter.format(msg, options)
  }
  return msg
}

export function formatInfoMsg(msg: string, options?: LogOptions) {
  initInfoFormattersOnce()
  const formatter = infoFormatters.find(({ test }) => test(msg, options))
  if (formatter) {
    return formatter.format(msg, options)
  }
  return msg
}

export function formatWarnMsg(msg: string, options?: LogOptions) {
  initWarnFormattersOnce()
  const formatter = warnFormatters.find(({ test }) => test(msg, options))
  if (formatter) {
    return formatter.format(msg, options)
  }
  return msg
}
