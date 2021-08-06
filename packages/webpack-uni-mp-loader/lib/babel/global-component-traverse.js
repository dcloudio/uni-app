const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const {
  parseComponents
} = require('./util')

const uniI18n = require('@dcloudio/uni-cli-i18n')

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
          throw new Error(uniI18n.__('mpLoader.firstParameterNeedStaticString', { "0": "Vue.component()" }))
        }
        if (!t.isIdentifier(valueNode)) {
          throw new Error(uniI18n.__('mpLoader.requireTwoParameter', { "0": "Vue.component()" }))
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
