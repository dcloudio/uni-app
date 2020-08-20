import EventChannel from './EventChannel'

const eventChannels = {}

const eventChannelStack = []

let id = 0

export function initEventChannel (events, cache = true) {
  id++
  const eventChannel = new EventChannel(id, events)
  if (cache) {
    eventChannels[id] = eventChannel
    eventChannelStack.push(eventChannel)
  }
  return eventChannel
}

export function getEventChannel (id) {
  if (id) {
    const eventChannel = eventChannels[id]
    delete eventChannels[id]
    return eventChannel
  }
  return eventChannelStack.shift()
}

export default {
  args (fromArgs, toArgs) {
    const id = initEventChannel(fromArgs.events).id
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id
    }
  },
  returnValue (fromRes, toRes) {
    fromRes.eventChannel = getEventChannel()
  }
}
