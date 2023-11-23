import {
  BaseElementNode,
  DirectiveNode,
  ElementNode,
  ElementTypes,
  NodeTransform,
  NodeTypes,
  SimpleExpressionNode,
} from '@vue/compiler-core'
import { createDOMCompilerError, ErrorCodes } from '../errors'
import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'

export const transformVHtml: NodeTransform = (node, context) => {
  if ((node as BaseElementNode).tagType !== ElementTypes.ELEMENT) {
    return
  }
  // check whether bind v-html
  if ((node as BaseElementNode).props?.length) {
    ;(node as BaseElementNode).props.forEach((prop, index) => {
      if (prop.name === 'html' && prop.loc.source.startsWith('v-html=')) {
        if (
          !(prop as DirectiveNode).exp ||
          !((prop as DirectiveNode).exp as SimpleExpressionNode)?.content.trim()
        ) {
          context.onError(
            createDOMCompilerError(ErrorCodes.X_V_HTML_NO_EXPRESSION, prop.loc)
          )
        }
        if ((node as BaseElementNode).children.length) {
          context.onError(
            createDOMCompilerError(ErrorCodes.X_V_HTML_WITH_CHILDREN, prop.loc)
          )
        }
        ;(node as BaseElementNode).children = [
          createRichText(node as BaseElementNode, prop as DirectiveNode),
        ]
        ;(node as BaseElementNode).props.splice(index, 1)
      }
    })
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
