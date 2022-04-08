const path = require('path')
const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default
const {
  parseComponents
} = require('./util')

function handleObjectExpression (declaration, path, state) {
  if (state.options) { // name,inheritAttrs,props
    Object.keys(state.options).forEach(name => {
      const optionProperty = declaration.properties.filter(prop => {
        return t.isObjectProperty(prop) &&
          t.isIdentifier(prop.key) &&
          prop.key.name === name
      })[0]
      if (optionProperty) {
        if (name === 'props') {
          if (t.isArrayExpression(optionProperty.value)) {
            state.options[name] = JSON.stringify(optionProperty.value.elements.filter(element => t.isStringLiteral(
              element)).map(({
              value
            }) => value))
          } else if (t.isObjectExpression(optionProperty.value)) {
            const props = []
            optionProperty.value.properties.forEach(({
              key
            }) => {
              if (t.isIdentifier(key)) {
                props.push(key.name)
              } else if (t.isStringLiteral(key)) {
                props.push(key.value)
              }
            })
            state.options[name] = JSON.stringify(props)
          }
        } else if (t.isStringLiteral(optionProperty.value)) {
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

function handleComponentsObjectExpression (componentsObjExpr, path, state, prepend) {
  const properties = componentsObjExpr.properties
    .filter(prop => t.isObjectProperty(prop) && t.isIdentifier(prop.value))
  const components = parseComponents(properties.map(prop => {
    return {
      name: prop.key.name || prop.key.value,
      value: prop.value.name
    }
  }), path)
  state.components = prepend ? components.concat(state.components) : components
}

function handleIdentifier ({
  name
}, path, state) {
  // 仅做有限查找
  for (let i = path.container.length; i > 0; i--) {
    const node = path.container[i - 1]
    let declarations = []
    if (t.isExpressionStatement(node)) {
      declarations = [node]
    } else if (t.isVariableDeclaration(node)) {
      declarations = node.declarations
    }
    for (let i = declarations.length; i > 0; i--) {
      let declaration = declarations[i - 1]
      let identifier
      if (t.isVariableDeclarator(declaration)) {
        identifier = declaration.id
        declaration = declaration.init
      } else if (t.isExpressionStatement(declaration)) {
        identifier = declaration.expression.left
        declaration = declaration.expression.right
      }
      if (identifier.name === name) {
        if (t.isCallExpression(declaration) &&
          t.isMemberExpression(declaration.callee) &&
          declaration.arguments.length === 1) {
          declaration = declaration.arguments[0]
        }
        if (t.isObjectExpression(declaration)) {
          handleObjectExpression(declaration, path, state)
        }
        return
      }
    }
  }
}

module.exports = function (ast, state = {
  type: 'Component',
  components: [],
  options: {}
}) {
  try {
    babelTraverse(ast, {
      CallExpression (path) {
        const callee = path.node.callee
        const args = path.node.arguments
        const objExpr = args[0]
        if (
          t.isIdentifier(callee) &&
          callee.name === 'defineComponent' &&
          args.length === 1 &&
          t.isObjectExpression(objExpr)
        ) {
          handleObjectExpression(objExpr, path, state)
        }
      },
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
          handleComponentsObjectExpression(rightExpression.arguments[0], path, state, true)
        }
      },
      ExportDefaultDeclaration (path) {
        const declaration = path.node.declaration
        if (t.isObjectExpression(declaration)) { // export default {components:{}}
          handleObjectExpression(declaration, path, state)
        } else if (t.isIdentifier(declaration)) {
          handleIdentifier(declaration, path, state)
        } else if (t.isCallExpression(declaration) &&
          t.isMemberExpression(declaration.callee) &&
          declaration.arguments.length === 1) { // export default Vue.extend({components:{}})
          if (declaration.callee.object.name === 'Vue' && declaration.callee.property.name ===
            'extend') {
            const argument = declaration.arguments[0]
            if (t.isObjectExpression(argument)) {
              handleObjectExpression(argument, path, state)
            } else if (t.isIdentifier(argument)) {
              handleIdentifier(argument, path, state)
            }
          }
        } else if (t.isClassDeclaration(declaration) &&
          declaration.decorators &&
          declaration.decorators.length
        ) { // export default @Component({components:{}}) class MyComponent extend Vue
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
