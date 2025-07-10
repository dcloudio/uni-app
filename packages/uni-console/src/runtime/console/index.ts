import { sendErrorMessages } from '../error'
import type { SendFn } from '../utils'
import { type Message, formatMessage } from './format'
import { CONSOLE_TYPES, type MessageType, originalConsole } from './utils'

let sendConsole: SendFn = null

const messageQueue: Message[] = []

const messageExtra: Record<string, any> = {}

const EXCEPTION_BEGIN_MARK = '---BEGIN:EXCEPTION---'
const EXCEPTION_END_MARK = '---END:EXCEPTION---'

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

const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/

export function rewriteConsole() {
  if (__HARMONY_JSVM__) {
    if (
      typeof UTSProxyObject === 'object' &&
      UTSProxyObject !== null &&
      typeof UTSProxyObject.invokeSync === 'function'
    ) {
      UTSProxyObject.invokeSync('__UniConsole', 'setSendConsoleMessages', [
        sendConsoleMessages,
      ])
    }
  }
  function wrapConsole(type: MessageType) {
    return function (...args: any[]) {
      if (process.env.UNI_CONSOLE_KEEP_ORIGINAL) {
        const originalArgs = [...args]
        if (originalArgs.length) {
          const maybeAtFile = originalArgs[originalArgs.length - 1]
          // 移除最后的 at pages/index/index.uvue:6
          if (
            typeof maybeAtFile === 'string' &&
            atFileRegex.test(maybeAtFile)
          ) {
            originalArgs.pop()
          }
        }
        originalConsole[type](...originalArgs)
      }
      if (type === 'error' && args.length === 1) {
        const arg = args[0]
        if (typeof arg === 'string' && arg.startsWith(EXCEPTION_BEGIN_MARK)) {
          const startIndex = EXCEPTION_BEGIN_MARK.length
          const endIndex = arg.length - EXCEPTION_END_MARK.length
          sendErrorMessages([arg.slice(startIndex, endIndex)])
          return
        } else if (arg instanceof Error) {
          sendErrorMessages([arg])
          return
        }
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
  return function restoreConsole() {
    if (__HARMONY_JSVM__) {
      if (
        typeof UTSProxyObject === 'object' &&
        UTSProxyObject !== null &&
        typeof UTSProxyObject.invokeSync === 'function'
      ) {
        UTSProxyObject.invokeSync('__UniConsole', 'restoreConsole', [])
      }
    }
  }
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
