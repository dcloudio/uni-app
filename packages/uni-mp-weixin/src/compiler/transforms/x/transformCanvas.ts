import { isElementNode } from '@dcloudio/uni-cli-shared'
import {
  type AttributeNode,
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
  type TransformContext,
  locStub,
} from '@vue/compiler-core'

export function transformCanvas(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (!isElementNode(node)) {
    return
  }
  if (node.tag === 'canvas') {
    if (node.props.some((item) => item.name === 'type')) {
      return
    }
    const type2DProp: AttributeNode = {
      type: NodeTypes.ATTRIBUTE,
      name: 'type',
      value: {
        type: NodeTypes.TEXT,
        content: '2d',
        loc: locStub,
      },
      loc: locStub,
      nameLoc: locStub,
    }
    node.props.push(type2DProp)
  }
}
