import { Maps } from '../maps'
import { QQMaps } from '../maps/qq/types'
import { CustomEventTrigger, EventObj } from './interface'
const { assign, create } = Object

// 事件对象，以腾讯原生事件名为 key，对外暴露的对应事件名为 value
export const eventObj: EventObj = assign(create(null), {
  // 点击此多边形后会触发此事件
  click: 'polygontap',
})

/**
 * 监听事件，当对应事件发生时，将事件暴露给用户
 */
export function listenEvent(
  maps: Maps,
  polygonIns: HTMLElement,
  trigger: CustomEventTrigger
) {
  for (let key in eventObj) {
    ;(maps as QQMaps).event.addDomListener(
      polygonIns,
      key,
      function (e: MouseEvent) {
        // 要对外暴露的事件
        const eVal = eventObj[key]
        e ? trigger(eVal, {} as Event, e) : trigger(eVal, {} as Event)
      }
    )
  }
}
