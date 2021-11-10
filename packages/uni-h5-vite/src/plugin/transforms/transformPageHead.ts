import { NodeTransform, ElementNode, ElementTypes } from '@vue/compiler-core'
import { checkElementNodeTag } from '@dcloudio/uni-cli-shared'

export const transformPageHead: NodeTransform = (node, context) => {
  // 发现是page-meta下的head，替换为page-meta-head
  checkElementNodeTag(node, 'head') &&
    checkElementNodeTag(context.parent, 'page-meta') &&
    (((node as ElementNode).tag = 'page-meta-head'),
    ((node as ElementNode).tagType = ElementTypes.COMPONENT))
}
