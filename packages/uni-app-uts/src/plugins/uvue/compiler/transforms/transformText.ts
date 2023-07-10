import { isElementNode } from '@dcloudio/uni-cli-shared'
import {
  CompoundExpressionNode,
  ElementNode,
  ElementTypes,
  InterpolationNode,
  NodeTypes,
  TemplateChildNode,
  TextCallNode,
  TextNode,
} from '@vue/compiler-core'
import { NodeTransform } from '../transform'

function isTextNode({ tag }: ElementNode) {
  // TODO 临时解决text节点嵌套的问题
  return (
    tag === 'text' || tag === 'button' || tag === 'radio' || tag === 'checkbox'
  )
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

    let currentContainer: ElementNode | undefined = undefined
    if (isText(child)) {
      if (!currentContainer) {
        currentContainer = children[i] = createText(node, child)
      }
      for (let j = i + 1; j < children.length; j++) {
        const next = children[j]
        if (isText(next)) {
          // 合并相邻的文本节点
          currentContainer.children.push(next)
          children.splice(j, 1)
          j--
        } else {
          currentContainer = undefined
          break
        }
      }
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
      } else if (child.type === 3) {
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
