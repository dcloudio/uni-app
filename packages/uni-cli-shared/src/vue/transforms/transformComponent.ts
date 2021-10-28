import { isComponentTag } from '@dcloudio/uni-shared'
import {
  createSimpleExpression,
  ElementTypes,
  isCoreComponent,
  locStub,
  NodeTypes,
  RootNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'
import { COMPONENT_BIND_LINK, COMPONENT_ON_LINK } from '../../mp/constants'

export function createTransformComponentLink(
  name: typeof COMPONENT_BIND_LINK | typeof COMPONENT_ON_LINK
) {
  return function transformComponentLink(
    node: RootNode | TemplateChildNode,
    context: TransformContext
  ) {
    if (
      node.type === NodeTypes.ELEMENT &&
      node.tagType === ElementTypes.COMPONENT
    ) {
      const { tag } = node
      if (
        isComponentTag(tag) ||
        isCoreComponent(tag) ||
        context.isBuiltInComponent(tag)
      ) {
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
}
