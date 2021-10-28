import {
  genExpr,
  findProp,
  isForElementNode,
  DirectiveNode,
  NodeTransform,
} from '@dcloudio/uni-mp-compiler'

export const transformFor: NodeTransform = (node) => {
  if (!isForElementNode(node)) {
    return
  }
  const keyProp = findProp(node, 'key', true)
  if (keyProp) {
    const { exp } = keyProp as DirectiveNode
    if (exp) {
      const key = genExpr(exp)
      node.vFor.sourceCode = `${node.vFor.sourceAlias} trackBy ${key}`
      node.props.splice(node.props.indexOf(keyProp), 1)
    }
  }
}
