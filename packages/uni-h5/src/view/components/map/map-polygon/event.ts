import { Maps } from '../maps'
import { CustomEventTrigger, EventObj, Polygon } from './interface'
const { assign, create } = Object

// 事件对象，以腾讯原生事件名为 key，对外暴露的对应事件名为 value
export const eventObj: EventObj = assign(create(null), {
  // 当此多边形所在地图更改时会触发此事件
  map_changed: 'polygonMapChanged',
  // 当此多边形可见性更改时会触发此事件
  visible_changed: 'polygonVisibleChanged',
  // 当此多边形zIndex更改时会触发此事件
  zindex_changed: 'polygonZindexChange',
  // 点击此多边形后会触发此事件
  click: 'polygonTap',
  // 双击多边形后会触发此事件
  dblclick: 'polygonDblclick',
  // 右键点击多边形后会触发此事件
  rightclick: 'polygonRightclick',
  // 鼠标在多边形内按下触发此事件
  mousedown: 'polygonMousedown',
  // 鼠标在多边形上抬起时触发此事件
  mouseup: 'polygonMouseup',
  // 当鼠标进入多边形区域时会触发此事件
  mouseover: 'polygonMouseover',
  // 鼠标离开多边形时触发此事件
  mouseout: 'polygonMouseout',
  // 鼠标在多边形内移动时触发此事件
  mousemove: 'polygonMousemove',
  // 编辑多边形添加节点时触发此事件
  insertNode: 'polygonInsertNode',
  // 编辑多边形删除节点时触发此事件
  removeNode: 'polygonRemoveNode',
  // 编辑多边形移动节点时触发此事件
  adjustNode: 'polygonAdjustNode',
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
    maps.event.addListener(polygonIns, key, function (e: MouseEvent) {
      // 要对外暴露的事件
      const eVal = eventObj[key]
      e ? trigger(eVal, {} as Event, e) : trigger(eVal, {} as Event)
    })
  }
}
