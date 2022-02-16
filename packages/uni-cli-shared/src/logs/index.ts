export { formatErrMsg, formatInfoMsg, formatWarnMsg } from './format'

type LogType = 'error' | 'warn' | 'info' | 'log'
let lastType: LogType | undefined
let lastMsg: string | undefined
export function output(type: LogType, msg: string) {
  if (type === lastType && msg === lastMsg) {
    return
  }
  lastMsg = msg
  lastType = type
  const method = type === 'info' ? 'log' : type
  console[method](msg)
}
