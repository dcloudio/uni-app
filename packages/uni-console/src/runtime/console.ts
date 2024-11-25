const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'] as const

type MessageType = 'log' | 'warn' | 'error' | 'info' | 'debug'

type SendFn = ((msg: any) => void) | null

let send: SendFn = null

export function setSend(value: SendFn) {
  send = value
  if (value != null) {
    const messages = messageQueue.slice()
    messageQueue.length = 0
    messages.forEach((msg) => {
      value(msg)
    })
  }
}

type Message = {
  type: MessageType
  message: string
}

const messageQueue: Message[] = []

export function rewriteConsole() {
  const originalConsole = console

  function wrapConsole(type: MessageType) {
    return function (...args: any[]) {
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
      console[type] = originalConsole[type]
    })
  }
}

function formatMessage(type: MessageType, args: any[]): Message {
  return {
    type,
    message: args.map((arg) => JSON.stringify(arg)).join(' '),
  }
}
