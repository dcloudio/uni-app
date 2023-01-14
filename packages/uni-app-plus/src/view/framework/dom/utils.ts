import { JSON_PROTOCOL, WXS_PROTOCOL } from '@dcloudio/uni-shared'
import { isString } from '@vue/shared'
import type { UniCustomElement } from './components'
import type { UniComponent } from './components/UniComponent'
import { invokeWxs } from './wxs'

const JSON_PROTOCOL_LEN = JSON_PROTOCOL.length

export function decodeAttr(value: unknown, el?: UniCustomElement) {
  if (!isString(value)) {
    return value
  }
  if (value.indexOf(JSON_PROTOCOL) === 0) {
    value = JSON.parse(value.slice(JSON_PROTOCOL_LEN))
  } else if (value.indexOf(WXS_PROTOCOL) === 0) {
    value = invokeWxs(el, value)
  }
  return value
}

export function isCssVar(name: string) {
  return name.indexOf('--') === 0
}

export function isUniComponent(
  el: UniCustomElement | UniComponent
): el is UniComponent {
  // 不使用 instanceof 判断，因为需要引入 UniComponent，两者循环依赖
  return !!(el as UniComponent).addWxsEvent
}
