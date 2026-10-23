import {
  type CompilerError,
  type DirectiveNode,
  type ElementNode,
  ElementTypes,
  type NodeTransform,
  NodeTypes,
  type SourceLocation,
  findDir,
} from '@vue/compiler-core'
import { createBindDirectiveNode } from '../../utils'
import { isElementNode } from '../../../vite/utils/ast'

const V_HTML_UNSUPPORTED_TAG = 'X_APP_V_HTML_UNSUPPORTED_TAG'
const V_HTML_NO_EXPRESSION = 'X_APP_V_HTML_NO_EXPRESSION'
const V_HTML_WITH_CHILDREN = 'X_APP_V_HTML_WITH_CHILDREN'

/**
 * app-x DOM2 仅支持在 view 上使用 v-html。
 * 其它标签移除指令并告警，避免继续落到 Vapor 默认的 innerHTML 语义。
 */
export const transformAppVHtml: NodeTransform = (node, context) => {
  if (!isElementNode(node)) {
    return
  }

  // allowEmpty 使没有表达式的 `v-html` 也能进入校验流程。
  const dir = findDir(node, 'html', true)
  if (!dir) {
    return
  }

  if (node.tag !== 'view' || node.tagType !== ElementTypes.ELEMENT) {
    node.props.splice(node.props.indexOf(dir), 1)
    context.onWarn(
      createCompilerWarning(
        V_HTML_UNSUPPORTED_TAG,
        `v-html is only supported on <view> in app-x, but found <${node.tag}>.`,
        node.loc
      )
    )
    return
  }

  if (
    !dir.exp ||
    (dir.exp.type === NodeTypes.SIMPLE_EXPRESSION &&
      dir.exp.content.trim() === '')
  ) {
    context.onError(
      createCompilerError(
        V_HTML_NO_EXPRESSION,
        `v-html is missing expression.`,
        dir.loc
      )
    )
  }
  if (node.children.length) {
    context.onError(
      createCompilerError(
        V_HTML_WITH_CHILDREN,
        `v-html will override element children.`,
        dir.loc
      )
    )
  }

  node.props.splice(node.props.indexOf(dir), 1)
  node.isSelfClosing = false
  node.children = [createRichText(node, dir)]
}

function createRichText(node: ElementNode, dir: DirectiveNode): ElementNode {
  return {
    tag: 'rich-text',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.COMPONENT,
    props: [createBindDirectiveNode('nodes', dir.exp || '')],
    isSelfClosing: true,
    children: [],
    codegenNode: undefined,
    ns: node.ns,
    loc: node.loc,
  }
}

function createCompilerError(
  code: string,
  message: string,
  loc: SourceLocation
): CompilerError {
  const error = new SyntaxError(message) as CompilerError
  error.code = code
  error.loc = loc
  return error
}

function createCompilerWarning(
  code: string,
  message: string,
  loc: SourceLocation
): CompilerError {
  return createCompilerError(code, message, loc)
}
