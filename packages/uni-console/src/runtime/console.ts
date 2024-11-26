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
  message: string
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

function formatMessage(type: MessageType, args: any[]): Message {
  return {
    type,
    message: args.map((arg) => JSON.stringify(arg)).join(' '),
  }
}
