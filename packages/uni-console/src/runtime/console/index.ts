import type { SendFn } from '../utils'
import { type Message, type MessageType, formatMessage } from './format'

const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'] as const

let sendConsole: SendFn = null

const messageQueue: Message[] = []

const messageExtra: Record<string, any> = {}

function sendConsoleMessages(messages: Message[]) {
  if (sendConsole == null) {
    messageQueue.push(...messages)
    return
  }
  sendConsole(
    JSON.stringify(
      Object.assign(
        {
          type: 'console',
          data: messages,
        },
        messageExtra
      )
    )
  )
}

export function setSendConsole(value: SendFn, extra: Record<string, any> = {}) {
  sendConsole = value
  Object.assign(messageExtra, extra)
  if (value != null && messageQueue.length > 0) {
    const messages = messageQueue.slice()
    messageQueue.length = 0
    sendConsoleMessages(messages)
  }
}

export const originalConsole = /*@__PURE__*/ CONSOLE_TYPES.reduce(
  (methods, type) => {
    methods[type] = console[type].bind(console)
    return methods
  },
  {} as Record<MessageType, typeof console.log>
)

const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/

export function rewriteConsole() {
  function wrapConsole(type: MessageType) {
    return function (...args: any[]) {
      const originalArgs = [...args]
      if (originalArgs.length) {
        const maybeAtFile = originalArgs[originalArgs.length - 1]
        // 移除最后的 at pages/index/index.uvue:6
        if (typeof maybeAtFile === 'string' && atFileRegex.test(maybeAtFile)) {
          originalArgs.pop()
        }
      }
      if (process.env.UNI_CONSOLE_KEEP_ORIGINAL) {
        originalConsole[type](...originalArgs)
      }
      sendConsoleMessages([formatMessage(type, args)])
    }
  }

  // 百度小程序不允许赋值，所以需要判断是否可写
  if (isConsoleWritable()) {
    CONSOLE_TYPES.forEach((type) => {
      console[type] = wrapConsole(type)
    })
    return function restoreConsole() {
      CONSOLE_TYPES.forEach((type) => {
        console[type] = originalConsole[type]
      })
    }
  } else {
    if (!process.env.UNI_CONSOLE_WEBVIEW) {
      if (typeof uni !== 'undefined' && uni.__f__) {
        const oldLog = uni.__f__
        if (oldLog) {
          // 重写 uni.__f__ 方法，这样的话，仅能打印开发者代码里的日志，其他没有被重写为__f__的日志将无法打印（比如uni-app框架、小程序框架等）
          uni.__f__ = function (...args: any[]) {
            const [type, filename, ...rest] = args
            // 原始日志移除 filename
            oldLog(type, '', ...rest)
            sendConsoleMessages([formatMessage(type, [...rest, filename])])
          }
          return function restoreConsole() {
            uni.__f__ = oldLog
          }
        }
      }
    }
  }
  return function restoreConsole() {}
}

function isConsoleWritable() {
  const value = console.log
  const sym = Symbol()
  try {
    // @ts-expect-error
    console.log = sym
  } catch (ex) {
    return false
  }
  // @ts-expect-error
  const isWritable = console.log === sym
  console.log = value
  return isWritable
}
