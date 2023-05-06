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

function isTextElement(node: TemplateChildNode) {
  return node.type === NodeTypes.ELEMENT && node.tag === 'text'
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

export const transformViewText: NodeTransform = (node, _) => {
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
    if (isTextElement(child)) {
      parseText(child as ElementNode)
    }

    if (isText(child)) {
      children.splice(index, 1, createText(node, child))
    }
  })
}

/*
  1. 转换 \\n 为 \n
  2. u-text 下只能有一个文本节点（不支持 children），需要移除子组件并合并文本
*/
function parseText(node: ElementNode) {
  if (node.children.length) {
    let firstTextChild
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      if (isText(child) && typeof (child as TextNode).content === 'string') {
        if (!firstTextChild) {
          firstTextChild = child
          ;(firstTextChild as TextNode).content = (
            firstTextChild as TextNode
          ).content.replace(/\\n/g, '\n')
        } else {
          ;(firstTextChild as TextNode).content += (
            child as TextNode
          ).content.replace(/\\n/g, '\n')
          node.children.splice(i, 1)
          i--
        }
      } else if (child.type === 1 || child.type === 3) {
        node.children.splice(i, 1)
        i--
      } else {
        firstTextChild = null
      }
    }
  }
}

function createText(
  parent: ElementNode,
  node: TextNode | TextCallNode | InterpolationNode | CompoundExpressionNode
): ElementNode {
  return {
    tag: 'text',
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
