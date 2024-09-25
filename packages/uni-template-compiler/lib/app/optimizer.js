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
  const isStaticNode = isStatic(node)
  if (isStaticNode) { // 静态节点且仅包含 ID 属性
    if (
      node.attrs &&
      node.attrs.length === 1 &&
      !node.key &&
      !node.ref &&
      !node.slotTarget
    ) {
      node.plain = true
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
  if (isStaticNode) { // 静态节点且仅包含 ID 属性
    if (!node.attrsMap || !node.attrsMap.id) { // 保留 id 属性, selectComponent 需要使用
      // 在 vue2.0 中 https://github.com/fxy060608/vue/blob/app-service/src/core/vdom/patch.js#L41
      // sameVnode 中会对比vnode的data，如果一个有值，一个没值，会触发新增逻辑
      // app端service和view编译时均会为每个节点生成_i属性，但service层为了优化包体积，性能，会对静态节点移除_i属性
      // 如果app-service中优化移除了_i属性，而app-view中又保留了，就导致两者运行时的逻辑不一样
      // <view v-if="true" @click="click"><custom/></view><view v-else><custom/></view>
      // 上述写法，第一个view始终有data（{onClick:click}）；第二个view，service层如果移除_i，则没有data，而view层会保留_i，又有data
      // 导致：app-service触发的是custom create逻辑、而app-view触发了custom update逻辑
      // 故：service层也不应该移除_i属性，但为了影响范围小一些，目前仅在if/for等条件节点上启用此逻辑，确保此情况下service和view的data均存在
      if ((node.for || node.if || node.else || node.elseif) && node.children && node.children.length) {
        if (!node.plain) { // 已经包含了其他data属性，不需要attrs来激活data，可以删除
          delete node.attrs
        } else { // 如果plain为true，需要调整为false，否则generate时会忽略data的生成
          node.plain = false
        }
      } else {
        delete node.attrs
      }
    }
  }
}

module.exports = function optimize (root, options) {
  isPlatformReservedTag = options.isReservedTag || no
  markStatic(root)
}
