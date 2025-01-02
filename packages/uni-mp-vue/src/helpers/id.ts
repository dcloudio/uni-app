import { VIRTUAL_HOST_ID } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'

export function resolveId(id: string, ins: ComponentPublicInstance) {
  if (ins[VIRTUAL_HOST_ID] === '') {
    return id
  }
  if ('id' in ins.$.props) {
    return id
  }
  return ins[VIRTUAL_HOST_ID]
}
