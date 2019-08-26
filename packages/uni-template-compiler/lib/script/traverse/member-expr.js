const t = require('@babel/types')

function isMatch (name, forItem, forIndex) {
  return name === forItem || name === forIndex
}

function getIdentifierName (element) {
  if (t.isMemberExpression(element)) {
    return getIdentifierName(element.object)
  } else if (t.isCallExpression(element)) {
    return getIdentifierName(element.callee)
  }
  return element.name && element.name.split('.')[0]
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
    if (path.isIdentifier() || path.isMemberExpression()) {
      match = isMatch(getIdentifierName(path.node), forItem, forIndex)
    } else {
      path.traverse({
        noScope: true,
        Identifier (path) {
          if (!match) {
            match = isMatch(path.node.name, forItem, forIndex)
            if (match) {
              path.stop()
            }
          }
        },
        MemberExpression (path) {
          if (!match) {
            match = isMatch(getIdentifierName(path.node), forItem, forIndex)
            if (match) {
              path.stop()
            }
            path.skip()
          }
        }
      })
    }
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
