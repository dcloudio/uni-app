import { cacheStringFunction } from '@dcloudio/uni-shared'
import { Ref, SetupContext, EmitsOptions } from 'vue'

type EventDetail = Record<string, any>
type WeexTarget = WechatMiniprogram.BaseEvent['target']
export type CustomEventTrigger = ReturnType<typeof useCustomEvent>
export type EmitEvent<E extends (...args: any) => any> = [Parameters<E>[0]]

export function useCustomEvent<E extends EmitsOptions>(
  ref: Ref<HTMLElement | null>,
  emit: SetupContext<E>['emit']
) {
  return (name: string, detail?: EventDetail) => {
    if (ref.value) {
      emit(name, normalizeCustomEvent(name, ref.value, detail || {}))
    }
  }
}

function normalizeCustomEvent(
  name: string,
  target: WeexTarget,
  detail: EventDetail = {}
): WechatMiniprogram.CustomEvent {
  target = processTarget(target)
  return {
    type: name,
    timeStamp: Date.now(),
    target,
    currentTarget: target,
    detail,
  }
}

const firstLetterToLowerCase = cacheStringFunction((str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
})

function processTarget(weexTarget: WeexTarget): WeexTarget {
  const { offsetLeft, offsetTop } = weexTarget
  const attr = (weexTarget as any).attr

  const dataset: Record<string, any> = {}
  Object.keys(attr || {}).forEach((key) => {
    if (key.indexOf('data') === 0) {
      dataset[firstLetterToLowerCase(key.replace('data', ''))] = attr[key]
    }
  })

  return {
    id: (attr && attr.id) || '',
    dataset,
    offsetLeft: offsetLeft || 0,
    offsetTop: offsetTop || 0,
  }
}
