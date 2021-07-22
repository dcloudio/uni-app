import { isInHBuilderX } from '../hbx/env'
import { moduleAliasFormatter } from '../hbx/alias'

export interface Formatter {
  test: (msg: string) => boolean
  format: (msg: string) => string
}

const formatters: Formatter[] = []

if (isInHBuilderX()) {
  formatters.push(moduleAliasFormatter)
}

export function formatMsg(msg: string) {
  const formatter = formatters.find(({ test }) => test(msg))
  if (formatter) {
    return formatter.format(msg)
  }
  return msg
}
