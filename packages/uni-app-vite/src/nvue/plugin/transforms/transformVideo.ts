import {
  createBindDirectiveNode,
  isElementNode,
} from '@dcloudio/uni-cli-shared'
import {
  type ElementNode,
  ElementTypes,
  type NodeTransform,
  NodeTypes,
  createSimpleExpression,
} from '@vue/compiler-core'

function isVideo(node: ElementNode) {
  return node.tag === 'video' || node.tag === 'u-video'
}

export const transformVideo: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  if (!isVideo(node)) {
    return
  }
  if (!node.children.length) {
    return
  }
  const firstChild = node.children[0]
  if (isElementNode(firstChild) && firstChild.tag === 'u-scalable') {
    return
  }
  node.children = [createScalable(node)]
}
function createScalable(node: ElementNode): ElementNode {
  return {
    tag: 'u-scalable',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.ELEMENT,
    props: [
      createBindDirectiveNode(
        'style',
        createSimpleExpression(
          '{position:"absolute",left:"0",right:"0",top:"0",bottom:"0"}'
        )
      ),
    ],
    isSelfClosing: true,
    children: node.children,
    codegenNode: undefined,
    ns: node.ns,
    loc: node.loc,
  }
}
