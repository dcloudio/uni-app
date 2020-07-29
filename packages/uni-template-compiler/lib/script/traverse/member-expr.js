const t = require('@babel/types')

function isMatch (name, forItem, forIndex) {
  return name === forItem || name === forIndex
}

function findScoped (path, state) {
  if (!path) {
    return state
  }
  const scoped = state.scoped.find(scoped => {
    const {
      forItem,
      forIndex
    } = scoped
    let match = false
    path.traverse({
      noScope: true,
      Identifier (path) {
        if (!match && path.key !== 'key' && (path.key !== 'property' || path.parent.computed)) {
          match = isMatch(path.node.name, forItem, forIndex)
          if (match) {
            path.stop()
          }
        }
      }
    })
    return match
  })
  if (!scoped && state.scoped.length > 1) {
    return state.scoped[1] // 取父
  }
  return scoped || state
}

module.exports = function getMemberExpr (path, name, init, state, variableDeclaration = true) {
  const scoped = findScoped(path, state)

  if (!variableDeclaration) {
    scoped.declarationArray.push(t.expressionStatement(init))
    return
  }

  const identifier = t.identifier(name)

  scoped.propertyArray.push(t.objectProperty(identifier, identifier))
  scoped.declarationArray.push(
    t.variableDeclaration('var', [t.variableDeclarator(identifier, init)])
  )

  state.identifierArray.push(identifier)

  const contextIdentifier = t.identifier(scoped.context)
  contextIdentifier.$mpProcessed = true
  return t.memberExpression(contextIdentifier, identifier)
}
