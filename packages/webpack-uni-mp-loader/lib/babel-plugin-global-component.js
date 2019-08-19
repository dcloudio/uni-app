function addImportsMap (metadata, name, source) {
  if (!metadata.modules) {
    metadata.modules = {}
  }
  metadata.modules[name] = source
}

module.exports = function babelPluginGlobalComponent ({
  types: t
}) {
  return {
    visitor: {
      Program: {
        exit (path) {
          path.traverse({
            CallExpression (path) {
              if (path.hub) {
                const {
                  callee,
                  arguments: args
                } = path.node

                const {
                  metadata
                } = path.hub.file

                if (!callee.object || !callee.property) {
                  return
                }
                if (callee.object.name === 'Vue' && callee.property.name === 'component') {
                  if (!args[0] || args[0].type !== 'StringLiteral') {
                    throw new Error('Vue.component()的第一个参数必须为静态字符串')
                  }
                  if (!args[1]) {
                    throw new Error('Vue.component()需要两个参数')
                  }
                  if (!metadata.globalComponents) {
                    metadata.globalComponents = {}
                  }
                  metadata.globalComponents[args[0].value] = metadata.modules[args[1].name]
                }
              }
            }
          })
        }
      },
      ImportDeclaration (path) {
        if (path.hub) {
          const {
            specifiers,
            source: {
              value
            }
          } = path.node

          const {
            metadata
          } = path.hub.file

          specifiers.forEach(specifier => {
            addImportsMap(metadata, specifier.local.name, value)
          })
        }
      }
    }
  }
}
