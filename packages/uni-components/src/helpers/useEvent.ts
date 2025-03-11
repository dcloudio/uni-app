import type { EmitsOptions, Ref, SetupContext } from 'vue'
import { normalizeTarget } from '@dcloudio/uni-shared'
import { createNativeEvent } from '@dcloudio/uni-core'

type EventDetail = Record<string, any>
export type CustomEventTrigger = ReturnType<typeof useCustomEvent>
export type NativeEventTrigger = ReturnType<typeof useNativeEvent>
export type EmitEvent<E extends (...args: any) => any> = [Parameters<E>[0]]

export function withWebEvent(fn: (...args: any[]) => any) {
  return ((fn as any).__wwe = true), fn
}

export function useCustomEvent<E extends EmitsOptions>(
  ref: Ref<HTMLElement | null>,
  emit: SetupContext<E>['emit']
) {
  return (name: string, evt: Event, detail?: EventDetail) => {
    if (ref.value) {
      emit(name, normalizeCustomEvent(name, evt, ref.value, detail || {}))
    }
  }
}

export function useNativeEvent<E extends EmitsOptions>(
  emit: SetupContext<E>['emit']
) {
  return (name: string, evt: Event) => {
    emit(name, createNativeEvent(evt))
  }
}

function normalizeCustomEvent(
  name: string,
  domEvt: Event,
  el: HTMLElement,
  detail: EventDetail
): WechatMiniprogram.CustomEvent {
  let target
  //#if _X_ && !_NODE_JS_
  target = el
  //#endif
  //#if !_X_ || _NODE_JS_
  target = normalizeTarget(el)
  //#endif
  return {
    type: (domEvt as any).__evName || detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail,
  }
}
