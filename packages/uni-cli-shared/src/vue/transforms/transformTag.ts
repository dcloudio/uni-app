import { ElementTypes, type NodeTransform } from '@vue/compiler-core'
import { isElementNode } from '../../vite/utils/ast'

export function createTransformTag(
  opts: Record<string, string>
): NodeTransform {
  return function transformTag(node, context) {
    if (!isElementNode(node)) {
      return
    }
    const oldTag = node.tag
    const newTag = opts[oldTag]
    if (!newTag) {
      return
    }
    // TODO: 临时 dom2 硬编码处理 tagType，待后续优化
    if (process.env.UNI_APP_X_DOM2 === 'true' && oldTag === 'cover-view') {
      node.tagType = ElementTypes.ELEMENT
    }
    node.tag = newTag
  }
}
