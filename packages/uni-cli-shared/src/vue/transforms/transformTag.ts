import type { NodeTransform } from '@vue/compiler-core'
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
    node.tag = newTag
  }
}
