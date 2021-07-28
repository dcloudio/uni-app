import type { EventChannel } from '@dcloudio/uni-shared'
import { MPProtocol } from './types'

const eventChannels: Record<string, EventChannel> = {}

const eventChannelStack: EventChannel[] = []

let id = 0

export function initEventChannel(
  events: Record<string, (...args: any[]) => void>,
  cache = true
) {
  id++
  const eventChannel = new __GLOBAL__.EventChannel(id, events)
  if (cache) {
    eventChannels[id] = eventChannel
    eventChannelStack.push(eventChannel)
  }
  return eventChannel
}

export function getEventChannel(id?: number) {
  if (id) {
    const eventChannel = eventChannels[id]
    delete eventChannels[id]
    return eventChannel
  }
  return eventChannelStack.shift()
}

export const navigateTo: MPProtocol = {
  args(fromArgs) {
    const id = initEventChannel(fromArgs.events).id
    if (fromArgs.url) {
      fromArgs.url =
        fromArgs.url +
        (fromArgs.url.indexOf('?') === -1 ? '?' : '&') +
        '__id__=' +
        id
    }
  },
  returnValue(fromRes) {
    fromRes.eventChannel = getEventChannel()
  },
}
