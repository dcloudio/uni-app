const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const {
  parseComponents
} = require('./util')

function handleObjectExpression (declaration, path, state) {
  if (state.options) { // name,inheritAttrs
    Object.keys(state.options).forEach(name => {
      const optionProperty = declaration.properties.filter(prop => {
        return t.isObjectProperty(prop) &&
          t.isIdentifier(prop.key) &&
          prop.key.name === name
      })[0]
      if (optionProperty) {
        if (t.isStringLiteral(optionProperty.value)) {
          state.options[name] = JSON.stringify(optionProperty.value.value)
        } else {
          state.options[name] = optionProperty.value.value
        }
      }
    })
  }

  const componentsProperty = declaration.properties.filter(prop => {
    return t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key) &&
      prop.key.name === 'components'
  })[0]

  if (componentsProperty && t.isObjectExpression(componentsProperty.value)) {
    handleComponentsObjectExpression(componentsProperty.value, path, state)
  }
}

function handleComponentsObjectExpression (componentsObjExpr, path, state) {
  const properties = componentsObjExpr.properties
    .filter(prop => t.isObjectProperty(prop) && t.isIdentifier(prop.value))
  state.components = parseComponents(properties.map(prop => {
    return {
      name: prop.key.name || prop.key.value,
      value: prop.value.name
    }
  }), path.scope.bindings, path)
}

module.exports = function (ast, state = {
  type: 'Component',
  components: [],
  options: {}
}) {
  babelTraverse(ast, {
    AssignmentExpression (path) {
      const leftExpression = path.node.left
      const rightExpression = path.node.right

      if ( // global['__wxVueOptions'] = {'van-button':VanButton}
        t.isMemberExpression(leftExpression) &&
        t.isObjectExpression(rightExpression) &&
        leftExpression.object.name === 'global' &&
        leftExpression.property.value === '__wxVueOptions'
      ) {
        handleObjectExpression(rightExpression, path, state)
      }

      if ( // exports.default.components = Object.assign({'van-button': VanButton}, exports.default.components || {})
        t.isMemberExpression(leftExpression) &&
        t.isCallExpression(rightExpression) &&
        leftExpression.property.name === 'components' &&
        t.isMemberExpression(leftExpression.object) &&
        leftExpression.object.object.name === 'exports' &&
        leftExpression.object.property.name === 'default' &&
        rightExpression.arguments.length === 2 &&
        t.isObjectExpression(rightExpression.arguments[0])
      ) {
        handleComponentsObjectExpression(rightExpression.arguments[0], path, state)
      }
    },
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
