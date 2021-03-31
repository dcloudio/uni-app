import { ComponentPublicInstance } from 'vue'
import { normalizeEvent, findUniTarget } from './componentEvents'

export function $trigger(
  this: ComponentPublicInstance,
  name: string,
  $event: Event,
  detail?: Record<string, any>
) {
  const target = this.$el
  this.$emit(name, normalizeEvent(name, $event, detail, target, target))
}

export function $handleEvent(this: ComponentPublicInstance, $event: Event) {
  // 未处理的 event 对象 需要对 target 校正及包装
  // 查找 uniTarget
  if ($event instanceof Event) {
    const target = findUniTarget($event, this.$el)
    return normalizeEvent(
      $event.type,
      $event,
      {},
      target || $event.target,
      $event.currentTarget as HTMLElement
    )
  }
  return $event
}
