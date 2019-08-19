const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const {
  parseComponents
} = require('./util')

function handleObjectExpression (declaration, path, state) {
  const componentsProperty = declaration.properties.filter(prop => {
    return t.isObjectProperty(prop) &&
            t.isIdentifier(prop.key) &&
            prop.key.name === 'components'
  })[0]

  if (componentsProperty && t.isObjectExpression(componentsProperty.value)) {
    const properties = componentsProperty.value.properties
      .filter(prop => t.isObjectProperty(prop) && t.isIdentifier(prop.value))

    state.components = parseComponents(properties.map(prop => {
      return {
        name: prop.key.name || prop.key.value,
        value: prop.value.name
      }
    }), path.scope.bindings, path)
  }
}

module.exports = function (ast, state = {
  type: 'Component',
  components: []
}) {
  babelTraverse(ast, {
    ExportDefaultDeclaration (path) {
      const declaration = path.node.declaration
      if (t.isObjectExpression(declaration)) { // export default {components:{}}
        handleObjectExpression(declaration, path, state)
      } else if (t.isCallExpression(declaration) &&
                t.isMemberExpression(declaration.callee) &&
                declaration.arguments.length === 1) { // export default Vue.extend({components:{}})
        if (declaration.callee.object.name === 'Vue' && declaration.callee.property.name ===
                    'extend') {
          handleObjectExpression(declaration.arguments[0], path, state)
        }
      } else if (t.isClassDeclaration(declaration) &&
                declaration.decorators &&
                declaration.decorators.length) { // export default @Component({components:{}}) class MyComponent extend Vue
        const componentDecorator = declaration.decorators[0]
        if (t.isCallExpression(componentDecorator.expression)) {
          const args = componentDecorator.expression.arguments
          if (args && args.length && t.isObjectExpression(args[0])) {
            handleObjectExpression(args[0], path, state)
          }
        }
      }
    }
  })
  return {
    ast,
    state
  }
}
