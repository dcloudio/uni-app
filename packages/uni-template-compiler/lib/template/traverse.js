const path = require('path')

const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const generate = require('./generate')

const {
  genCode,
  getCode,
  getForKey,
  traverseKey
} = require('../util')

module.exports = function traverse (ast, state = {}) {
  babelTraverse(ast, {
    WithStatement (path) {
      state.ast = traverseExpr(path.node.body.body[0].argument, state)
    }
  })
  initParent(state.ast)
  return state.ast
}

function initParent (ast, parentNode) {
  if (Array.isArray(ast)) {
    ast.forEach(node => initParent(node, parentNode))
  } else if (typeof ast === 'object') {
    ast.parent = parentNode

    const vueId = ast.$vueId
    if (vueId) {
      const vuePid = getVueParentId(parentNode)
      if (vuePid) {
        ast.attr['vue-id'] = genCode(
          t.binaryExpression(
            '+',
            t.binaryExpression(
              '+',
              t.parenthesizedExpression(vueId),
              t.stringLiteral(',')
            ),
            t.parenthesizedExpression(vuePid)
          )
        )
      }
    }
    initParent(ast.children, ast)
  }
}

function getVueParentId (parentNode) {
  if (!parentNode) {
    return
  }
  return parentNode.$vueId || getVueParentId(parentNode.parent)
}

function traverseExpr (exprNode, state) {
  if (t.isCallExpression(exprNode)) {
    return traverseCallExpr(exprNode, state)
  } else if (t.isConditionalExpression(exprNode)) {
    return traverseConditionalExpr(exprNode, state)
  } else if (t.isArrayExpression(exprNode)) {
    return traverseArrayExpression(exprNode, state)
  } else if (t.isIdentifier(exprNode) && exprNode.name === 'undefined') {
    return {
      type: 'block',
      attr: {},
      children: []
    }
  } else if (t.isUnaryExpression(exprNode) && exprNode.operator === 'void') {
    return false
  } else {
    throw new Error(`暂不支持 ${getCode(exprNode)} 语法`)
  }
}

const traverses = {
  _c: traverseCreateElement,
  _t: traverseRenderSlot,
  _l: traverseRenderList,
  _u: traverseResolveScopedSlots,
  _v: traverseCreateTextVNode,
  _e: traverseCreateEmptyVNode,
  _g: '暂不支持 v-on="$listeners" 用法',
  _b: '暂不支持 v-bind="" 用法'
}

function traverseCallExpr (callExprNode, state) {
  const traverse = traverses[callExprNode.callee.name]
  if (!traverse) {
    throw new Error(
      `CallExpression ${callExprNode.callee.name}  is not yet implemented`
    )
  } else if (typeof traverse === 'string') {
    throw new Error(traverse)
  }

  return traverse(callExprNode, state)
}

function traverseConditionalExpr (conditionalExprNode, state) {
  const prefix = state.options.platform.prefix
  const ret = [{
    type: 'block',
    attr: {
      [prefix + 'if']: genCode(conditionalExprNode.test)
    },
    children: normalizeChildren(
      traverseExpr(conditionalExprNode.consequent, state)
    )
  }]
  if (
    !(
      t.isCallExpression(conditionalExprNode.alternate) &&
      t.isIdentifier(conditionalExprNode.alternate.callee) &&
      conditionalExprNode.alternate.callee.name === '_e'
    )
  ) {
    // test?_c():_e()
    ret.push({
      type: 'block',
      attr: {
        [prefix + 'else']: ''
      },
      children: normalizeChildren(
        traverseExpr(conditionalExprNode.alternate, state)
      )
    })
  }
  return ret
}

function traverseCreateElement (callExprNode, state) {
  const args = callExprNode.arguments
  const tagNode = args[0]
  if (!t.isStringLiteral(tagNode)) {
    throw new Error(`暂不支持动态组件[${tagNode.name}]`)
  }

  const node = {
    type: tagNode.value,
    attr: {},
    children: []
  }

  if (args.length < 2) {
    return node
  }

  const dataNodeOrChildNodes = args[1]
  if (t.isObjectExpression(dataNodeOrChildNodes)) {
    Object.assign(node.attr, traverseDataNode(dataNodeOrChildNodes, state, node))
  } else {
    node.children = normalizeChildren(traverseExpr(dataNodeOrChildNodes, state))
  }
  if (args.length < 3) {
    return node
  }
  const childNodes = args[2]
  if (!t.isNumericLiteral(childNodes)) {
    if (node.children && node.children.length) {
      node.children = node.children.concat(normalizeChildren(traverseExpr(childNodes, state)))
    } else {
      node.children = normalizeChildren(traverseExpr(childNodes, state))
    }
  }
  return node
}

