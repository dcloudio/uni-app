import { Formatter } from '../logs/format'

const SIGNAL_H5_LOCAL = ' > Local:'
const SIGNAL_H5_NETWORK = ' > Network:'
const networkLogs: string[] = []
export const h5ServeFormatter: Formatter = {
  test(msg) {
    return msg.includes(SIGNAL_H5_LOCAL) || msg.includes(SIGNAL_H5_NETWORK)
  },
  format(msg) {
    if (msg.includes(SIGNAL_H5_NETWORK)) {
      networkLogs.push(msg)
      process.nextTick(() => {
        if (networkLogs.length) {
          // 延迟打印所有 network,仅最后一个 network 替换 > 为 -，通知 hbx
          const len = networkLogs.length - 1
          networkLogs[len] = networkLogs[len].replace('>', '-')
          console.log(networkLogs.join('\n'))
          networkLogs.length = 0
        }
      })
      return ''
    }
    return msg.replace('>', '-')
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
    return !!REMOVED_MSGS.find((m) =>
      typeof m === 'string' ? msg.includes(m) : m(msg)
    )
  },
  format() {
    return ''
  },
}
const REMOVED_WARN_MSGS = ['warnings when minifying css:']
export const removeWarnFormatter: Formatter = {
  test(msg) {
    return !!REMOVED_WARN_MSGS.find((m) => msg.includes(m))
  },
  format() {
    return ''
  },
}
