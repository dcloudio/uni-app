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

export function addComponentBindLink(
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
      arg: createSimpleExpression('__l', true),
      exp: createSimpleExpression('__l', true),
    })
  }
}
