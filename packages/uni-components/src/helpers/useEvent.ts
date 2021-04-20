import { Ref, SetupContext } from 'vue'

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

function normalizeDataset(el: HTMLElement) {
  return el.dataset
}

function normalizeTarget(el: HTMLElement): WechatMiniprogram.Target {
  const { id, offsetTop, offsetLeft } = el
  return {
    id,
    dataset: normalizeDataset(el),
    offsetTop,
    offsetLeft,
  }
}

function normalizeCustomEvent(
  name: string,
  domEvt: Event,
  el: HTMLElement,
  detail: EventDetail
) {
  const target = normalizeTarget(el)
  const evt: WechatMiniprogram.CustomEvent = {
    type: detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail,
  }
  return evt
}
