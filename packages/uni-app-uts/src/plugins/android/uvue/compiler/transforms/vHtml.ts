import {
  type BaseElementNode,
  type DirectiveNode,
  type ElementNode,
  ElementTypes,
  type NodeTransform,
  NodeTypes,
} from '@vue/compiler-core'
import { ErrorCodes, createDOMCompilerError } from '../errors'
import {
  createBindDirectiveNode,
  isDirectiveNode,
  isPlainElementNode,
  isSimpleExpressionNode,
} from '@dcloudio/uni-cli-shared'

export const transformVHtml: NodeTransform = (node, context) => {
  if (!isPlainElementNode(node)) {
    return
  }
  // check whether bind v-html
  for (const [index, prop] of node.props.entries()) {
    if (isDirectiveNode(prop) && prop.name === 'html') {
      if (
        !prop.exp ||
        (isSimpleExpressionNode(prop.exp) && prop.exp.content.trim() === '')
      ) {
        context.onError(
          createDOMCompilerError(ErrorCodes.X_V_HTML_NO_EXPRESSION, prop.loc)
        )
      }
      if (node.children.length) {
        context.onError(
          createDOMCompilerError(ErrorCodes.X_V_HTML_WITH_CHILDREN, prop.loc)
        )
      }
      node.children = [createRichText(node, prop)]
      node.props.splice(index, 1)
      break
    }
  }
}

function createRichText(
  node: BaseElementNode,
  prop: DirectiveNode
): ElementNode {
  return {
    tag: 'rich-text',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.ELEMENT,
    props: [createBindDirectiveNode('nodes', prop.exp || '')],
    isSelfClosing: true,
    children: [],
    codegenNode: undefined,
    ns: node.ns,
    loc: node.loc,
  }
}
