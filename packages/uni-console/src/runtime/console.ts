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

export function rewriteConsole() {
  // 保存原始控制台方法的副本
  const originalMethods = CONSOLE_TYPES.reduce((methods, type) => {
    methods[type] = console[type].bind(console)
    return methods
  }, {} as Record<MessageType, typeof console.log>)

  function wrapConsole(type: MessageType) {
    return function (...args: any[]) {
      // 使用保存的原始方法输出到控制台
      originalMethods[type](...args)
      sendConsoleMessages([formatMessage(type, args)])
    }
  }

  CONSOLE_TYPES.forEach((type) => {
    console[type] = wrapConsole(type)
  })

  return function restoreConsole() {
    CONSOLE_TYPES.forEach((type) => {
      console[type] = originalMethods[type]
    })
  }
}

function formatMessage(type: MessageType, args: Array<any | null>): Message {
  return {
    type,
    args: formatArgs(args),
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
      value: value.toString(),
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
