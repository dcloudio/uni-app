import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'
import {
  AttributeNode,
  createSimpleExpression,
  DirectiveNode,
  ElementNode,
  ElementTypes,
  locStub,
  NodeTransform,
  NodeTypes,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-core'
const SCROLLER_COMPONENTS = [
  'list',
  'scroller',
  'scroll-view',
  'waterfall',
  'recycle-list',
]
export const transformRootNode: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ROOT || !context.bindingMetadata.__pageOptions) {
    return
  }
  const { disableScroll, scrollIndicator } = context.bindingMetadata
    .__pageOptions as {
    disableScroll?: boolean
    scrollIndicator?: 'none'
  }
  // 禁用滚动，或已包含滚动元素
  if (disableScroll || hasScrollerElement(node)) {
    return wrapperByView(node)
  }
  return wrapperByScrollView(node, { scrollIndicator })
}

function hasScrollerElement(node: RootNode) {
  return node.children.some((child) => {
    if (child.type === NodeTypes.ELEMENT) {
      return SCROLLER_COMPONENTS.includes(child.tag)
    }
  })
}

function wrapperByScrollView(
  node: RootNode,
  { scrollIndicator }: { scrollIndicator?: 'none' }
) {
  node.children = [
    createElement(
      'scroll-view',
      createScrollViewProps({ scrollIndicator }),
      node.children
    ),
  ]
}

const trueExpr = createSimpleExpression('true')
const falseExpr = createSimpleExpression('false')
function createScrollViewProps({
  scrollIndicator,
}: {
  scrollIndicator?: 'none'
}) {
  return [
    createBindDirectiveNode('scrollY', trueExpr),
    createBindDirectiveNode(
      'showScrollbar',
      scrollIndicator === 'none' ? falseExpr : trueExpr
    ),
    createBindDirectiveNode('enableBackToTop', trueExpr),
    createBindDirectiveNode('bubble', trueExpr),
    createBindDirectiveNode('style', `{flexDirection:'column'}`),
  ]
}

/**
 * 目前暂不支持多节点，故发现多节点时，自动补充一个 view 根节点
 * @param node
 */
function wrapperByView(node: RootNode) {
  if (node.children.length > 1) {
    node.children = [createElement('view', [], node.children)]
  }
}

function createElement(
  tag: string,
  props: (AttributeNode | DirectiveNode)[],
  children: TemplateChildNode[]
): ElementNode {
  return {
    type: NodeTypes.ELEMENT,
    ns: 0,
    tag,
    isSelfClosing: false,
    props,
    children,
    tagType: ElementTypes.ELEMENT,
    codegenNode: undefined,
    loc: locStub,
  }
}
