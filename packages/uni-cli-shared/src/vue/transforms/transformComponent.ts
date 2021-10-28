import {
  createSimpleExpression,
  locStub,
  NodeTypes,
  RootNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'
import { COMPONENT_BIND_LINK, COMPONENT_ON_LINK } from '../../mp/constants'
import { isUserComponent } from '../utils'

export function createTransformComponentLink(
  name: typeof COMPONENT_BIND_LINK | typeof COMPONENT_ON_LINK
) {
  return function transformComponentLink(
    node: RootNode | TemplateChildNode,
    context: TransformContext
  ) {
    if (!isUserComponent(node, context)) {
      return
    }
    node.props.push({
      type: NodeTypes.DIRECTIVE,
      name: 'on',
      modifiers: [],
      loc: locStub,
      arg: createSimpleExpression(name, true),
      exp: createSimpleExpression('__l', true),
    })
  }
}