function traverseDataNode (dataNode, state, node) {
  const ret = {}
  const specialEvents = state.options.platform.specialEvents[node.type] || {}
  const specialEventNames = Object.keys(specialEvents)
  dataNode.properties.forEach(property => {
    switch (property.key.name) {
      case 'slot':
        ret['slot'] = genCode(property.value)
        break
      case 'scopedSlots': // Vue 2.6
        property.value.$node = node
        node.children = normalizeChildren(traverseExpr(property.value, state))
        break
      case 'attrs':
      case 'domProps':
      case 'on':
      case 'nativeOn':
        property.value.properties.forEach(attrProperty => {
          if (attrProperty.key.value === 'vue-id') { // initParent 时再处理 vue-id
            node.$vueId = attrProperty.value
            ret[attrProperty.key.value] = genCode(attrProperty.value)
          } else {
            if (specialEventNames.includes(attrProperty.key.value)) {
              if (t.isIdentifier(attrProperty.value)) {
                ret[specialEvents[attrProperty.key.value]] = attrProperty.value.name
              }
            } else {
              ret[attrProperty.key.value] = genCode(attrProperty.value)
            }
          }
        })
        break
      case 'class':
      case 'staticClass':
        ret['class'] = genCode(property.value)
        break
      case 'style':
      case 'staticStyle':
        ret['style'] = genCode(property.value)
        break
      case 'directives':
        property.value.elements.find(objectExpression => {
          if (t.isObjectExpression(objectExpression)) {
            const nameProperty = objectExpression.properties[0]
            const isShowDir =
              nameProperty &&
              nameProperty.key.name === 'name' &&
              t.isStringLiteral(nameProperty.value) &&
              nameProperty.value.value === 'show'
            if (isShowDir) {
              objectExpression.properties.find(valueProperty => {
                const isValue = valueProperty.key.name === 'value'
                if (isValue) {
                  ret['hidden'] = genCode(valueProperty.value, false, true)
                }
                return isValue
              })
            }
            return isShowDir
          }
        })
        break
    }
  })
  return ret
}

function normalizeChildren (nodes) {
  if (!Array.isArray(nodes)) {
    nodes = [nodes]
  }
  return nodes.filter(node => {
    if (typeof node === 'string' && !node.trim()) {
      return false
    }
    return true
  })
}

function traverseArrayExpression (arrayExprNodes, state) {
  return arrayExprNodes.elements.reduce((nodes, exprNode) => {
    return nodes.concat(traverseExpr(exprNode, state))
  }, [])
}

function genSlotNode (slotName, slotNode, fallbackNodes, state) {
  if (!fallbackNodes || t.isNullLiteral(fallbackNodes)) {
    return slotNode
  }
  const prefix = state.options.platform.prefix
  return [{
    type: 'block',
    attr: {
      [prefix + 'if']: '{{$slots.' + slotName + '}}'
    },
    children: [slotNode]
  }, {
    type: 'block',
    attr: {
      [prefix + 'else']: ''
    },
    children: normalizeChildren(
      traverseExpr(fallbackNodes, state)
    )
  }]
}

function traverseRenderSlot (callExprNode, state) {
  if (!t.isStringLiteral(callExprNode.arguments[0])) {
    state.errors.add(`v-slot 不支持动态插槽名`)
    return
  }

  const slotName = callExprNode.arguments[0].value

  let deleteSlotName = false // 标记是否组件 slot 手动指定了 name="default"
  if (callExprNode.arguments.length > 2) { // 作用域插槽
    const props = {}
    callExprNode.arguments[2].properties.forEach(property => {
      props[property.key.value] = genCode(property.value)
    })
    deleteSlotName = props['SLOT_DEFAULT'] && Object.keys(props).length === 1
    if (!deleteSlotName) {
      delete props['SLOT_DEFAULT']
      return genSlotNode(
        slotName,
        state.options.platform.createScopedSlots(slotName, props, state),
        callExprNode.arguments[1],
        state
      )
    }
  }

  const node = {
    type: 'slot',
    attr: {
      name: slotName
    },
    children: []
  }

  if (deleteSlotName) {
    delete node.attr.name
  }

  return genSlotNode(slotName, node, callExprNode.arguments[1], state)
}

