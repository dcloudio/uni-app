const t = require('@babel/types')
const traverse = require('@babel/traverse').default

const {
  VAR_ROOT
} = require('../../constants')

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

function findTest (path, state) {
  let tests
  while (path.parentPath && path.key !== 'body') {
    if (path.key === 'consequent' || path.key === 'alternate') {
      let test = t.arrayExpression([t.clone(path.container.test)])
      traverse(test, {
        noScope: true,
        MemberExpression (path) {
          const names = state.scoped.map(scoped => scoped.forItem)
          const node = path.node
          const objectName = node.object.name
          if (objectName === VAR_ROOT || names.includes(objectName)) {
            path.replaceWith(node.property)
          }
        }
      })
      test = test.elements[0]
      if (path.key === 'alternate') {
        test = t.unaryExpression('!', test)
      }
      tests = tests ? t.logicalExpression('&&', test, tests) : test
    }
    path = path.parentPath
  }
  return tests
}

module.exports = function getMemberExpr (path, name, init, state, variableDeclaration = true) {
  const scoped = findScoped(path, state)
  const test = findTest(path, state)

  if (!variableDeclaration) {
    scoped.declarationArray.push(t.expressionStatement(init))
    return
  }

  const identifier = t.identifier(name)

  scoped.propertyArray.push(t.objectProperty(identifier, identifier))
  scoped.declarationArray.push(
    t.variableDeclaration('var', [t.variableDeclarator(identifier, test ? t.conditionalExpression(test, init, t.nullLiteral()) : init)])
  )

  state.identifierArray.push(identifier)

  const contextIdentifier = t.identifier(scoped.context)
  contextIdentifier.$mpProcessed = true
  return t.memberExpression(contextIdentifier, identifier)
}
