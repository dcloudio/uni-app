import { formatMessage } from './console/format'
import type { MessageType } from './console/utils'

export function __f__(type: MessageType, filename: string, ...args: any[]) {
  const message = formatMessage(type, [...args, filename])
  return message
}
