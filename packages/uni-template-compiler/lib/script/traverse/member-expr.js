const t = require('@babel/types')
const traverse = require('@babel/traverse').default

const {
  VAR_ROOT,
  IDENTIFIER_METHOD,
  IDENTIFIER_FILTER,
  IDENTIFIER_GLOBAL
} = require('../../constants')

function isMatch (name, forItem, forIndex) {
  return name === forItem || name === forIndex
}

function findScoped (path, test, state) {
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
    if (!match && test) {
      traverse(t.arrayExpression([test]), {
        noScope: true,
        Identifier (path) {
          if (!match && path.key !== 'key' && (path.key !== 'property' || path.parent.computed)) {
            const node = path.node
            match = isMatch(node.name, forItem, forIndex) || scoped.declarationArray.find(({ declarations }) => declarations.find(({ id }) => id === node))
            if (match) {
              path.stop()
            }
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

function findTest (path, state) {
  let tests
  if (path) {
    while (path.parentPath && path.key !== 'body') {
      if (path.key === 'consequent' || path.key === 'alternate') {
        const testOrig = path.container.test
        let test = t.arrayExpression([t.cloneDeep(testOrig)])
        traverse(test, {
          noScope: true,
          MemberExpression (memberExpressionPath) {
            const names = state.scoped.map(scoped => scoped.forItem)
            const node = memberExpressionPath.node
            const objectName = node.object.name
            const property = node.property
            const propertyName = property.name
            if (objectName === VAR_ROOT || (names.includes(objectName) && (propertyName === IDENTIFIER_METHOD || propertyName === IDENTIFIER_FILTER || propertyName === IDENTIFIER_GLOBAL))) {
              const array = []
              let tempPath = memberExpressionPath
              while (tempPath.parentPath) {
                const key = tempPath.key
                array.unshift(typeof key === 'number' ? `[${key}]` : `.${key}`)
                tempPath = tempPath.parentPath
              }
              memberExpressionPath.replaceWith(path.parentPath.get('test' + array.join('')).node.property)
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
  }
  return tests
}

module.exports = function getMemberExpr (path, name, init, state, variableDeclaration = true) {
  const test = findTest(path, state)
  const scoped = findScoped(path, test, state)

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
