const instances = Object.create(null)
export function triggerLink (mpInstance) {
  const nodeId = mpInstance.__nodeid__ + ''
  const webviewId = mpInstance.__webviewId__ + ''

  instances[webviewId + '_' + nodeId] = mpInstance.$vm

  mpInstance.triggerEvent('__l', {
    nodeId,
    webviewId
  }, {
    bubbles: true,
    composed: true
  })
}
// TODO 目前有 bug，composed 不生效
export function handleLink (event) {
  const nodeId = event.detail.nodeId
  const webviewId = event.detail.webviewId

  const childVm = instances[webviewId + '_' + nodeId]

  if (childVm) {
    childVm.$parent = this.$vm
    childVm.$parent.$children.push(event.detail)

    childVm.$root = this.$vm.$root
    delete instances[webviewId + '_' + nodeId]
  }
}
