const deprecated = {
  events: {
    tap: 'click',
    longtap: 'longpress'
  }
}
module.exports = function parseEvent (el) {
  if (el.events || el.nativeEvents) {
    const {
      events: eventsMap
    } = deprecated
    normalizeEvent(el.events, eventsMap)
    normalizeEvent(el.nativeEvents, eventsMap)
  }
}

function normalizeEvent (events, eventsMap) {
  if (!events) {
    return
  }
  Object.keys(events).forEach(name => {
    // 过时事件类型转换
    if (eventsMap[name]) {
      events[eventsMap[name]] = events[name]
      delete events[name]
      // warnLogs.add(`警告：事件${name}已过时，推荐使用${eventsMap[name]}代替`)
    }
  })
}
