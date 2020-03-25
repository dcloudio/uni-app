export function generateId (vm, parent) {
  if (!vm.$parent) {
    return '-1'
  }
  const vnode = vm.$vnode
  const context = vnode.context
  // slot 内的组件，需要补充 context 的 id，否则可能与内部组件索引值一致，导致 id 冲突
  if (context && context !== parent && context._$id) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('generateId:' + context._$id + ';' + parent._$id + ',' + vnode.data.attrs._i)
    }
    return context._$id + ';' + parent._$id + ',' + vnode.data.attrs._i
  }
  return parent._$id + ',' + vnode.data.attrs._i
}
