import { Formatter } from '../logs/format'

export const h5ServeFormatter: Formatter = {
  test(msg) {
    return msg.includes(' > Local:') || msg.includes(' > Network:')
  },
  format(msg) {
    return msg.replace('>', '-')
  },
}

const REMOVED_MSGS = [
  'build started...',
  (msg: string) => {
    return msg.startsWith('built in ')
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
