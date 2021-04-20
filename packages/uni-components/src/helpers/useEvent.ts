import { Ref, SetupContext } from 'vue'
import { normalizeTarget } from '@dcloudio/uni-shared'

type EventDetail = Record<string, any>
export type CustomEventTrigger = ReturnType<typeof useCustomEvent>

export function useCustomEvent(
  ref: Ref<HTMLElement | null>,
  emit: SetupContext['emit']
) {
  return (name: string, evt: Event, detail?: EventDetail) => {
    emit(
      name,
      normalizeCustomEvent(name, evt, ref.value as HTMLElement, detail || {})
    )
  }
}

function normalizeCustomEvent(
  name: string,
  domEvt: Event,
  el: HTMLElement,
  detail: EventDetail
): WechatMiniprogram.CustomEvent {
  const target = normalizeTarget(el)
  return {
    type: detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail,
  }
}
