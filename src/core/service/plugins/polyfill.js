/**
 * 补充一些环境兼容内容,如小程序 需要使用的 selectComponent...
 * 之所以在框架内补充,而不是在 mp-runtime 中处理,是因为小程序自定义组件可能需要获取 page 对象并使用 selectComponent
 * 故, 暂时添加到所有 vm 上
 * @param {Object} Vue
 */
/**
 * 先简单支持 id 和 class
 * @param {Object} selector
 */
function parseSelector (selector) {
  if (selector.indexOf('#') === 0) {
    const id = selector.substr(1)
    return function match (vnode) {
      return vnode.data && vnode.data.attrs && vnode.data.attrs.id === id
    }
  } else if (selector.indexOf('.') === 0) {
    const clazz = selector.substr(1)
    return function match (vnode) {
      return vnode.data && matchClass(clazz, vnode.data.staticClass, vnode.data.class)
    }
  }
}

const CLASS_RE = /\s+/

function matchClass (clazz, staticClass = '', dynamicClass = '') {
  if (staticClass) {
    return staticClass.split(CLASS_RE).indexOf(clazz) !== -1
  }
  if (dynamicClass && typeof dynamicClass === 'string') {
    return dynamicClass.split(CLASS_RE).indexOf(clazz) !== -1
  }
}

function querySelector (vm, matchSelector) {
  if (matchSelector(vm.$vnode || vm._vnode)) {
    return vm
  }
  const $children = vm.$children
  for (let i = 0; i < $children.length; i++) {
    const childVm = querySelector($children[i], matchSelector)
    if (childVm) {
      return childVm
    }
  }
}

function querySelectorAll (vm, matchSelector, ret) {
  if (matchSelector(vm.$vnode || vm._vnode)) {
    ret.push(vm)
  }
  const $children = vm.$children
  for (let i = 0; i < $children.length; i++) {
    const childVm = querySelectorAll($children[i], matchSelector, ret)
    childVm && ret.push(childVm)
  }
}

export function initPolyfill (Vue) {
  Vue.prototype.selectComponent = function selectComponent (selector) {
    return querySelector(this, parseSelector(selector))
  }

  Vue.prototype.selectAllComponent = function selectAllComponent (selector) {
    return querySelectorAll(this, parseSelector(selector), [])
  }
}
