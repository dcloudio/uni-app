const path = require('path')

const t = require('@babel/types')
const babelTraverse = require('@babel/traverse').default

const generate = require('./generate')
const uniI18n = require('@dcloudio/uni-cli-i18n')

const {
  genCode,
  getCode,
  getForKey,
  traverseKey,
  isComponent
} = require('../util')

const {
  ATTR_DATA_CUSTOM_HIDDEN,
  ATTR_SLOT_ORIGIN
} = require('../constants')

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
  const prefix = state.options.platform.directive
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
      (t.isCallExpression(conditionalExprNode.alternate) &&
        t.isIdentifier(conditionalExprNode.alternate.callee) &&
        conditionalExprNode.alternate.callee.name === '_e') || t.isNullLiteral(conditionalExprNode.alternate)
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
        ret.slot = genCode(property.value)
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
        ret.class = genCode(property.value)
        break
      case 'style':
      case 'staticStyle':
        ret.style = genCode(property.value)
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
                  let key
                  // 自定义组件不支持 hidden 属性
                  const platform = state.options.platform.name
                  const platforms = ['mp-weixin', 'mp-qq', 'mp-jd', 'mp-xhs', 'mp-toutiao', 'mp-lark']
                  if (isComponent(node.type) && platforms.includes(platform)) {
                    // 字节跳动|飞书小程序自定义属性不会反应在DOM上，只能使用事件格式
                    key = `${platform === 'mp-toutiao' || platform === 'mp-lark' ? 'bind:-' : ''}${ATTR_DATA_CUSTOM_HIDDEN}`
                  } else {
                    key = 'hidden'
                  }
                  ret[key] = genCode(valueProperty.value, false, true)
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

