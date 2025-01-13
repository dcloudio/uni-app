import { type MessageType, formatMessage } from './console/format'

export function __f__(type: MessageType, filename: string, ...args: any[]) {
  const message = formatMessage(type, [...args, filename])
  return message
}
