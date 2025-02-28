export const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'] as const

export type MessageType = 'log' | 'warn' | 'error' | 'info' | 'debug'

export const originalConsole = /*@__PURE__*/ CONSOLE_TYPES.reduce(
  (methods, type) => {
    methods[type] = console[type].bind(console)
    return methods
  },
  {} as Record<MessageType, typeof console.log>
)
