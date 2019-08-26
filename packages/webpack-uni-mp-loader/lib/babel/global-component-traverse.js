const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const {
  parseComponents
} = require('./util')

module.exports = function (ast, state = {}) {
  const imports = []
  let bindings = false
  let parentPath = false
  babelTraverse(ast, {
    CallExpression (path) {
      const callee = path.node.callee
      if (!callee.object || !callee.property) {
        return
      }
      if (callee.object.name === 'Vue' && callee.property.name === 'component') {
        parentPath = path.parentPath
        bindings = path.scope.bindings
        const args = path.node.arguments
        const nameNode = args[0]
        const valueNode = args[1]
        if (!t.isStringLiteral(nameNode)) {
          throw new Error('Vue.component()的第一个参数必须为静态字符串')
        }
        if (!t.isIdentifier(valueNode)) {
          throw new Error('Vue.component()需要两个参数')
        }
        imports.push({
          name: nameNode.value,
          value: valueNode.name
        })
      }
    }
  })
  if (imports.length) {
    state.components = parseComponents(imports, bindings, parentPath)
  } else {
    state.components = []
  }
  return {
    ast,
    state
  }
}
