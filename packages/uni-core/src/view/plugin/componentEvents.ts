import { extend } from '@vue/shared'

import { getWindowOffset } from '../../helpers/getWindowOffset'

export function findUniTarget($event: Event, $el: HTMLElement): HTMLElement {
  let target = $event.target as HTMLElement
  for (; target && target !== $el; target = target.parentNode as HTMLElement) {
    if (target.tagName && target.tagName.indexOf('UNI-') === 0) {
      break
    }
  }
  return target
}

export function normalizeDataset(dataset: DOMStringMap = {}) {
  // ios8.x,9.x Object.assign({},dataset) 始终返回 {}
  // http://ask.dcloud.net.cn/question/70246
  const result = JSON.parse(JSON.stringify(dataset))
  // 暂不处理该逻辑了，理论上应该没什么影响
  //   if (__PLATFORM__ === 'h5') {
  //     removeScoped(result)
  //   }
  return result
}

export function normalizeEvent(
  name: string,
  $event: Event,
  detail: Record<string, any> = {},
  target: HTMLElement | null,
  currentTarget: HTMLElement | null
) {
  if (($event as any)._processed) {
    ;($event as any).type = detail.type || name
    return $event
  }

  // fixed 针对小程序 click（tap）事件，补充事件详情
  if (isClickEvent($event, name)) {
    const { top } = getWindowOffset()
    detail = {
      x: $event.x,
      y: $event.y - top,
    }
    normalizeClickEvent($event)
  }

  const ret = {
    _processed: true,
    type: detail.type || name,
    timeStamp: $event.timeStamp || 0,
    detail: detail,
    target: normalizeTarget(target, detail),
    currentTarget: normalizeTarget(currentTarget),
    touches: normalizeTouchList(($event as any).touches),
    changedTouches: normalizeTouchList(($event as any).changedTouches),
    preventDefault() {},
    stopPropagation() {},
  }

  if (__PLATFORM__ === 'app' && currentTarget) {
    const nid = currentTarget.getAttribute('_i')
    ;(ret as any).options = {
      nid,
    }
    // 保留原始 currentTarget 方便后续对比
    ;(ret as any).$origCurrentTarget = currentTarget
  }

  return ret
}

function normalizeClickEvent($event: MouseEvent) {
  ;($event as any).touches = ($event as any).changedTouches = [
    {
      force: 1,
      identifier: 0,
      clientX: $event.clientX,
      clientY: $event.clientY,
      pageX: $event.pageX,
      pageY: $event.pageY,
    },
  ]
}

function isClickEvent(val: unknown, name: string): val is MouseEvent {
  return name === 'click'
}

function normalizeTarget(
  target: HTMLElement | null,
  detail?: Record<string, any> | undefined
) {
  if (!target) {
    target = {} as HTMLElement
  }
  const res = {
    id: target.id,
    offsetLeft: target.offsetLeft,
    offsetTop: target.offsetTop,
    dataset: normalizeDataset(target.dataset),
  }
  if (detail) {
    extend(res, detail)
  }
  return res
}

function normalizeTouchList(touches: unknown) {
  if (touches && touches instanceof TouchList) {
    const res = []

    const { top } = getWindowOffset()

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i]
      res.push({
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY - top,
        clientX: touch.clientX,
        clientY: touch.clientY - top,
        force: touch.force || 0,
      })
    }
    return res
  }
  return []
}
