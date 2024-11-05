import type { RootNode, TemplateChildNode } from '@vue/compiler-core'
import { isElementNode } from '../../../vite'
import { createAttributeNode } from '../../../vue/utils'

export function transformCanvas(node: RootNode | TemplateChildNode) {
  if (!isElementNode(node)) {
    return
  }
  if (node.tag === 'canvas') {
    if (node.props.some((item) => item.name === 'type')) {
      return
    }
    node.props.push(createAttributeNode('type', '2d'))
  }
}
