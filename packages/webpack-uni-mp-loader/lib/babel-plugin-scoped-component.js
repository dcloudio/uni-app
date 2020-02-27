const hyphenateRE = /\B([A-Z])/g

function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const hyphenate = cached((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

module.exports = function ({
  types: t
}) {
  return {
    visitor: {
      ExportDefaultDeclaration (path) {
        const declaration = path.node.declaration
        // export default {components:{}}
        if (t.isObjectExpression(declaration)) {
          handleObjectExpression(declaration, path)
        }
        // export default Vue.extend({components:{}})
        if (t.isCallExpression(declaration) && t.isMemberExpression(declaration.callee) && declaration.arguments
          .length === 1) {
          if (declaration.callee.object.name === 'Vue' && declaration.callee.property.name === 'extend') {
            handleObjectExpression(declaration.arguments[0], path)
          }
        }
        // export default @Component({components:{}}) class MyComponent extend Vue
        if (t.isClassDeclaration(declaration) && declaration.decorators && declaration.decorators.length) {
          const componentDecorator = declaration.decorators[0]
          if (t.isCallExpression(componentDecorator.expression)) {
            const args = componentDecorator.expression.arguments
            if (args && args.length && t.isObjectExpression(args[0])) {
              handleObjectExpression(args[0], path)
            }
          }
        }
      }
    }
  }

  function handleObjectExpression (declaration, path) {
    const componentsProperty = declaration.properties.filter(prop => {
      return t.isObjectProperty(prop) && t.isIdentifier(prop.key) &&
                prop.key.name === 'components'
    })[0]

    if (componentsProperty && t.isObjectExpression(componentsProperty.value)) {
      const properties = componentsProperty.value.properties
        .filter(prop => t.isObjectProperty(prop) && t.isIdentifier(prop.value))

      const components = {}

      properties.forEach(prop => {
        // prop.key maybe Identifier or StringLiteral
        // Identifier use name, StringLiteral use value
        const key = prop.key.name || prop.key.value
        const value = prop.value.name
        const source = findSource(value, path.scope.bindings)
        if (!source) {
          throw new Error(`组件 ${key} 引用错误`)
        }
        const lib = (process.UNI_LIBRARIES || []).find(lib => {
          if (typeof lib === 'string') {
            if (lib === source) {
              return true
            }
          } else {
            if (lib.library === source) {
              return true
            }
          }
        })
        if (lib) {
          if (typeof lib === 'string') {
            const componentName = hyphenate(key)
            components[key] = source + '/lib/' + componentName + '/' + componentName
          } else {
            const componentName = hyphenate(key)
            components[key] = lib.customName(componentName)
          }
        } else {
          components[key] = source
        }
      })
      path.hub.file.metadata.components = components
    }
  }

  function findSource (identifierName, bindings) {
    const binding = bindings[identifierName]
    if (!binding) {
      return
    }

    if (t.isImportDeclaration(binding.path.parent)) {
      return binding.path.parent.source.value
    }
  }
}
