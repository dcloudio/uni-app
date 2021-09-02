const t = require('@babel/types')

const {
  VAR_ORIGINAL,
  IDENTIFIER_FOR,
  METHOD_RENDER_LIST
} = require('../../constants')

const {
  getMapCallExpression
} = require('./statements')

const {
  hasOwn,
  genCode,
  traverseKey,
  processMemberExpression,
  getForIndexIdentifier,
  isSimpleObjectExpression,
  traverseFilter
} = require('../../util')

const getMemberExpr = require('./member-expr')

const origVisitor = {
  noScope: true,
  Identifier (path) {
    if (
      !path.node.$mpProcessed &&
      path.node.name === this.forItem &&
      path.isReferencedIdentifier()
    ) {
      const forItemIdentifier = t.identifier(this.forItem)
      forItemIdentifier.$mpProcessed = true
      path.replaceWith(
        t.memberExpression(forItemIdentifier, t.identifier(VAR_ORIGINAL))
      )
    }
  },
  FunctionExpression (path) {
    const callee = path.parentPath.node.callee
    if (t.isIdentifier(callee) && callee.name === METHOD_RENDER_LIST) {
      path.traverse(origVisitor, {
        forItem: this.forItem
      })
      path.skip()
    }
  }
}

function isRefrence (forItem, code) {
  if (forItem === code) {
    return true
  }
  return code.indexOf(forItem + '.') === 0
}

function replaceRefrence (forItem, code) {
  if (forItem === code) {
    return ''
  }
  return code.replace(forItem + '.', '')
}

function getForExtra (forItem, forIndex, path, state) {
  const arg0 = path.node.arguments[0]
  const isNumeric = t.isNumericLiteral(arg0)
  const isString = t.isStringLiteral(arg0)
  let forCode = genCode(processMemberExpression(arg0, state), true)

  const forKey = traverseKey(path.node)
  const origForKeyCode = t.isIdentifier(forKey) && forKey.name
  let forKeyCode = ''
  if (forKey) {
    forKeyCode = genCode(processMemberExpression(forKey, state), true)
    if (isRefrence(forItem, forKeyCode)) {
      forKeyCode = replaceRefrence(forItem, forKeyCode)
    }
  }
  const forExtraElements = []
  if (state.scoped.length) {
    const scoped = state.scoped.find(scoped => isRefrence(scoped.forItem, forCode))
    if (scoped) {
      forCode = replaceRefrence(scoped.forItem, forCode)
      forExtraElements.push(...scoped.forExtra)
    }
  }
  let forCodeElem = t.stringLiteral(forCode)
  if (isNumeric) {
    forCodeElem = t.numericLiteral(arg0.value)
  } else if (isString) {
    forCodeElem = t.stringLiteral('#s#' + forCode)
  }
  if (forItem === origForKeyCode) { // 以自身为 key，则依据 forIndex 查找 ['list','',__i0__],['list','',index]
    forExtraElements.push(
      t.arrayExpression(
        [
          forCodeElem,
          t.stringLiteral(''),
          t.identifier(forIndex)
        ]
      )
    )
  } else {
    forExtraElements.push(
      t.arrayExpression(
        [
          forCodeElem,
          t.stringLiteral(forIndex === forKeyCode ? '' : forKeyCode),
          forKey || t.identifier(forIndex)
        ]
      )
    )
  }
  return forExtraElements
}

module.exports = function traverseRenderList (path, state) {
  const functionExpression = path.get('arguments.1')
  const params = functionExpression.node.params
  const forItem = params[0].name
  let forIndex = params.length > 1 && params[1].name

  if (!forIndex) {
    if (!hasOwn(state.options, '$forIndexId')) {
      state.options.$forIndexId = 0
    }
    forIndex = getForIndexIdentifier(state.options.$forIndexId++)
    params.push(t.identifier(forIndex))
  }

  const forStateScoped = {
    context: forItem,
    forItem,
    forIndex,
    forExtra: getForExtra(forItem, forIndex, path, state),
    propertyArray: [],
    declarationArray: [],
    renderSlotStatementArray: []
  }

  const forState = {
    inFor: true,
    context: state.context,
    options: state.options,
    errors: state.errors,
    tips: state.tips,
    scoped: [forStateScoped].concat(state.scoped),
    identifierArray: state.identifierArray,
    propertyArray: [],
    declarationArray: [],
    computedProperty: {},
    initExpressionStatementArray: state.initExpressionStatementArray,
    renderSlotStatementArray: state.renderSlotStatementArray
  }

  functionExpression.traverse(require('./visitor'), forState)

  const forPath = path.get('arguments.0')
  if (forStateScoped.propertyArray.length || forStateScoped.renderSlotStatementArray.length) {
    // for => map
    forPath.replaceWith(
      getMemberExpr(
        forPath,
        IDENTIFIER_FOR,
        getMapCallExpression(
          forPath.node,
          forStateScoped.propertyArray,
          forStateScoped.declarationArray,
          forStateScoped.renderSlotStatementArray,
          [], // eventPropertyArray
          forItem,
          forIndex,
          state
        ),
        forState
      )
    )

    functionExpression.traverse(origVisitor, {
      forItem
    })
    const keys = Object.keys(forState.computedProperty)
    if (keys.length) {
      keys.forEach(key => {
        const property = forState.computedProperty[key]
        if (t.isMemberExpression(property) && property.object.name === forItem) {
          property.object = t.memberExpression(t.identifier(forItem), t.identifier(VAR_ORIGINAL))
          forState.options.replaceCodes[key] = `'+${genCode(property, true)}+'`
        }
      })
    }
  } else if ((forPath.isCallExpression() && !traverseFilter(forPath.node.callee, state)) || (forPath.isObjectExpression() && !isSimpleObjectExpression(forPath.node))) {
    forPath.replaceWith(getMemberExpr(forPath, IDENTIFIER_FOR, forPath.node, forState))
  } else {
    forPath.traverse(require('./visitor'), forState)
  }

  forState.propertyArray.forEach(property => {
    state.propertyArray.push(property)
  })

  forState.declarationArray.forEach(declaration => {
    state.declarationArray.push(declaration)
  })
}
