const t = require('@babel/types')

const {
  VAR_MP,
  VAR_ROOT,
  VAR_ORIGINAL,
  INTERNAL_GET_ORIG,
  IDENTIFIER_METHOD,
  IDENTIFIER_FILTER
} = require('../../constants')
/**
 * e0=e=>count++
 */
function getEventExpressionStatement (left, right) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      left,
      right
    )
  )
}
/**
 * if(!_isMounted){}
 */
function getInItIfStatement (expressionStatementArray) {
  return t.ifStatement(
    t.unaryExpression(
      '!',
      t.identifier('_isMounted')
    ),
    t.blockStatement(expressionStatementArray)
  )
}

function getRenderSlotStatement (state, renderSlotStatementArray, forItem) {
  function cloneNode (node) {
    if (Array.isArray(node)) {
      return node.map(function (item) {
        return cloneNode(item)
      })
    } else if (typeof node === 'object') {
      if (!node) {
        return node
      }
      if (t.isMemberExpression(node)) { // 纠正被处理过的对象
        const name = node.object.name
        // identifier 使用原值以被后续修改
        if ((name === VAR_ROOT || name === forItem) && t.isIdentifier(node.property) && [IDENTIFIER_METHOD, IDENTIFIER_FILTER].includes(node.property.name)) {
          return node.property
        }
      } else if (t.isIdentifier(node, { name: forItem })) { // 预处理 forItem
        return t.identifier(VAR_ORIGINAL)
      }
      const target = Object.create(node)
      Object.keys(node).forEach(function (key) {
        target[key] = cloneNode(node[key])
      })
      return target
    } else {
      return node
    }
  }
  renderSlotStatementArray.forEach(renderSlotStatement => {
    const argument = renderSlotStatement.expression.arguments[1]
    if (t.isObjectExpression(argument)) {
      // 克隆以避免影响模板
      argument.properties = cloneNode(argument.properties)
    }
  })
  const blockStatement = t.blockStatement(renderSlotStatementArray)
  if (state.options.scopedSlotsCompiler === 'auto') {
    return t.ifStatement(
      t.binaryExpression('===',
        t.memberExpression(t.memberExpression(t.identifier('$scope'), t.identifier(state.options.platform.name === 'mp-alipay' ? 'props' : 'data')), t.identifier('scopedSlotsCompiler')), t.stringLiteral('augmented')
      ),
      blockStatement
    )
  }
  return blockStatement
}

/**
 * items.map(function(item,index){return {}})
 */
function getMapCallExpression (
  object,
  objectPropertyArray,
  declarationArray,
  renderSlotStatementArray,
  eventPropertyArray,
  forItem,
  forIndex,
  state
) {
  const blockStatement = []
  // var $orgi = __get_orig(forItem)
  blockStatement.push(t.variableDeclaration('var', [
    t.variableDeclarator(t.identifier(VAR_ORIGINAL), t.callExpression(t.identifier(INTERNAL_GET_ORIG), [
      t.identifier(forItem)
    ]))
  ]))
  if (declarationArray.length) {
    declarationArray.forEach(declaration => {
      blockStatement.push(declaration)
    })
  }

  if (renderSlotStatementArray.length) {
    blockStatement.push(getRenderSlotStatement(state, renderSlotStatementArray, forItem))
  }

  blockStatement.push(t.returnStatement(
    // return {$orgi:$orgi}
    t.objectExpression(
      [
        t.objectProperty(
          t.identifier(VAR_ORIGINAL),
          t.identifier(VAR_ORIGINAL)
        )
      ].concat(objectPropertyArray)
    )
  ))

  const params = [t.identifier(forItem)]
  if (forIndex) {
    params.push(t.identifier(forIndex))
  }
  return t.callExpression(t.identifier('__map'), [
    object,
    t.functionExpression(
      null,
      params,
      t.blockStatement(blockStatement)
    )
  ])
}

/**
 * $mp.data = Object.assign({},{$root:{}})
 */
function getDataExpressionStatement (objectPropertyArray) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        // left
        t.identifier(VAR_MP),
        t.identifier('data')
      ),
      t.callExpression(
        // right
        t.memberExpression(
          // Object.assign
          t.identifier('Object'),
          t.identifier('assign')
        ),
        [
          t.objectExpression([]), // {}
          t.objectExpression([
            // {$root:{}}
            t.objectProperty(
              t.identifier(VAR_ROOT),
              t.objectExpression(objectPropertyArray)
            )
          ])
        ]
      )
    )
  )
}

module.exports = {
  getInItIfStatement,
  getMapCallExpression,
  getDataExpressionStatement,
  getEventExpressionStatement,
  getRenderSlotStatement
}
