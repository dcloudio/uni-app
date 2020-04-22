const {
  ID,
  isVar
} = require('./util')

const {
  isComponent
} = require('../util')

let isPlatformReservedTag

function no (a, b, c) {
  return false
}

function isBuiltInTag (tag) {
  if (
    tag === 'slot' ||
    tag === 'component' ||
    tag === 'keep-alive'
  ) {
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
  if (node.staticClass || node.classBinding || node.styleBinding) {
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
      node.attrs &&
      node.attrs.length === 1 &&
      !node.key &&
      !node.ref &&
      !node.slotTarget
    ) {
      node.plain = true
    }
    if (!node.attrsMap || !node.attrsMap.id) { // 保留 id 属性, selectComponent 需要使用
      delete node.attrs
    }
  }
  if (node.type === 1) {
    // 需要保留 staticClass , selectComponent,externalClasses
    // delete node.staticClass
    delete node.staticStyle

    const isCustomComponent = isComponent(node.tag)
    if (node.attrs && !isCustomComponent && node.tag !== 'keep-alive') { // 移除静态属性
      // 保留 id 属性, selectComponent 需要使用
      node.attrs = node.attrs.filter(attr => {
        const {
          name,
          value
        } = attr
        return name === 'id' ||
          name === ID ||
          // name.indexOf('data-') === 0 || // TODO dataset
          isVar(value)
      })
    }

    node.children = node.children.filter(child => { // 移除静态文本
      if (child.type === 3) { // ASTText
        if (!isCustomComponent) {
          return false
        }
        child.text = '' // slot <custom>ABCD</custom>
      }
      return true
    })

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