function traverseResolveScopedSlots (callExprNode, state) {
  return callExprNode.arguments[0].elements.map(slotNode => {
    let keyProperty = false
    let fnProperty = false
    let proxyProperty = false
    slotNode.properties.forEach(property => {
      switch (property.key.name) {
        case 'key':
          keyProperty = property
          break
        case 'fn':
          fnProperty = property
          break
        case 'proxy':
          proxyProperty = property
      }
    })
    const slotName = keyProperty.value.value
    const returnExprNodes = fnProperty.value.body.body[0].argument
    if (!proxyProperty) {
      const resourcePath = state.options.resourcePath
      const ownerName = path.basename(resourcePath, path.extname(resourcePath))

      const parentNode = callExprNode.$node
      const parentName = parentNode.type

      const paramExprNode = fnProperty.value.params[0]
      return state.options.platform.resolveScopedSlots(
        slotName, {
          genCode,
          generate,
          ownerName,
          parentName,
          parentNode,
          resourcePath,
          paramExprNode,
          returnExprNodes,
          traverseExpr,
          normalizeChildren
        },
        state
      )
    }
    const node = {
      type: 'view',
      attr: {
        slot: slotName
      },
      children: normalizeChildren(traverseExpr(returnExprNodes, state))
    }
    return node
  })
}

function traverseRenderList (callExprNode, state) {
  const params = callExprNode.arguments[1].params
  const forItem = params.length > 0 ? params[0].name : 'item'
  const forIndex = params.length > 1 ? params[1].name : ''

  const forReturnStatementArgument =
    callExprNode.arguments[1].body.body[0].argument

  const forKey = traverseKey(forReturnStatementArgument, state)

  const prefix = state.options.platform.prefix

  const attr = {
    [prefix + 'for']: genCode(callExprNode.arguments[0]),
    [prefix + 'for-item']: forItem
  }

  if (forIndex) {
    attr[prefix + 'for-index'] = forIndex
  }

  if (forKey) {
    const key = getForKey(forKey, forIndex, state)
    if (key) {
      attr[prefix + 'key'] = key
    }
  }

  return {
    type: 'block',
    attr,
    children: normalizeChildren(traverseExpr(forReturnStatementArgument, state))
  }
}

function getLeftStringLiteral (expr) {
  if (t.isBinaryExpression(expr) && !expr.$toString) {
    return getLeftStringLiteral(expr.left)
  } else if (t.isStringLiteral(expr)) {
    return expr
  }
}

function trim (text, type) {
  // TODO 保留换行符？
  if (type === 'left') {
    text = text.trimLeft()
  } else if (type === 'right') {
    text = text.trimRight()
  } else {
    text = text.trim()
  }
  return text
}

function traverseCreateTextVNode (callExprNode, state) {
  // trimStart|Left and trimEnd|End
  const arg = callExprNode.arguments[0]
  if (t.isStringLiteral(arg)) {
    arg.value = trim(arg.value)
  } else if (t.isBinaryExpression(arg) && !arg.$toString) { // 非_s()
    // right
    const right = arg.right
    if (t.isStringLiteral(right)) {
      right.value = trim(right.value, 'right')
    }
    // left
    const left = getLeftStringLiteral(arg.left)
    if (left && left.value) {
      left.value = trim(left.value, 'left')
    }
  }
  if (
    state.options.platform.name === 'mp-baidu' ||
    state.options.platform.name === 'mp-qq'
  ) {
    const code = genCode(arg, false, false, false)
    if (code.indexOf('{{') === 0) {
      if (state.options.platform.name === 'mp-qq') { // 似乎百度也可以走该逻辑, 为了稳定性，仅限 qq
        return code.replace(/\\n/g, '\\\\n').replace(/\\t/g, '\\\\t')
      }
      return code.replace(/([^\\])\\n/g, '$1\\\\n').replace(/([^\\])\\t/g, '$1\\\\t')
    }
    return code
  }
  return genCode(arg, false, false, false).replace(/\\\\n/g, '\\n')
}

function traverseCreateEmptyVNode (callExprNode, state) {
  return ''
}
