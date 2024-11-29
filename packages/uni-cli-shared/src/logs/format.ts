import { once } from '@dcloudio/uni-shared'
import { isString } from '@vue/shared'

import { isInHBuilderX, runByHBuilderX } from '../hbx/env'
import { moduleAliasFormatter } from '../hbx/alias'
import {
  errorFormatter,
  h5ServeFormatter,
  removeDuplicatePluginFormatter,
  removeInfoFormatter,
  removeWarnFormatter,
} from '../hbx/log'
import type { LogErrorOptions, LogOptions } from 'vite'

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
  if (options && isInHBuilderX()) {
    options.timestamp = false
  }
  initErrFormattersOnce()
  const formatter = errFormatters.find(({ test }) => test(msg, options))
  if (formatter) {
    return formatter.format(msg, options)
  }
  return msg
}

const REMOVED_NVUE_MSGS = [
  (msg: string) => {
    // vite v2.7.10 building for development... (x2)
    return msg.includes('vite v') && msg.includes('building ')
  },
]

export const removeNVueInfoFormatter: Formatter = {
  test(msg) {
    return !!REMOVED_NVUE_MSGS.find((m) =>
      isString(m) ? msg.includes(m) : m(msg)
    )
  },
  format() {
    return ''
  },
}
const nvueInfoFormatters: Formatter[] = []
const initNVueInfoFormattersOnce = once(() => {
  nvueInfoFormatters.push(removeNVueInfoFormatter)
})

export function formatInfoMsg(
  msg: string,
  options?: LogOptions & { nvue?: boolean }
) {
  if (options && isInHBuilderX()) {
    options.timestamp = false
  }
  initInfoFormattersOnce()
  const formatter = infoFormatters.find(({ test }) => test(msg, options))
  if (formatter) {
    return formatter.format(msg, options)
  }
  if (options?.nvue) {
    initNVueInfoFormattersOnce()
    const formatter = nvueInfoFormatters.find(({ test }) => test(msg, options))
    if (formatter) {
      return formatter.format(msg, options)
    }
  }
  return msg
}

export function formatWarnMsg(msg: string, options?: LogOptions) {
  if (options && isInHBuilderX()) {
    options.timestamp = false
  }
  initWarnFormattersOnce()
  msg = removeDuplicatePluginFormatter.format(msg)
  const formatter = warnFormatters.find(({ test }) => test(msg, options))
  if (formatter) {
    return formatter.format(msg, options)
  }
  return msg
}
