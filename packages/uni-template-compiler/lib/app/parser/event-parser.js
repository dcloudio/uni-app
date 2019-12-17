const deprecated = {
  events: {
    'tap': 'click',
    'longtap': 'longpress'
  }
}
module.exports = function parseEvent (el) {
  if (el.events) {
    const {
      events: eventsMap
    } = deprecated
    Object.keys(el.events).forEach(name => {
      // 过时事件类型转换
      if (eventsMap[name]) {
        el.events[eventsMap[name]] = el.events[name]
        delete el.events[name]
        // warnLogs.add(`警告：事件${name}已过时，推荐使用${eventsMap[name]}代替`)
      }
    })
  }
}
