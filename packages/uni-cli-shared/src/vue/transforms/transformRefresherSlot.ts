import {
  DirectiveNode,
  RootNode,
  TemplateChildNode,
  locStub,
  ConstantTypes,
  ElementTypes,
  NodeTypes,
  ElementNode,
} from '@vue/compiler-core'
import { isElementNode, isAttributeNode } from '../../vite/utils/ast'

/**
 * 将scroll-view、list-view内的<view slot="refresher">转为vue支持的用法，此transform需要再较早时机执行，暂时放在transformTag前。此时node.tag还没有加上v-uni-前缀
 * @param node
 * @param context
 * @returns
 */
export function transformRefresherSlot(node: RootNode | TemplateChildNode) {
  if (!isElementNode(node)) {
    return
  }
  if (node.tag !== 'scroll-view' && node.tag !== 'list-view') {
    return
  }
  let refresher: ElementNode | null = null,
    refresherIndex = -1
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]
    if (!isElementNode(child)) {
      continue
    }
    if (
      child.props.find(
        (prop) =>
          isAttributeNode(prop) &&
          prop.name === 'slot' &&
          prop.value?.content === 'refresher'
      )
    ) {
      refresher = child
      refresherIndex = i
      break
    }
  }
  if (!refresher) {
    return
  }
  node.children.splice(refresherIndex, 1, {
    type: NodeTypes.ELEMENT,
    tag: 'template',
    tagType: ElementTypes.TEMPLATE,
    props: [
      {
        type: NodeTypes.DIRECTIVE,
        name: 'slot',
        loc: locStub,
        arg: {
          loc: locStub,
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: 'refresher',
          isStatic: true,
          constType: ConstantTypes.CAN_STRINGIFY,
        },
      } as DirectiveNode,
    ],
    children: [refresher],
    loc: locStub,
  } as TemplateChildNode)
}
