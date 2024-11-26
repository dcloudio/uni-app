const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'] as const

type MessageType = 'log' | 'warn' | 'error' | 'info' | 'debug'

type SendFn = ((msg: any) => void) | null

let send: SendFn = null

export function setSend(value: SendFn) {
  send = value
  if (value != null) {
    value(messageQueue)
  }
}

type Message = {
  type: MessageType
  args: Array<any>
}

const messageQueue: Message[] = []

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
      const message = formatMessage(type, args)
      if (send == null) {
        messageQueue.push(message)
        return
      }
      send(message)
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

export function formatArg(arg: any | null) {
  return ARG_FORMATTERS[typeof arg](arg)
}

function formatObject(value: object) {
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
        properties: value.map(formatArrayElement),
        methods: [],
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
        entries: Array.from(value).map(formatSetEntry),
        methods: [],
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
        entries: Array.from(value.entries()).map(formatMapEntry),
        methods: [],
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
        formatObjectProperty(name, value)
      ),
      methods: [],
    },
  }
}

function formatObjectProperty(name: string, value: any | null) {
  return Object.assign(formatArg(value), {
    name,
  })
}
function formatArrayElement(value: any | null, index: number) {
  return Object.assign(formatArg(value), {
    name: `${index}`,
  })
}

function formatSetEntry(value: any | null) {
  return {
    value: formatArg(value),
  }
}

function formatMapEntry(value: Array<any | null>) {
  return {
    key: formatArg(value[0]),
    value: formatArg(value[1]),
  }
}

const ARG_FORMATTERS = {
  undefined() {
    return {
      type: 'undefined',
    }
  },
  object(value: object) {
    return formatObject(value)
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
