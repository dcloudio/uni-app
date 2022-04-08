const path = require('path')
const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default
const {
  parseComponents
} = require('./util')

const uniI18n = require('@dcloudio/uni-cli-i18n')

module.exports = function (ast, state = {}) {
  const imports = []
  let nodePath = false
  try {
    babelTraverse(ast, {
      CallExpression (path) {
        const callee = path.node.callee
        if (!callee.object || !callee.property) {
          return
        }
        const objectName = callee.object.name
        const propertyName = callee.property.name
        if (
          propertyName === 'component' &&
          (objectName === 'Vue' || objectName === 'app')
        ) {
          const args = path.node.arguments
          const nameNode = args[0]
          const valueNode = args[1]
          nodePath = path
          if (!t.isStringLiteral(nameNode)) {
            throw new Error(
              uniI18n.__('mpLoader.firstParameterNeedStaticString', {
                0: objectName + '.component()'
              })
            )
          }
          if (!t.isIdentifier(valueNode)) {
            throw new Error(
              uniI18n.__('mpLoader.requireTwoParameter', {
                0: objectName + '.component()'
              })
            )
          }
          imports.push({
            name: nameNode.value,
            value: valueNode.name
          })
        }
      }
    })
    if (imports.length) {
      state.components = parseComponents(imports, nodePath)
    } else {
      state.components = []
    }
  } catch (e) {
    if (state.filename) {
      console.error('at ' + require('@dcloudio/uni-cli-shared').normalizePath(path.relative(process.env.UNI_INPUT_DIR, state.filename)) + ':1')
    }
    throw e
  }
  return {
    ast,
    state
  }
}
