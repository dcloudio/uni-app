import { JSON_PROTOCOL } from '@dcloudio/uni-shared'
import { isString } from '@vue/shared'

const JSON_PROTOCOL_LEN = JSON_PROTOCOL.length

export function decodeAttr(value: unknown) {
  if (isString(value) && value.indexOf(JSON_PROTOCOL) === 0) {
    value = JSON.parse(value.substr(JSON_PROTOCOL_LEN))
  }
  return value
}
