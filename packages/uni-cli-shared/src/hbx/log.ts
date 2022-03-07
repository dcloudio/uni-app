import path from 'path'
import colors from 'picocolors'
import { LogErrorOptions } from 'vite'
import { normalizePath } from '../utils'
import { Formatter } from '../logs/format'
import { RollupError } from 'rollup'

const SIGNAL_H5_LOCAL = ' > Local:'
const SIGNAL_H5_NETWORK = ' > Network:'

const networkLogs: string[] = []

export function formatAtFilename(
  filename: string,
  line?: number,
  column?: number
) {
  return `at ${colors.cyan(
    normalizePath(
      path.relative(process.env.UNI_INPUT_DIR, filename.split('?')[0])
    ) +
      ':' +
      (line || 1) +
      ':' +
      (column || 0)
  )}`
}

export const h5ServeFormatter: Formatter = {
  test(msg) {
    return msg.includes(SIGNAL_H5_LOCAL) || msg.includes(SIGNAL_H5_NETWORK)
  },
  format(msg) {
    if (msg.includes(SIGNAL_H5_NETWORK)) {
      networkLogs.push(msg)
      process.nextTick(() => {
        if (networkLogs.length) {
          // 延迟打印所有 network,仅最后一个 network 替换 > 为 -，通知 hbx
          const len = networkLogs.length - 1
          networkLogs[len] = networkLogs[len].replace('>', '-')
          console.log(networkLogs.join('\n'))
          networkLogs.length = 0
        }
      })
      return ''
    }
    return msg.replace('>', '-')
  },
}

const REMOVED_MSGS = [
  'build started...',
  (msg: string) => {
    return /built in [0-9]+ms\./.test(msg)
  },
  'watching for file changes...',
]
export const removeInfoFormatter: Formatter = {
  test(msg) {
    return !!REMOVED_MSGS.find((m) =>
      typeof m === 'string' ? msg.includes(m) : m(msg)
    )
  },
  format() {
    return ''
  },
}
const REMOVED_WARN_MSGS: string[] = []
export const removeWarnFormatter: Formatter = {
  test(msg) {
    return !!REMOVED_WARN_MSGS.find((m) => msg.includes(m))
  },
  format() {
    return ''
  },
}

export const errorFormatter: Formatter<LogErrorOptions> = {
  test(_, opts) {
    return !!(opts && opts.error)
  },
  format(_, opts) {
    return buildErrorMessage(opts!.error!, [], false)
  },
}

function buildErrorMessage(
  err: RollupError,
  args: string[] = [],
  includeStack = true
): string {
  if (err.plugin) {
    args.push(
      `${colors.magenta('[plugin:' + err.plugin + ']')} ${colors.red(
        err.message
      )}`
    )
  } else {
    args.push(colors.red(err.message))
  }
  if (err.id) {
    args.push(formatAtFilename(err.id, err.loc?.line, err.loc?.column))
  }
  if (err.frame) {
    args.push(colors.yellow(pad(err.frame)))
  }
  if (includeStack && err.stack) {
    args.push(pad(cleanStack(err.stack)))
  }
  return args.join('\n')
}

function cleanStack(stack: string) {
  return stack
    .split(/\n/g)
    .filter((l) => /^\s*at/.test(l))
    .join('\n')
}

const splitRE = /\r?\n/

function pad(source: string, n = 2): string {
  const lines = source.split(splitRE)
  return lines.map((l) => ` `.repeat(n) + l).join(`\n`)
}
