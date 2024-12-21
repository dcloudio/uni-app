import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import type { SendFn } from './utils'

const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'] as const

type MessageType = 'log' | 'warn' | 'error' | 'info' | 'debug'

let sendConsole: SendFn = null

type Message = {
  type: MessageType
  args: Array<any>
}

const messageQueue: Message[] = []

function sendConsoleMessages(messages: Message[]) {
  if (sendConsole == null) {
    messageQueue.push(...messages)
    return
  }
  sendConsole(
    JSON.stringify({
      type: 'console',
      data: messages,
    })
  )
}

export function setSendConsole(value: SendFn) {
  sendConsole = value
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
      if (__UNI_CONSOLE_KEEP_ORIGINAL__) {
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
    if (!__UNI_CONSOLE_WEBVIEW__) {
      // @ts-expect-error
      if (typeof uni !== 'undefined' && uni.__f__) {
        // @ts-expect-error
        const oldLog = uni.__f__
        if (oldLog) {
          // 重写 uni.__f__ 方法，这样的话，仅能打印开发者代码里的日志，其他没有被重写为__f__的日志将无法打印（比如uni-app框架、小程序框架等）
          // @ts-expect-error
          uni.__f__ = function (...args: any[]) {
            const [type, filename, ...rest] = args
            // 原始日志移除 filename
            oldLog(type, '', ...rest)
            sendConsoleMessages([formatMessage(type, [...rest, filename])])
          }
          return function restoreConsole() {
            // @ts-expect-error
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

function formatMessage(type: MessageType, args: Array<any | null>): Message {
  try {
    return {
      type,
      args: formatArgs(args),
    }
  } catch (e) {
    originalConsole.error(e)
  }
  return {
    type,
    args: [],
  }
}

function formatArgs(args: Array<any | null>) {
  return args.map((arg) => formatArg(arg))
}

export function formatArg(arg: any | null, depth: number = 0) {
  if (depth >= 7) {
    return {
      type: 'object',
      value: '[Maximum depth reached]',
    }
  }
  return ARG_FORMATTERS[typeof arg](arg, depth)
}

function formatObject(value: object, depth: number) {
  if (value === null) {
    return {
      type: 'null',
    }
  }

  if (isComponentPublicInstance(value)) {
    return formatComponentPublicInstance(value, depth)
  }

  if (isComponentInternalInstance(value)) {
    return formatComponentInternalInstance(value, depth)
  }

  if (isUniElement(value)) {
    return formatUniElement(value, depth)
  }

  if (isCSSStyleDeclaration(value)) {
    return formatCSSStyleDeclaration(value, depth)
  }

  if (Array.isArray(value)) {
    return {
      type: 'object',
      subType: 'array',
      value: {
        properties: value.map((v, i) => formatArrayElement(v, i, depth + 1)),
      },
    }
  }
  if (value instanceof Set) {
    return {
      type: 'object',
      subType: 'set',
      className: 'Set',
      description: `Set(${value.size})`,
      value: {
        entries: Array.from(value).map((v) => formatSetEntry(v, depth + 1)),
      },
    }
  }
  if (value instanceof Map) {
    return {
      type: 'object',
      subType: 'map',
      className: 'Map',
      description: `Map(${value.size})`,
      value: {
        entries: Array.from(value.entries()).map((v) =>
          formatMapEntry(v, depth + 1)
        ),
      },
    }
  }

  if (value instanceof Promise) {
    return {
      type: 'object',
      subType: 'promise',
      value: {
        properties: [],
      },
    }
  }
  if (value instanceof RegExp) {
    return {
      type: 'object',
      subType: 'regexp',
      value: String(value),
      className: 'Regexp',
    }
  }
  if (value instanceof Date) {
    return {
      type: 'object',
      subType: 'date',
      value: String(value),
      className: 'Date',
    }
  }
  if (value instanceof Error) {
    return {
      type: 'object',
      subType: 'error',
      value: value.message || String(value),
      className: value.name || 'Error',
    }
  }
  return {
    type: 'object',
    value: {
      properties: Object.entries(value).map(([name, value]) =>
        formatObjectProperty(name, value, depth + 1)
      ),
    },
  }
}

function isComponentPublicInstance(
  value: any
): value is ComponentPublicInstance {
  return value.$ && isComponentInternalInstance(value.$)
}

function isComponentInternalInstance(
  value: any
): value is ComponentInternalInstance {
  return value.type && value.uid != null && value.appContext
}

function formatComponentPublicInstance(
  value: ComponentPublicInstance,
  depth: number
) {
  return {
    type: 'object',
    className: 'ComponentPublicInstance',
    value: {
      properties: Object.entries(value.$.type).map(([name, value]) =>
        formatObjectProperty(name, value, depth + 1)
      ),
    },
  }
}

function formatComponentInternalInstance(
  value: ComponentInternalInstance,
  depth: number
) {
  return {
    type: 'object',
    className: 'ComponentInternalInstance',
    value: {
      properties: Object.entries(value.type).map(([name, value]) =>
        formatObjectProperty(name, value, depth + 1)
      ),
    },
  }
}

function isUniElement(value: any): value is UniElement {
  return value.style && value.tagName != null && value.nodeName != null
}

function formatUniElement(value: UniElement, depth: number) {
  return {
    type: 'object',
    // 非 x 没有 UniElement 的概念
    // className: 'UniElement',
    value: {
      properties: Object.entries(value)
        .filter(([name]) =>
          [
            'id',
            'tagName',
            'nodeName',
            'dataset',
            'offsetTop',
            'offsetLeft',
            'style',
          ].includes(name)
        )
        .map(([name, value]) => formatObjectProperty(name, value, depth + 1)),
    },
  }
}

function isCSSStyleDeclaration(
  value: any
): value is CSSStyleDeclaration & { $styles: Record<string, string | null> } {
  return (
    typeof value.getPropertyValue === 'function' &&
    typeof value.setProperty === 'function' &&
    value.$styles
  )
}

function formatCSSStyleDeclaration(
  style: CSSStyleDeclaration & { $styles: Record<string, string | null> },
  depth: number
) {
  return {
    type: 'object',
    value: {
      properties: Object.entries(style.$styles).map(([name, value]) =>
        formatObjectProperty(name, value, depth + 1)
      ),
    },
  }
}

function formatObjectProperty(name: string, value: any | null, depth: number) {
  return Object.assign(formatArg(value, depth), {
    name,
  })
}
function formatArrayElement(value: any | null, index: number, depth: number) {
  return Object.assign(formatArg(value, depth), {
    name: `${index}`,
  })
}

function formatSetEntry(value: any | null, depth: number) {
  return {
    value: formatArg(value, depth),
  }
}

function formatMapEntry(value: Array<any | null>, depth: number) {
  return {
    key: formatArg(value[0], depth),
    value: formatArg(value[1], depth),
  }
}

const ARG_FORMATTERS = {
  function(value: any) {
    return {
      type: 'function',
      value: `function ${value.name}() {}`,
    }
  },
  undefined() {
    return {
      type: 'undefined',
    }
  },
  object(value: object, depth: number) {
    return formatObject(value, depth)
  },
  boolean(value: boolean) {
    return {
      type: 'boolean',
      value: String(value),
    }
  },
  number(value: number) {
    return {
      type: 'number',
      value: String(value),
    }
  },
  bigint(value: bigint) {
    return {
      type: 'bigint',
      value: String(value),
    }
  },
  string(value: string) {
    return {
      type: 'string',
      value,
    }
  },
  symbol(value: symbol) {
    return {
      type: 'symbol',
      value: value.description,
    }
  },
}
