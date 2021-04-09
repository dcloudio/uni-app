const t = require('@babel/types')

const {
  METHOD_CREATE_EMPTY_VNODE
} = require('../../constants')

function replaceId (path, ids) {
  let replaced
  path.traverse({
    noScope: true,
    Identifier (path) {
      const name = path.node.name
      if (name in ids && path.key !== 'key' && (path.key !== 'property' || path.parent.computed)) {
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
  const vueId = parent.parentPath.parentPath.get('properties').find(path => path.get('key').isIdentifier({ name: 'attrs' })).get('value').get('properties').find(path => path.get('key').isStringLiteral({ value: 'vue-id' })).get('value').node.value
  const slot = properties.find(path => path.get('key').isIdentifier({ name: 'key' })).get('value').node.value
  const ids = {}
  function updateIds (vueId, slot, value, key) {
    const array = [t.stringLiteral(vueId), t.stringLiteral(slot)]
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
  if (replaceId(fnBody, ids)) {
    const orgin = fnBody.get('body.0.argument')
    const elements = orgin.get('elements')
    const node = (elements.length === 1 ? elements[0] : orgin).node
    const test = t.callExpression(t.identifier('$hasScopedSlotsParams'), [t.stringLiteral(vueId)])
    orgin.replaceWith(t.arrayExpression([t.conditionalExpression(test, node, t.callExpression(t.identifier(METHOD_CREATE_EMPTY_VNODE), []))]))
  }
}
