import {
  createBindDirectiveNode,
  isElementNode,
} from '@dcloudio/uni-cli-shared'
import {
  type DirectiveNode,
  type ElementNode,
  ElementTypes,
  NodeTypes,
  type PlainElementNode,
  findDir,
} from '@vue/compiler-core'
import type { NodeTransform } from '../transform'

export const transformHtml: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  const dir = findDir(node, 'html')
  if (!dir) {
    return
  }
  // remove v-html
  node.props.splice(node.props.indexOf(dir), 1)
  if (node.tagType !== ElementTypes.ELEMENT) {
    return
  }
  node.isSelfClosing = false
  node.children = [createRichText(node, dir)]
}

function createRichText(
  node: PlainElementNode,
  dir: DirectiveNode
): ElementNode {
  return {
    tag: 'rich-text',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.ELEMENT,
    props: [createBindDirectiveNode('nodes', dir.exp || '')],
    isSelfClosing: true,
    children: [],
    codegenNode: undefined,
    ns: node.ns,
    loc: node.loc,
  }
}
