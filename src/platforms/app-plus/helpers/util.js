import {
  hasOwn
} from 'uni-shared'

export function generateId (vm, parent, version) {
  if (!vm.$parent) {
    return '-1'
  }
  const vnode = vm.$vnode
  const context = vnode.context
  let id = vnode.data.attrs._i
  if (version && hasOwn(vnode.data, 'key')) { // 补充 key 值
    id = id + ';' + vnode.data.key
  }
  // slot 内的组件，需要补充 context 的 id，否则可能与内部组件索引值一致，导致 id 冲突
  if (context && context !== parent && context._$id) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('generateId:' + context._$id + ';' + parent._$id + ',' + id)
    }
    return context._$id + ';' + parent._$id + ',' + id
  }
  return parent._$id + ',' + id
}