function genSlotNode (slotName, slotNode, fallbackNodes, state, isStaticSlotName = true) {
  if (!fallbackNodes || t.isNullLiteral(fallbackNodes)) {
    return slotNode
  }
  // 支付宝小程序默认插槽为 $default
  if (state.options.platform.name === 'mp-alipay') {
    slotName = slotName === 'default' ? '$default' : slotName
  }
  const prefix = state.options.platform.directive
  return [{
    type: 'block',
    attr: {
      // 移除动态拼接的 index 部分
      [prefix + 'if']: isStaticSlotName ? '{{$slots.' + slotName + '}}' : '{{$slots[' + slotName.replace(/^{{/, '').replace(/}}$/, '').replace(/\+\('\.'\+\S+?\)$/, '') + ']}}'
    },
    children: [].concat(slotNode)
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
  const slotNameNode = callExprNode.arguments[0]
  const isStaticSlotName = t.isStringLiteral(slotNameNode)
  const slotName = isStaticSlotName ? slotNameNode.value : genCode(slotNameNode)

  let deleteSlotName = false // 标记是否组件 slot 手动指定了 name="default"
  if (state.options.scopedSlotsCompiler !== 'augmented' && callExprNode.arguments.length > 2) { // 作用域插槽
    const props = {}
    const arg2 = callExprNode.arguments[2]
    const arg3 = callExprNode.arguments[3]
    let bindings
    if (t.isObjectExpression(arg2)) {
      arg2.properties.forEach(property => {
        props[property.key.value] = genCode(property.value)
      })
    } else if (arg3) {
      bindings = genCode(arg3)
    }
    deleteSlotName = props.SLOT_DEFAULT && Object.keys(props).length === 1
    if (!deleteSlotName) {
      // TODO 非原生支持作用域插槽的平台在未启用增强的模式下也允许使用动态插槽名
      if (!isStaticSlotName && !['mp-baidu', 'mp-alipay'].includes(state.options.platform.name)) {
        state.errors.add(uniI18n.__('templateCompiler.notSupportDynamicSlotName', { 0: 'v-slot' }))
        return
      }
      delete props.SLOT_DEFAULT
      return genSlotNode(
        slotName,
        state.options.platform.createScopedSlots(slotName, bindings || props, state),
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

  return genSlotNode(slotName, node, callExprNode.arguments[1], state, isStaticSlotName)
}

function traverseResolveScopedSlots (callExprNode, state) {
  const options = state.options
  const prefix = options.platform.directive
  const platformName = options.platform.name
  const vIfAttrName = prefix + 'if'
  const vForAttrName = prefix + 'for'
  // 模板标签支持 slot 属性的平台
  // 百度、字节小程序仅支持在根节点使用 slot 属性
  const supportTemplateSlotPlatforms = ['mp-baidu', 'mp-toutiao']
  // 支持访问当前节点 v-for 作用域的平台
  const supportCurrentScopePlatforms = ['mp-weixin', 'mp-alipay']
  function merge (node, ignore, vIfs = [], top, needRealNode) {
    if (!top) {
      // 支付宝小程序使用静态插槽时可以在非实体节点使用 slot 属性，其他小程序 named slot 需移动到实体节点
      const slot = node.attr.slot
      needRealNode = slot && slot !== 'default' && !supportTemplateSlotPlatforms.includes(platformName) && !(platformName === 'mp-alipay' && !/\{\{.+?\}\}/.test(slot))
      node = { children: [node] }
      top = node
    }
    let children = node.children
    let nodeAttr = node.attr || {}
    function resolveVIf () {
      if (vIfs.length) {
        // 简易合并
        nodeAttr[vIfAttrName] = vIfs.length > 1 ? `{{${vIfs.map(str => str.replace(/^\{\{(.+)\}\}$/, '($1)')).join('&&')}}}` : vIfs[0]
        vIfs.length = 0
      }
    }
    if (Array.isArray(children)) {
      children = children.filter(child => !!child)
      let slotNode
      if (children.length === 1) {
        let child = children[0]
        if (child.type) {
          const attr = child.attr || {}
          // 除 v-if 外与父节点无同名属性且当前节点无 v-for 作用域且父节点 v-for 支持访问当前节点作用域，向上合并
          // TODO 父节点访问变量不与当前 v-for 作用域内变量同名时，可向上合并
          if (!Object.keys(attr).find(key => key !== vIfAttrName && key in nodeAttr) && !attr[vForAttrName] && (supportCurrentScopePlatforms.includes(platformName) || !nodeAttr[vForAttrName])) {
            if (attr[vIfAttrName]) {
              vIfs.push(attr[vIfAttrName])
              delete attr[vIfAttrName]
            }
            child.attr = nodeAttr = Object.assign(attr, nodeAttr)
            for (const key in child) {
              node[key] = child[key]
            }
            child = node
          } else {
            resolveVIf()
          }
          if (ignore.includes(child.type)) {
            return merge(child, ignore, vIfs, top, needRealNode)
          } else if (needRealNode) {
            slotNode = child
          }
        } else if (needRealNode) {
          node.type = 'text'
          slotNode = node
        }
      } else if (needRealNode) {
        // TODO 依据子节点类型
        node.type = 'view'
        slotNode = node
      }
      if (slotNode && slotNode !== top) {
        // TODO 多层 v-for 嵌套时，此处理导致作用域发生变化，需安全重命名 slot name
        ['slot', 'slot-scope'].forEach(key => {
          const topAttr = top.attr
          if (key in topAttr) {
            slotNode.attr[key] = topAttr[key]
            delete topAttr[key]
          }
        })
      }
    }
    resolveVIf()
    return top
  }
  return callExprNode.arguments[0].elements.map(slotNode => {
    let keyProperty = false
    let fnProperty = false
    let proxyProperty = false
    let vIfNode
    let vForNode
    // TODO v-else
    if (t.isConditionalExpression(slotNode)) {
      // vIfCode = genCode(slotNode.test)
      vIfNode = t.cloneNode(slotNode, true)
      slotNode = slotNode.consequent
    }
    if (t.isCallExpression(slotNode)) {
      vForNode = t.cloneNode(slotNode, true)
      slotNode = slotNode.arguments[1].body.body[0].argument
    }
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
    const slotNameNode = keyProperty.value
    const isStaticSlotName = t.isStringLiteral(slotNameNode)
    const slotName = isStaticSlotName ? slotNameNode.value : genCode(slotNameNode)
    // 移除动态拼接的 index 部分
    // TODO 动态 slotName 如使用到 v-for 作用域变量，输出固定名称 $dynamic
    const slotNameOrigin = isStaticSlotName ? slotName : slotName.replace(/\+\('\.'\+\S+?\)\}\}$/, '}}')
    let returnExprNodes = fnProperty.value.body.body[0].argument
    if (vForNode) {
      vForNode.arguments[1].body.body[0].argument = returnExprNodes
      returnExprNodes = vForNode
    }
    if (vIfNode) {
      vIfNode.consequent = returnExprNodes
      returnExprNodes = vIfNode
    }
    const parentNode = callExprNode.$node
    if (options.scopedSlotsCompiler !== 'augmented' && slotNode.scopedSlotsCompiler !== 'augmented' && !proxyProperty) {
      // 暂不处理旧版编译模式对于动态 slotName 的处理
      const resourcePath = options.resourcePath
      const ownerName = path.basename(resourcePath, path.extname(resourcePath))

      const parentName = parentNode.type

      const paramExprNode = fnProperty.value.params[0]
      const node = options.platform.resolveScopedSlots(
        slotName, {
          genCode,
          generate,
          ownerName,
          parentName,
          parentNode,
          resourcePath,
          paramExprNode,
          returnExprNodes,
          traverseExpr: function (exprNode, state) {
            const ast = traverseExpr(exprNode, state)
            initParent(ast)
            return ast
          },
          normalizeChildren
        },
        state
      )
      // 对原生支持作用域插槽的小程序平台，优化节点
      if (['mp-baidu', 'mp-alipay'].includes(platformName)) {
        node.attr[ATTR_SLOT_ORIGIN] = slotNameOrigin
        return merge(node, ['template', 'block'])
      }
      return node
    }
    if (options.scopedSlotsCompiler === 'auto' && slotNode.scopedSlotsCompiler === 'augmented') {
      parentNode.attr['scoped-slots-compiler'] = 'augmented'
    }
    // 除百度、字节外其他小程序仅默认插槽可以支持多个节点
    return merge({
      type: 'block',
      children: normalizeChildren(traverseExpr(returnExprNodes, state)),
      attr: {
        slot: slotName,
        [ATTR_SLOT_ORIGIN]: slotNameOrigin
      }
    }, ['template', 'block'])
  })
}

function traverseRenderList (callExprNode, state) {
  const params = callExprNode.arguments[1].params
  const forItem = params.length > 0 ? params[0].name : 'item'
  const forIndex = params.length > 1 ? params[1].name : ''

  const forReturnStatementArgument =
    callExprNode.arguments[1].body.body[0].argument

  const forKey = traverseKey(forReturnStatementArgument, state)

  const prefix = state.options.platform.directive

  const isBaidu = state.options.platform.name === 'mp-baidu'
  let forValue = genCode(callExprNode.arguments[0], isBaidu)

  if (isBaidu && forKey) {
    forValue += ` trackBy ${getForKey(forKey, forIndex, state)}`
  }

  const attr = {
    [prefix + 'for']: forValue,
    [prefix + 'for-item']: forItem
  }

  if (forIndex) {
    attr[prefix + 'for-index'] = forIndex
  }

  if (forKey && !isBaidu) {
    const key = getForKey(forKey, forIndex, state)
    if (key) {
      attr[prefix + 'key'] = key
    }
  }

  const children = traverseExpr(forReturnStatementArgument, state)
  // 支付宝小程序在 block 标签上使用 key 时顺序不能保障
  if (state.options.platform.name === 'mp-alipay' && t.isCallExpression(forReturnStatementArgument) && children &&
    children.type) {
    children.attr = children.attr || {}
    Object.assign(children.attr, attr)
    return children
  }
  return {
    type: 'block',
    attr,
    children: normalizeChildren(children)
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
