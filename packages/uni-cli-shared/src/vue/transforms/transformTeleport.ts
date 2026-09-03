import { createAttributeNode, createBindDirectiveNode } from '../utils'
import {
  isAttributeNode,
  isCompoundExpressionNode,
  isDirectiveNode,
  isElementNode,
  isSimpleExpressionNode,
} from '../../vite'
import {
  type CompoundExpressionNode,
  ElementTypes,
  type ExpressionNode,
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
  createSimpleExpression,
  findProp,
  locStub,
} from '@vue/compiler-core'
import { isString, isSymbol } from '@vue/shared'

export const transformTeleport = function (node: RootNode | TemplateChildNode) {
  if (!isElementNode(node)) {
    return
  }
  if (node.tag.toLowerCase() !== 'teleport') {
    return
  }

  node.tag = 'root-portal'
  node.tagType = ElementTypes.ELEMENT

  const disabledProp = findProp(node, 'disabled', false, true)
  if (disabledProp) {
    // transform `disabled` prop to `enable` prop with inverse value
    if (isAttributeNode(disabledProp)) {
      const disabledPropIndex = node.props.indexOf(disabledProp)
      node.props.splice(
        disabledPropIndex,
        1,
        createBindDirectiveNode(
          'enable',
          createSimpleExpression('false', false)
        )
      )
    } else if (isDirectiveNode(disabledProp)) {
      disabledProp.arg = createSimpleExpression('enable', true)
      disabledProp.exp = createEnableExpression(disabledProp.exp)
    }
  }

  const toProp = findProp(node, 'to')
  if (toProp) {
    // delete `to` prop since it is not supported in mini program
    node.props.splice(node.props.indexOf(toProp), 1)
  }

  const deferProp = findProp(node, 'defer', false, true)
  if (deferProp) {
    // delete `defer` prop since it is not supported in mini program
    node.props.splice(node.props.indexOf(deferProp), 1)
  }

  if (
    process.env.UNI_PLATFORM === 'mp-alipay' &&
    process.env.UNI_APP_X === 'true' &&
    node.children.length
  ) {
    node.children = [
      {
        type: NodeTypes.ELEMENT,
        tag: 'view',
        tagType: ElementTypes.ELEMENT,
        props: [createAttributeNode('class', 'a-page')],
        children: node.children,
        loc: locStub,
      } as TemplateChildNode,
    ]
  }
}

function createEnableExpression(exp?: ExpressionNode) {
  const content = exp && stringifyExpression(exp)
  return createSimpleExpression(content ? `!(${content})` : 'true', false)
}

type CompoundExpressionChild = Exclude<
  CompoundExpressionNode['children'][number],
  string | symbol
>

function stringifyExpression(
  exp: ExpressionNode | CompoundExpressionChild
): string | undefined {
  if (isSimpleExpressionNode(exp)) {
    return exp.content
  }
  if (isCompoundExpressionNode(exp)) {
    const children: string[] = []
    for (const child of exp.children) {
      if (isString(child)) {
        children.push(child)
      } else if (isSymbol(child)) {
        return
      } else {
        const content = stringifyExpression(child)
        if (content === undefined) {
          return
        }
        children.push(content)
      }
    }
    return children.join('')
  }
}
