const t = require('@babel/types')

const {
  METHOD_BUILT_IN,
  METHOD_CREATE_EMPTY_VNODE,
  METHOD_CREATE_ELEMENT
} = require('../../constants')

function needSlotMode (path, ids) {
  let need
  path.traverse({
    noScope: false,
    Property (path) {
      // 跳过事件
      if (path.node.key.name === 'on') {
        const parentPath = path.parentPath.parentPath
        if (t.isCallExpression(parentPath) && parentPath.node.callee.name === METHOD_CREATE_ELEMENT) {
          path.skip()
        }
      }
    },
    Identifier (path) {
      const name = path.node.name
      if (path.key !== 'key' && (path.key !== 'property' || path.parent.computed)) {
        // 使用作用域内方法或作用域外数据
        if (name in ids) {
          need = path.key === 'callee' ? true : need
        } else if (!path.scope.hasBinding(name) && !METHOD_BUILT_IN.includes(name)) {
          need = true
        }
      }
    }
  })
  return need
}

function replaceId (path, ids) {
  let replaced
  const fnPath = path.parentPath
  path.traverse({
    noScope: false,
    Identifier (path) {
      const name = path.node.name
      if (name in ids && path.key !== 'key' && (path.key !== 'property' || path.parent.computed) && path.scope.path === fnPath) {
        path.replaceWith(ids[name])
        replaced = true
      }
    }
  })
  return replaced
}

module.exports = function getResolveScopedSlots (parent, state) {
  const properties = parent.get('arguments.0.elements.0.properties')
  const fn = properties.find(path => path.get('key').isIdentifier({ name: 'fn' }))
  const params = fn.get('value.params.0')
  if (!params) {
    return
  }
  const vueId = parent.parentPath.parentPath.get('properties').find(path => path.get('key').isIdentifier({ name: 'attrs' })).get('value').get('properties').find(path => path.get('key').isStringLiteral({ value: 'vue-id' })).get('value').node
  const slot = properties.find(path => path.get('key').isIdentifier({ name: 'key' })).get('value').node.value
  const ids = {}
  function updateIds (vueId, slot, value, key) {
    const array = [vueId, t.stringLiteral(slot)]
    if (key) {
      array.push(t.stringLiteral(key))
    }
    ids[value] = t.callExpression(t.identifier('$getScopedSlotsParams'), array)
  }
  if (params.isObjectPattern()) {
    params.get('properties').forEach(prop => {
      updateIds(vueId, slot, prop.get('value').node.name, prop.get('key').node.name)
    })
  } else if (params.isIdentifier()) {
    updateIds(vueId, slot, params.node.name)
  }
  const fnBody = fn.get('value.body')
  if (state.options.scopedSlotsCompiler === 'augmented' || needSlotMode(fnBody, ids)) {
    if (replaceId(fnBody, ids)) {
      const orgin = fnBody.get('body.0.argument')
      const elements = orgin.get('elements')
      const node = (elements.length === 1 ? elements[0] : orgin).node
      const test = t.callExpression(t.identifier('$hasScopedSlotsParams'), [vueId])
      orgin.replaceWith(t.arrayExpression([t.conditionalExpression(test, node, t.callExpression(t.identifier(METHOD_CREATE_EMPTY_VNODE), []))]))
      // scopedSlotsCompiler auto
      parent.get('arguments.0.elements.0').node.scopedSlotsCompiler = 'augmented'
    }
  }
}
