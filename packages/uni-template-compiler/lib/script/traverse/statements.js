const t = require('@babel/types')

const {
  VAR_MP,
  VAR_ROOT,
  VAR_ORIGINAL,
  INTERNAL_GET_ORIG
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

/**
 * items.map(function(item,index){return {}})
 */
function getMapCallExpression (
  object,
  objectPropertyArray,
  declarationArray,
  eventPropertyArray,
  forItem,
  forIndex
) {
  const blockStatement = []

  if (declarationArray.length) {
    declarationArray.forEach(declaration => {
      blockStatement.push(declaration)
    })
    blockStatement.push(t.returnStatement(
      // return {$orgi:__get_orig(forItem)}
      t.objectExpression(
        [
          t.objectProperty(
            t.identifier(VAR_ORIGINAL),
            t.callExpression(t.identifier(INTERNAL_GET_ORIG), [
              t.identifier(forItem)
            ])
          )
        ].concat(objectPropertyArray)
      )
    ))
  }

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
  getEventExpressionStatement
}
