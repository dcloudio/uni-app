const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const {
  INTERNAL_SET_MODEL,
  METHOD_CREATE_ELEMENT
} = require('../../../constants')

module.exports = {
  getModelEventFunctionExpr (funcExpr, propPath, modifiers = []) {
    let targetExpr
    let keyExpr
    babelTraverse(funcExpr, {
      noScope: true,
      CallExpression (path) {
        if (path.node.callee.name === '$set') {
          targetExpr = path.node.arguments[0]
          keyExpr = path.node.arguments[1]
        }
      }
    })

    if (!targetExpr || !keyExpr) {
      targetExpr = t.stringLiteral('')
      keyExpr = t.stringLiteral(propPath)
    }

    return t.functionExpression(
      null,
      [t.identifier('$event')],
      t.blockStatement(
        [
          t.returnStatement(
            t.callExpression(
              t.identifier(INTERNAL_SET_MODEL),
              [
                targetExpr,
                keyExpr,
                t.identifier('$event'),
                t.arrayExpression(modifiers)
              ]
            )
          )
        ]
      )
    )
  },
  isRootElement (path) {
    const result = path.findParent(path => (path.isCallExpression() && path.get('callee').isIdentifier({ name: METHOD_CREATE_ELEMENT })) || path.isReturnStatement())
    return result.isReturnStatement()
  }
}
