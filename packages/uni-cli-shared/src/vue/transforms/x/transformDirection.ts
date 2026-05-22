import {
  isAttributeNode,
  isCompoundExpressionNode,
  isElementNode,
  isSimpleExpressionNode,
} from '../../../vite'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isPropNameEquals,
} from '../../utils'
import {
  type CompoundExpressionNode,
  type ExpressionNode,
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
  type TransformContext,
} from '@vue/compiler-core'
import { isString, isSymbol } from '@vue/shared'

/**
 * 将direction属性转化为scroll-x和scroll-y
 * 注意transformMPBuiltInTag内会讲list-view转化为scroll-view，所以此transform应该在transformMPBuiltInTag之后执行
 */
export const transformDirection = function (
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (!isElementNode(node)) {
    return
  }
  if (node.tag !== 'scroll-view') {
    return
  }
  const directionPropIndex = node.props.findIndex((prop) =>
    isPropNameEquals(prop, 'direction')
  )
  const scrollXPropIndex = node.props.findIndex((prop) =>
    isPropNameEquals(prop, 'scrollX')
  )
  const scrollYPropIndex = node.props.findIndex((prop) =>
    isPropNameEquals(prop, 'scrollY')
  )
  if (scrollXPropIndex > -1 || scrollYPropIndex > -1) {
    return
  }
  if (
    directionPropIndex === -1 ||
    (scrollXPropIndex !== -1 && scrollYPropIndex !== -1)
  ) {
    node.props.push(createAttributeNode('scroll-y', 'true'))
    return
  }
  const directionProp = node.props[directionPropIndex]
  if (isAttributeNode(directionProp)) {
    const directionValue = directionProp.value?.content
    const scrollX = directionValue === 'horizontal' || directionValue === 'all'
    const scrollY =
      !directionValue ||
      directionValue === 'vertical' ||
      directionValue === 'all'
    node.props.splice(directionPropIndex, 1)
    scrollX && node.props.push(createAttributeNode('scroll-x', '' + scrollX))
    scrollY && node.props.push(createAttributeNode('scroll-y', '' + scrollY))
  } else if (directionProp.type === NodeTypes.DIRECTIVE) {
    if (
      !directionProp.arg ||
      !isSimpleExpressionNode(directionProp.arg) ||
      !directionProp.exp ||
      !(
        isSimpleExpressionNode(directionProp.exp) ||
        isCompoundExpressionNode(directionProp.exp)
      )
    ) {
      return
    }
    const exp = stringifyExpression(directionProp.exp)
    if (!exp) {
      return
    }
    const scrollX = `(${exp}) === 'horizontal' || (${exp}) === 'all'`
    const scrollY = `!(${exp}) || (${exp}) === 'vertical' || (${exp}) === 'all'`
    node.props.splice(directionPropIndex, 1)
    node.props.push(createBindDirectiveNode('scroll-x', scrollX))
    node.props.push(createBindDirectiveNode('scroll-y', scrollY))
  }
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
