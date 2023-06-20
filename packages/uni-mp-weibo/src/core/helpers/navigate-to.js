import EventChannel from './EventChannel'

const eventChannels = {}

let id = 0

export function initEventChannel (events, cache = true) {
  id++
  const eventChannel = new EventChannel(id, events)
  if (cache) {
    eventChannels[id] = eventChannel
  }
  return eventChannel
}

export function getEventChannel (id) {
  const eventChannel = eventChannels[id]
  delete eventChannels[id]
  return eventChannel
}

export default function () {
  let eventChannel
  return {
    args (fromArgs, toArgs) {
      eventChannel = initEventChannel(fromArgs.events)
      if (fromArgs.url) {
        fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + eventChannel.id
      }
    },
    returnValue (fromRes, toRes) {
      fromRes.eventChannel = eventChannel
    }
  }
}
