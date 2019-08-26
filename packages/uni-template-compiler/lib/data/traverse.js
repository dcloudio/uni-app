const t = require('@babel/types')

const babelTraverse = require('@babel/traverse').default

const {
  METHOD_RENDER_LIST
} = require('../constants')

function getDataPath (identifier, parent, scope) {
  if (
    !(t.isCallExpression(parent)) &&
        // not id of a Declaration
        !(t.isDeclaration(parent) && parent.id === identifier) &&
        // not a params of a function
        !(t.isFunction(parent) && parent.params.indexOf(identifier) > -1) &&
        // not a key of Property
        !(parent.type === 'ObjectProperty' && parent.key === identifier && !parent.computed) &&
        // not in an Array destructure pattern
        !(parent.type === 'ArrayPattern') &&
        // not in an Object destructure pattern
        !(parent.parent && parent.parent.type === 'ObjectPattern') &&
        // not already in scope
        !scope.hasBinding(identifier.name)
  ) {
    return identifier.name
  }
}

function getDataPathByMemberExpression (node, ret) {
  if (t.isMemberExpression(node.object)) {
    getDataPathByMemberExpression(node.object, ret)
  } else if (t.isIdentifier(node.object)) {
    ret.push(node.object.name)
  }
  ret.push(node.property.name || node.property.value)
}

const visitor = {
  Identifier (path) {
    const dataPath = getDataPath(path.node, path.parent, path.scope)
    if (dataPath) {
      console.log('....identifier', dataPath)
    } else {
      // console.log('....ignore', path.node.name)
    }
  },
  MemberExpression (path) {
    const dataPathArray = []
    getDataPathByMemberExpression(path.node, dataPathArray)
    path.skip()
  },
  CallExpression (path) {
    const callee = path.node.callee
    if (callee.name === METHOD_RENDER_LIST) {
      // for
      // path.skip()
    }
  }
}

module.exports = function traverse (ast, state) {
  const data = Object.create(null)
  babelTraverse(ast, visitor, undefined, {
    data
  })
}
