import { Maps } from '../maps'
import { QQMaps } from '../maps/qq/types'
import { CustomEventTrigger, EventObj, Polygon } from './interface'
const { assign, create } = Object

// 事件对象，以腾讯原生事件名为 key，对外暴露的对应事件名为 value
export const eventObj: EventObj = assign(create(null), {
  // 当此多边形所在地图更改时会触发此事件
  map_changed: 'polygonmapchanged',
  // 当此多边形可见性更改时会触发此事件
  visible_changed: 'polygonvisiblechanged',
  // 当此多边形zIndex更改时会触发此事件
  zindex_changed: 'polygonzindexchange',
  // 点击此多边形后会触发此事件
  click: 'polygontap',
  // 双击多边形后会触发此事件
  dblclick: 'polygondblclick',
  // 右键点击多边形后会触发此事件
  rightclick: 'polygonrightclick',
  // 鼠标在多边形内按下触发此事件
  mousedown: 'polygonmousedown',
  // 鼠标在多边形上抬起时触发此事件
  mouseup: 'polygonmouseup',
  // 当鼠标进入多边形区域时会触发此事件
  mouseover: 'polygonmouseover',
  // 鼠标离开多边形时触发此事件
  mouseout: 'polygonmouseout',
  // 鼠标在多边形内移动时触发此事件
  mousemove: 'polygonmousemove',
  // 编辑多边形添加节点时触发此事件
  insertNode: 'polygoninsertnode',
  // 编辑多边形删除节点时触发此事件
  removeNode: 'polygonremovenode',
  // 编辑多边形移动节点时触发此事件
  adjustNode: 'polygonadjustnode',
})

/**
 * 监听事件，当对应事件发生时，将事件暴露给用户
 */
export function listenEvent(
  maps: Maps,
  polygonIns: Polygon,
  trigger: CustomEventTrigger
) {
  for (let key in eventObj) {
    ;(maps as QQMaps).event.addListener(
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
