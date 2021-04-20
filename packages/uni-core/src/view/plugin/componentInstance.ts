import { ComponentPublicInstance } from 'vue'
import { normalizeTarget } from '@dcloudio/uni-shared'
import { getWindowOffset } from '../../helpers/getWindowOffset'

const isClickEvent = (val: Event): val is MouseEvent => val.type === 'click'
const isMouseEvent = (val: Event): val is MouseEvent =>
  val.type.indexOf('mouse') === 0

export function $normalizeNativeEvent(
  this: ComponentPublicInstance,
  evt: Event
) {
  const { currentTarget } = evt
  if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) {
    return evt
  }
  if (currentTarget.tagName.indexOf('UNI-') !== 0) {
    return evt
  }

  const res = createNativeEvent(evt)

  if (isClickEvent(evt)) {
    normalizeClickEvent((res as unknown) as WechatMiniprogram.Touch, evt)
  } else if (__PLATFORM__ === 'h5' && isMouseEvent(evt)) {
    normalizeMouseEvent((res as unknown) as WechatMiniprogram.Touch, evt)
  }

  return res
}

function createNativeEvent(evt: Event) {
  const { type, timeStamp, currentTarget } = evt
  const target = normalizeTarget(currentTarget as HTMLElement)
  return {
    type,
    timeStamp,
    target,
    detail: {},
    currentTarget: target,
    preventDefault() {
      if (__DEV__) {
        console.warn(
          'preventDefault is only supported in h5, use `.prevent` instead.'
        )
      }
      return evt.preventDefault()
    },
    stopPropagation() {
      if (__DEV__) {
        console.warn(
          'stopPropagation is only supported in h5, use `.stop` instead.'
        )
      }
      return evt.stopPropagation()
    },
  }
}

function normalizeClickEvent(
  evt: WechatMiniprogram.Touch,
  mouseEvt: MouseEvent
) {
  const { x, y } = mouseEvt
  const { top } = getWindowOffset()
  evt.detail = { x, y: y - top }
  evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt)]
}

function normalizeMouseEvent(evt: Record<string, any>, mouseEvt: MouseEvent) {
  const { top } = getWindowOffset()
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
