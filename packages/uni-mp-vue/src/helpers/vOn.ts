import {
  NOOP,
  extend,
  hasOwn,
  isArray,
  isPlainObject,
  isPromise,
  isString,
} from '@vue/shared'
import {
  type ComponentInternalInstance,
  callWithAsyncErrorHandling,
  getCurrentInstance,
} from 'vue'
import { createEventTarget } from '../dom/utils'

type EventValue = Function | Function[]

interface Invoker {
  (evt: MPEvent): unknown
  value: EventValue
}

export function vOn(value: EventValue | undefined, key?: number | string) {
  const instance = getCurrentInstance()! as unknown as {
    $ei: number
    $currentSlotComponentInstance?: { uid: number; $ei: number }
    ctx: { $scope: Record<string, any>; $mpPlatform: UniApp.PLATFORM }
  }
  const ctx = instance.ctx
  // 微信小程序，QQ小程序，当 setData diff 的时候，若事件不主动同步过去，会导致事件绑定不更新，（question/137217）
  const extraKey =
    typeof key !== 'undefined' &&
    (ctx.$mpPlatform === 'mp-weixin' ||
      ctx.$mpPlatform === 'mp-qq' ||
      ctx.$mpPlatform === 'mp-xhs') &&
    (isString(key) || typeof key === 'number')
      ? '_' + key
      : ''

  let name: string

  if (instance.$currentSlotComponentInstance) {
    const slotComponentInstance = instance.$currentSlotComponentInstance
    name =
      'e' +
      slotComponentInstance.uid +
      '_' +
      slotComponentInstance.$ei++ +
      extraKey
  } else {
    name = 'e' + instance.$ei++ + extraKey
  }

  const mpInstance = ctx.$scope
  if (!value) {
    // remove
    delete mpInstance[name]
    return name
  }
  const existingInvoker = mpInstance[name] as Invoker
  if (existingInvoker) {
    // patch
    existingInvoker.value = value
  } else {
    // add
    mpInstance[name] = createInvoker(
      value,
      instance as unknown as ComponentInternalInstance
    )
  }
  return name
}

export interface MPEvent extends WechatMiniprogram.BaseEvent {
  detail: Record<string, any> & {
    __args__?: unknown[]
  }
  preventDefault: () => void
  stopPropagation: () => void
  stopImmediatePropagation: () => void
  // @internal
  _target?: any
  // @internal
  _currentTarget?: any
}

export interface MPTapEvent extends MPEvent {
  touches: {
    clientX: number
    clientY: number
    force: number
    identifier: number
    pageX: number
    pageY: number
    screenX: number
    screenY: number
  }[]
  x: number
  y: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  screenX: number
  screenY: number
}
function createInvoker(
  initialValue: EventValue,
  instance: ComponentInternalInstance | null
) {
  const invoker: Invoker = (e: MPEvent) => {
    patchMPEvent(e, instance)
    let args: unknown[] = [e]
    if (instance && (instance as any).ctx.$getTriggerEventDetail) {
      if (typeof e.detail === 'number') {
        e.detail = (instance as any).ctx.$getTriggerEventDetail(e.detail)
      }
    }
    if ((e as MPEvent).detail && (e as MPEvent).detail.__args__) {
      args = (e as MPEvent).detail.__args__!
    }
    const eventValue = invoker.value
    const invoke = () =>
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, eventValue),
        instance,
        5 /* ErrorCodes.NATIVE_EVENT_HANDLER */,
        args
      )

    // 冒泡事件触发时，启用延迟策略，避免同一批次的事件执行时机不正确，对性能可能有略微影响 https://github.com/dcloudio/uni-app/issues/3228
    const eventTarget = (e as MPEvent).target
    const eventSync = eventTarget
      ? eventTarget.dataset
        ? String(eventTarget.dataset.eventsync) === 'true'
        : false
      : false
    if (bubbles.includes(e.type) && !eventSync) {
      setTimeout(invoke)
    } else {
      const res = invoke()
      if (e.type === 'input' && (isArray(res) || isPromise(res))) {
        return
      }
      return res
    }
  }
  invoker.value = initialValue
  return invoker
}
// 冒泡事件列表
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  'tap',
  'longpress',
  'longtap',
  'transitionend',
  'animationstart',
  'animationiteration',
  'animationend',
  'touchforcechange',
]

function isMPTapEvent(event: MPEvent): event is MPTapEvent {
  return event.type === 'tap'
}

function normalizeXEvent(
  event: MPEvent,
  instance?: ComponentInternalInstance | null
) {
  if (isMPTapEvent(event)) {
    event.x = event.detail.x
    event.y = event.detail.y
    event.clientX = event.detail.x
    event.clientY = event.detail.y
    const touch0 = event.touches && event.touches[0]
    if (touch0) {
      event.pageX = touch0.pageX
      event.pageY = touch0.pageY
      event.screenX = touch0.screenX
      event.screenY = touch0.screenY
    }
  }
  if (event.target) {
    const oldTarget = event.target
    Object.defineProperty(event, 'target', {
      get() {
        if (!event._target) {
          event._target = createEventTarget(oldTarget, instance || undefined)
        }
        return event._target
      },
    })
  }
  if (event.currentTarget) {
    const oldCurrentTarget = event.currentTarget
    Object.defineProperty(event, 'currentTarget', {
      get() {
        if (!event._currentTarget) {
          event._currentTarget = createEventTarget(
            oldCurrentTarget,
            instance || undefined
          )
        }
        return event._currentTarget
      },
    })
  }
}

function patchMPEvent(
  event: MPEvent,
  instance?: ComponentInternalInstance | null
) {
  if (event.type && event.target) {
    event.preventDefault = NOOP
    event.stopPropagation = NOOP
    event.stopImmediatePropagation = NOOP
    if (!hasOwn(event, 'detail')) {
      event.detail = {}
    }
    if (hasOwn(event, 'markerId')) {
      event.detail = typeof event.detail === 'object' ? event.detail : {}
      event.detail.markerId = (event as any).markerId
    }

    // mp-baidu，checked=>value
    if (
      isPlainObject(event.detail) &&
      hasOwn(event.detail, 'checked') &&
      !hasOwn(event.detail, 'value')
    ) {
      event.detail.value = event.detail.checked
    }

    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail)
    }

    if (__X__) {
      normalizeXEvent(event, instance)
    }
  }
}

function patchStopImmediatePropagation(
  e: MPEvent,
  value: EventValue
): EventValue {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation
    e.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e)
      ;(e as any)._stopped = true
    }
    return value.map((fn) => (e: Event) => !(e as any)._stopped && fn(e))
  } else {
    return value
  }
}
