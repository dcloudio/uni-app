import { isElementNode } from '@dcloudio/uni-cli-shared'
import {
  CompoundExpressionNode,
  ElementNode,
  InterpolationNode,
  NodeTypes,
  TemplateChildNode,
  TextCallNode,
  TextNode,
} from '@vue/compiler-core'
import { NodeTransform } from '../transform'

function isTextNode({ tag }: ElementNode) {
  // TODO 临时解决text节点嵌套的问题
  return tag === 'text' || tag === 'button'
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

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (isTextElement(child)) {
      parseText(child as ElementNode)
    }
  }
}

/*
  1. 转换 \\n 为 \n
  2. u-text 下仅支持 slot 及 文本节点
*/
function parseText(node: ElementNode) {
  if (node.children.length) {
    let firstTextChild
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      const content = (child as TextNode).content
      if (isText(child) && typeof content === 'string') {
        if (!firstTextChild) {
          firstTextChild = child
          ;(firstTextChild as TextNode).content = translateObliqueLine(content)
        } else {
          ;(firstTextChild as TextNode).content += translateObliqueLine(content)
          node.children.splice(i, 1)
          i--
        }
      } else if (child.type === 3) {
        node.children.splice(i, 1)
        i--
      } else {
        firstTextChild = null
      }
    }
  }
}

function translateObliqueLine(content: string): string {
  const strFragments = content.split('\\n')
  return strFragments
    .map((str, index) => {
      if (index === strFragments.length - 1) return str
      str += '\\n'
      if (!(str.split('\\').length % 2)) {
        str = str.replaceAll(/\\n/g, '\n')
      }
      return str.replaceAll(/\\\\/g, '\\')
    })
    .join('')
}
