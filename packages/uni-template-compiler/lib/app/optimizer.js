let isPlatformReservedTag

function no (a, b, c) {
  return false
}

function isBuiltInTag (tag) {
  if (tag === 'slot' || tag === 'component') {
    return true
  }
}

function isStatic (node) {
  if (node.type === 2) {
    return false
  }
  if (node.type === 3) {
    return true
  }
  if (node.dynamicClass || node.dynamicStyle) {
    return false
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag)
  ))
}

function markStatic (node) {
  if (isStatic(node)) { // 静态节点且仅包含 ID 属性
    if (
      node.attrs.length === 1 &&
      !node.key &&
      !node.ref &&
      !node.slotTarget
    ) {
      node.plain = true
    }
    delete node.attrs
  }
  if (node.type === 1) {
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
      }
    }
  }
}

module.exports = function optimize (root, options) {
  isPlatformReservedTag = options.isReservedTag || no
  markStatic(root)
}
