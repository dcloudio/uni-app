import { isElementNode } from '@dcloudio/uni-cli-shared'
import {
  CompoundExpressionNode,
  ElementNode,
  ElementTypes,
  InterpolationNode,
  NodeTransform,
  NodeTypes,
  TemplateChildNode,
  TextCallNode,
  TextNode,
} from '@vue/compiler-core'

function isTextNode({ tag }: ElementNode) {
  return tag === 'text' || tag === 'u-text' || tag === 'button'
}

function isText(
  node: TemplateChildNode
): node is
  | TextNode
  | TextCallNode
  | InterpolationNode
  | CompoundExpressionNode {
  const { type } = node
  return (
    type === NodeTypes.TEXT ||
    type === NodeTypes.TEXT_CALL ||
    type === NodeTypes.INTERPOLATION ||
    type === NodeTypes.COMPOUND_EXPRESSION
  )
}

export const transformText: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  if (isTextNode(node)) {
    return
  }
  const { children } = node
  if (!children.length) {
    return
  }
  children.forEach((child, index) => {
    if (isText(child)) {
      children.splice(index, 1, createText(node, child))
    }
  })
}

function createText(
  parent: ElementNode,
  node: TextNode | TextCallNode | InterpolationNode | CompoundExpressionNode
): ElementNode {
  return {
    tag: 'u-text',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.ELEMENT,
    props: [],
    isSelfClosing: false,
    children: [node],
    codegenNode: undefined,
    ns: parent.ns,
    loc: node.loc,
  }
}
