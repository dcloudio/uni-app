import { ComponentInternalInstance } from 'vue'
import { extend } from '@vue/shared'
import { normalizeTarget } from '@dcloudio/uni-shared'
import { getWindowTop } from '../../helpers'
import { wrapperH5WxsEvent } from './componentWxs'

const isClickEvent = (val: Event): val is MouseEvent => val.type === 'click'
const isMouseEvent = (val: Event): val is MouseEvent =>
  val.type.indexOf('mouse') === 0 || ['contextmenu'].includes(val.type)
// normalizeNativeEvent
export function $nne(
  evt: Event,
  eventValue?: Function,
  instance?: ComponentInternalInstance | HTMLElement | null
) {
  // 目前内置组件底层实现，当需要访问原始event时，请使用withWebEvent包裹
  // 用法参考：uni-h5/src/framework/components/page/page-refresh/index.ts
  const { currentTarget } = evt
  if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) {
    return [evt]
  }
  if (currentTarget.tagName.indexOf('UNI-') !== 0) {
    return [evt]
  }

  const res = createNativeEvent(evt)

  if (isClickEvent(evt)) {
    normalizeClickEvent(res as unknown as WechatMiniprogram.Touch, evt)
  } else if (__PLATFORM__ === 'h5' && isMouseEvent(evt)) {
    normalizeMouseEvent(res as unknown as WechatMiniprogram.Touch, evt)
  } else if (evt instanceof TouchEvent) {
    const top = getWindowTop()
    ;(res as any).touches = normalizeTouchEvent(evt.touches, top)
    ;(res as any).changedTouches = normalizeTouchEvent(evt.changedTouches, top)
  }
  if (__PLATFORM__ === 'h5') {
    wrapperEvent(res, evt)
    return (
      wrapperH5WxsEvent(
        res,
        eventValue,
        instance as ComponentInternalInstance
      ) || [res]
    )
  }
  return [res]
}

function findUniTarget(target: HTMLElement): HTMLElement {
  while (target && target.tagName.indexOf('UNI-') !== 0) {
    target = target.parentElement as HTMLElement
  }
  return target
}

export function createNativeEvent(evt: Event | TouchEvent) {
  const { type, timeStamp, target, currentTarget } = evt
  const event = {
    type,
    timeStamp,
    target: normalizeTarget(findUniTarget(target as HTMLElement)),
    detail: {},
    currentTarget: normalizeTarget(currentTarget as HTMLElement),
  }
  // merge stopImmediatePropagation
  if ((evt as any)._stopped) {
    ;(event as any)._stopped = true
  }
  if (evt.type.startsWith('touch')) {
    ;(event as any).touches = (evt as TouchEvent).touches
    ;(event as any).changedTouches = (evt as TouchEvent).changedTouches
  }
  return event
}

function wrapperEvent(event: Record<string, any>, evt: Event | TouchEvent) {
  extend(event, {
    preventDefault() {
      return evt.preventDefault()
    },
    stopPropagation() {
      return evt.stopPropagation()
    },
  })
}

function normalizeClickEvent(
  evt: WechatMiniprogram.Touch,
  mouseEvt: MouseEvent
) {
  const { x, y } = mouseEvt
  const top = getWindowTop()
  evt.detail = { x, y: y - top }
  evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt)]
}

function normalizeMouseEvent(evt: Record<string, any>, mouseEvt: MouseEvent) {
  const top = getWindowTop()
  evt.pageX = mouseEvt.pageX
  evt.pageY = mouseEvt.pageY - top
  evt.clientX = mouseEvt.clientX
  evt.clientY = mouseEvt.clientY - top
}

function createTouchEvent(evt: MouseEvent) {
  return {
    force: 1,
    identifier: 0,
    clientX: evt.clientX,
    clientY: evt.clientY,
    pageX: evt.pageX,
    pageY: evt.pageY,
  }
}

function normalizeTouchEvent(touches: TouchList, top: number) {
  const res = []
  for (let i = 0; i < touches.length; i++) {
    const { identifier, pageX, pageY, clientX, clientY, force } = touches[i]
    res.push({
      identifier,
      pageX,
      pageY: pageY - top,
      clientX: clientX,
      clientY: clientY - top,
      force: force || 0,
    })
  }
  return res
}
