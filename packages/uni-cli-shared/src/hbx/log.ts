import fs from 'fs'
import path from 'path'
import colors from 'picocolors'
import type { RollupError } from 'rollup'
import type { LogErrorOptions } from 'vite'
import { NodeTypes } from '@vue/compiler-core'
import { isString } from '@vue/shared'
import { normalizePath } from '../utils'
import type { Formatter } from '../logs/format'

import { EXTNAME_VUE_RE } from '../constants'
import { parseVue } from '../vite/utils/ast'
import { generateCodeFrame } from '../vite/plugins/vitejs/utils'

const SIGNAL_H5_LOCAL = ' ➜  Local:'
const SIGNAL_H5_NETWORK = ' ➜  Network:'

const networkLogs: string[] = []

const ZERO_WIDTH_CHAR = {
  NOTE: '',
  WARNING: '\u200B',
  ERROR: '\u200C',
  backup0: '\u200D', // 标记换行
  backup1: '\u200E',
  backup2: '\u200F',
  backup3: '\uFEFF',
} as const

type ZERO_WIDTH_CHAR_KEY = keyof typeof ZERO_WIDTH_CHAR
type ConsoleMethod = 'warn' | 'error'

function overridedConsole(
  name: ConsoleMethod,
  oldFn: (...args: any[]) => any,
  char: (typeof ZERO_WIDTH_CHAR)[ZERO_WIDTH_CHAR_KEY]
) {
  console[name] = function (...args) {
    oldFn.apply(
      this,
      args.map((arg) => {
        let item
        if (typeof arg !== 'object') {
          item = `${char}${arg}${char}`
        } else {
          item = `${char}${JSON.stringify(arg)}${char}`
        }
        return item
      })
    )
  }
}

if (typeof console !== 'undefined') {
  overridedConsole('warn', console.log, ZERO_WIDTH_CHAR.WARNING)
  // overridedConsole('error', console.error, ZERO_WIDTH_CHAR.ERROR)
}

export function formatAtFilename(
  filename: string,
  line?: number,
  column?: number
) {
  filename = filename.replace('\x00', '').split('?')[0]
  const file = process.env.UNI_INPUT_DIR
    ? path.relative(process.env.UNI_INPUT_DIR, filename)
    : filename
  return `at ${colors.cyan(
    normalizePath(file === 'pages-json-uts' ? 'pages.json' : file) +
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
      networkLogs.push(msg.replace('➜ ', '*'))
      process.nextTick(() => {
        if (networkLogs.length) {
          // 延迟打印所有 network,仅最后一个 network 替换 ➜ 为 -，通知 hbx
          const len = networkLogs.length - 1
          networkLogs[len] = networkLogs[len].replace('* Network', '- Network')
          console.log(networkLogs.join('\n'))
          networkLogs.length = 0
        }
      })
      return ''
    }
    if (msg.includes(SIGNAL_H5_LOCAL)) {
      return msg.replace('➜ ', '-')
    }
    return msg.replace('➜ ', '*')
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
    return !!REMOVED_MSGS.find((m) => (isString(m) ? msg.includes(m) : m(msg)))
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

export const removeDuplicatePluginFormatter: Formatter = {
  test() {
    return true
  },
  format(msg) {
    // [plugin:vite:vue] [plugin vite:vue]
    // 正则匹配获取第一个插件名称，然后移除 [plugin vite:vue]
    const pluginName = msg.match(/\[plugin\s([^\]]+)\]/)?.[1]
    if (pluginName) {
      return msg.replace(`[plugin ${pluginName}]`, '')
    }
    return msg
  },
}

export const errorFormatter: Formatter<LogErrorOptions> = {
  test(_, opts) {
    return !!(opts && opts.error)
  },
  format(_, opts) {
    return buildErrorMessage(opts!.error as RollupError, [], false)
  },
}

function buildErrorMessage(
  err: RollupError,
  args: string[] = [],
  includeStack = true
): string {
  if (err.plugin) {
    // 避免出现这样的错误：[plugin:vite:vue] [plugin vite:vue]
    if (err.message.startsWith(`[plugin ${err.plugin}]`)) {
      let msg = err.message.replace(`[plugin ${err.plugin}]`, '')
      if (err.loc) {
        // [plugin:vite:vue]  pages/index/index.vue (2:12): v-on="" is not supported
        const locStr = `(${err.loc.line}:${err.loc.column}):`
        if (msg.includes(locStr)) {
          msg = msg.split(locStr)[1].trim()
        }
      }
      args.push(
        `${colors.magenta('[plugin:' + err.plugin + ']')} ${colors.red(msg)}`
      )
    } else {
      const otherMsgs: string[] = []
      if (err.message.includes(': [plugin ')) {
        const messages = err.message.split(': [plugin ')
        err.message = messages[0]
        messages.slice(1).forEach((msg) => {
          otherMsgs.push(`[plugin:${msg}`)
        })
      }
      if (err.loc) {
        // [plugin:vite:vue]  pages/index/index.vue (2:12): v-on="" is not supported
        const locStr = `(${err.loc.line}:${err.loc.column}):`
        if (err.message.includes(locStr)) {
          err.message = err.message.split(locStr)[1].trim()
        }
      }
      args.push(
        `${colors.magenta('[plugin:' + err.plugin + ']')} ${colors.red(
          err.message
        )}`
      )
      args.push(...otherMsgs)
      if (
        err.loc &&
        err.hook === 'transform' &&
        err.plugin === 'rollup-plugin-dynamic-import-variables' &&
        err.id &&
        EXTNAME_VUE_RE.test(err.id)
      ) {
        try {
          const ast = parseVue(fs.readFileSync(err.id, 'utf8'), [])
          const scriptNode = ast.children.find(
            (node) => node.type === NodeTypes.ELEMENT && node.tag === 'script'
          )
          if (scriptNode) {
            const scriptLoc = scriptNode.loc
            args.push(
              colors.yellow(pad(generateCodeFrame(scriptLoc.source, err.loc)))
            )
            // correct error location
            err.loc.line = scriptLoc.start.line + err.loc.line - 1
          }
        } catch (e: any) {}
      }
    }
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
