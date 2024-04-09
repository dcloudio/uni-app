import {
  type DirectiveNode,
  type NodeTransform,
  findProp,
  isForElementNode,
  rewriteExpression,
} from '@dcloudio/uni-mp-compiler'

export const transformFor: NodeTransform = (node, context) => {
  if (!isForElementNode(node)) {
    return
  }
  const { vFor, props } = node
  let sourceCode = vFor.valueAlias + ' in ' + vFor.sourceAlias
  const keyProp = findProp(node, 'key', true)
  if (keyProp) {
    const { exp } = keyProp as DirectiveNode
    if (exp) {
      const key = rewriteExpression(exp, context).content
      sourceCode = sourceCode + ' trackBy ' + key
      props.splice(props.indexOf(keyProp), 1)
    }
  }
  vFor.valueAlias = ''
  vFor.sourceCode = sourceCode
}
