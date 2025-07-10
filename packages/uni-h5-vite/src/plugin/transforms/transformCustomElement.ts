import { type NodeTransform, NodeTypes } from '@vue/compiler-core'
import { UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS } from '@dcloudio/uni-shared'

export const transformCustomElement: NodeTransform = (node, context) => {
  if (
    !!node &&
    node.type === NodeTypes.ELEMENT &&
    UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS.includes(node.tag)
  ) {
    node.tag = `$UniCustomElement$${node.tag}`
  }
}
