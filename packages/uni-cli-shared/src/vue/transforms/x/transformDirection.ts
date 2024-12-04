import { isElementNode } from '../../../vite'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isPropNameEquals,
} from '../../utils'
import {
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
  type TransformContext,
} from '@vue/compiler-core'

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
  if (directionProp.type === NodeTypes.ATTRIBUTE) {
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
      directionProp.arg.type !== NodeTypes.SIMPLE_EXPRESSION ||
      !directionProp.exp ||
      directionProp.exp.type !== NodeTypes.SIMPLE_EXPRESSION
    ) {
      return
    }
    const exp = directionProp.exp.content
    const scrollX = `(${exp}) === 'horizontal' || (${exp}) === 'all'`
    const scrollY = `!(${exp}) || (${exp}) === 'vertical' || (${exp}) === 'all'`
    node.props.splice(directionPropIndex, 1)
    node.props.push(createBindDirectiveNode('scroll-x', scrollX))
    node.props.push(createBindDirectiveNode('scroll-y', scrollY))
  }
}
