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
    normalizeEvent(el, el.events, eventsMap)
    normalizeEvent(el, el.nativeEvents, eventsMap)
  }
}

function normalizeEvent (el, events, eventsMap) {
  if (!events) {
    return
  }
  const isMap = el.tag === 'map' || el.tag === 'v-uni-map'
  Object.keys(events).forEach(name => {
    // 过时事件类型转换
    if (eventsMap[name]) {
      if (isMap && name === 'tap') {
        // 地图组件有自己特定的 tap 事件，不做转换
      } else {
        events[eventsMap[name]] = events[name]
        delete events[name]
        // warnLogs.add(`警告：事件${name}已过时，推荐使用${eventsMap[name]}代替`)
      }
    }
  })
}
