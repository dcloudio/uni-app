import type { ComponentInternalInstance } from 'vue'
import { extend } from '@vue/shared'
import { normalizeTarget } from '@dcloudio/uni-shared'
import { getWindowTop, isBuiltInElement } from '../../helpers'
import { wrapperH5WxsEvent } from './componentWxs'

const isKeyboardEvent = (val: Event): val is KeyboardEvent =>
  !val.type.indexOf('key') && val instanceof KeyboardEvent
const isClickEvent = (val: Event): val is MouseEvent => val.type === 'click'
const isMouseEvent = (val: Event): val is MouseEvent =>
  val.type.indexOf('mouse') === 0 || ['contextmenu'].includes(val.type)
const isTouchEvent = (val: Event): val is TouchEvent =>
  (typeof TouchEvent !== 'undefined' && val instanceof TouchEvent) ||
  val.type.indexOf('touch') === 0 ||
  ['longpress'].indexOf(val.type) >= 0
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
  const isHTMLTarget = !isBuiltInElement(currentTarget)
  // App 平台时不返回原始事件对象 https://github.com/dcloudio/uni-app/issues/3240
  if (__PLATFORM__ === 'h5') {
    if (isHTMLTarget) {
      return (
        wrapperH5WxsEvent(
          evt,
          eventValue,
          instance as ComponentInternalInstance,
          false // 原生标签事件可能被cache，参数长度不准确，故默认不校验
        ) || [evt]
      )
    }
  }

  const res = createNativeEvent(evt, isHTMLTarget)

  if (!__X__) {
    if (isClickEvent(evt)) {
      normalizeClickEvent(res as WechatMiniprogram.Touch, evt)
    } else if (isMouseEvent(evt)) {
      normalizeMouseEvent(res as WechatMiniprogram.Touch, evt)
    } else if (isTouchEvent(evt)) {
      const top = getWindowTop()
      ;(res as any).touches = normalizeTouchEvent(evt.touches, top)
      ;(res as any).changedTouches = normalizeTouchEvent(
        evt.changedTouches,
        top
      )
    } else if (isKeyboardEvent(evt)) {
      const proxyKeys: (keyof KeyboardEvent)[] = ['key', 'code']
      proxyKeys.forEach((key) => {
        Object.defineProperty(res, key, {
          get() {
            return evt[key]
          },
        })
      })
    }
  }
  if (__PLATFORM__ === 'h5') {
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
  while (!isBuiltInElement(target)) {
    target = target.parentElement as HTMLElement
  }
  return target
}

export function createNativeEvent(
  evt: Event | TouchEvent,
  htmlElement: boolean = false
) {
  const { type, timeStamp, target, currentTarget } = evt
  let realTarget, realCurrentTarget
  if (__X__) {
    realTarget = htmlElement
      ? (target as HTMLElement)
      : findUniTarget(target as HTMLElement)
    realCurrentTarget = currentTarget
  } else {
    realTarget = normalizeTarget(
      htmlElement
        ? (target as HTMLElement)
        : findUniTarget(target as HTMLElement)
    )
    realCurrentTarget = normalizeTarget(currentTarget as HTMLElement)
  }
  const event = {
    type,
    timeStamp,
    target: realTarget,
    detail: {},
    currentTarget: realCurrentTarget,
  }
  // merge stopImmediatePropagation
  if ((evt as any)._stopped) {
    ;(event as any)._stopped = true
  }
  if (evt.type.startsWith('touch')) {
    ;(event as any).touches = (evt as TouchEvent).touches
    ;(event as any).changedTouches = (evt as TouchEvent).changedTouches
  }

  if (__PLATFORM__ === 'h5') {
    if (__X__) {
      for (const key in event) {
        Object.defineProperty(evt, key, {
          get() {
            return event[key]
          },
        })
      }
      return evt
    } else {
      wrapperEvent(event, evt)
    }
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
  evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt, top)]
}

function normalizeMouseEvent(evt: Record<string, any>, mouseEvt: MouseEvent) {
  const top = getWindowTop()
  evt.pageX = mouseEvt.pageX
  evt.pageY = mouseEvt.pageY - top
  evt.clientX = mouseEvt.clientX
  evt.clientY = mouseEvt.clientY - top
  evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt, top)]
}

function createTouchEvent(evt: MouseEvent, top: number) {
  return {
    force: 1,
    identifier: 0,
    clientX: evt.clientX,
    clientY: evt.clientY - top,
    pageX: evt.pageX,
    pageY: evt.pageY - top,
  }
}

function normalizeTouchEvent(touches: TouchList, top: number) {
  const res: any[] = []
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
