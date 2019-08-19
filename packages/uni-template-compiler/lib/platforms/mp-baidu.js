const t = require('@babel/types')

module.exports = {
  prefix: 's-',
  createScopedSlots (slotName, props, state) {
    const node = {
      type: 'slot',
      attr: {
        name: slotName
      },
      children: []
    }
    Object.keys(props).forEach(name => {
      node.attr['var-' + name] = props[name].replace('{{', '').replace('}}', '')
    })
    return node
  },
  resolveScopedSlots (slotName, {
    paramExprNode,
    returnExprNodes,
    traverseExpr,
    normalizeChildren
  }, state) {
    const node = {
      type: 'view',
      attr: {
        slot: slotName
      },
      children: normalizeChildren(traverseExpr(returnExprNodes, state))
    }
    if (t.isIdentifier(paramExprNode)) {
      node.scoped = paramExprNode.name
    }
    return node
  }
}
