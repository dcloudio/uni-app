import {
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
  type TransformContext,
  createSimpleExpression,
  locStub,
} from '@vue/compiler-core'
import type { COMPONENT_BIND_LINK, COMPONENT_ON_LINK } from '../../mp/constants'
import { createAttributeNode, isUserComponent } from '../utils'

export function createTransformComponentLink(
  name: typeof COMPONENT_BIND_LINK | typeof COMPONENT_ON_LINK,
  type: NodeTypes.ATTRIBUTE | NodeTypes.DIRECTIVE = NodeTypes.DIRECTIVE
) {
  return function transformComponentLink(
    node: RootNode | TemplateChildNode,
    context: TransformContext
  ) {
    if (!isUserComponent(node, context)) {
      return
    }
    // 新版本的 vue，识别 template 有差异，可能认为是自定义组件
    if (node.tag === 'template') {
      return
    }
    if (type === NodeTypes.DIRECTIVE) {
      node.props.push({
        type: NodeTypes.DIRECTIVE,
        name: 'on',
        modifiers: [],
        loc: locStub,
        arg: createSimpleExpression(name, true),
        exp: createSimpleExpression('__l', true),
      })
    } else {
      node.props.push(createAttributeNode(name, '__l'))
    }
  }
}
