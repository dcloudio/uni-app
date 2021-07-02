import { decodeTag } from '@dcloudio/uni-shared'
import { createElement } from './utils'

export function onNodeCreate(id: number, tag: string | number) {
  return createElement(id, decodeTag(tag))
}
