import { JSON_PROTOCOL, WXS_PROTOCOL } from '@dcloudio/uni-shared'
import { isString } from '@vue/shared'
import { UniCustomElement } from './components'
import { invokeWxs } from './wxs'

const JSON_PROTOCOL_LEN = JSON_PROTOCOL.length

export function decodeAttr(el: UniCustomElement, value: unknown) {
  if (!isString(value)) {
    return value
  }
  if (value.indexOf(JSON_PROTOCOL) === 0) {
    value = JSON.parse(value.substr(JSON_PROTOCOL_LEN))
  } else if (value.indexOf(WXS_PROTOCOL) === 0) {
    value = invokeWxs(el, value)
  }
  return value
}

export function isCssVar(name: string) {
  return name.indexOf('--') === 0
}
