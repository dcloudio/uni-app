const { assign, create } = Object

// 事件对象，以腾讯原生事件名为 key，对外暴露的对应事件名为 value
export const eventObj = assign(create(null), {
  // 点击此多边形后会触发此事件
  click: 'polygontap'
})

/**
 * 监听事件，当对应事件发生时，将事件暴露给用户
 */
export function listenEvent (
  maps,
  polygonIns,
  trigger
) {
  for (const key in eventObj) {
    maps.event.addDomListener(polygonIns, key, function (e) {
      // 要对外暴露的事件
      const eVal = eventObj[key]
      e ? trigger(eVal, {}, e) : trigger(eVal, {})
    })
  }
}
