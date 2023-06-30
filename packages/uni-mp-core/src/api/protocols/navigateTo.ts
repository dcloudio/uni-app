import type { EventChannel } from '@dcloudio/uni-shared'
import { MPProtocol } from './types'

const eventChannels: Record<string, EventChannel> = {}

let id = 0

function initEventChannel(
  events: Record<string, (...args: any[]) => void>,
  cache = true
) {
  id++
  const eventChannel = new __GLOBAL__.EventChannel(id, events)
  if (cache) {
    eventChannels[id] = eventChannel
  }
  return eventChannel
}

export function getEventChannel(id: number) {
  const eventChannel = eventChannels[id]
  delete eventChannels[id]
  return eventChannel
}

export const navigateTo = (): MPProtocol => {
  let eventChannel: EventChannel

  return {
    args(fromArgs) {
      eventChannel = initEventChannel(fromArgs.events)
      if (fromArgs.url) {
        fromArgs.url =
          fromArgs.url +
          (fromArgs.url.indexOf('?') === -1 ? '?' : '&') +
          '__id__=' +
          eventChannel.id
      }
    },
    returnValue(fromRes) {
      fromRes.eventChannel = eventChannel
    },
  }
}
