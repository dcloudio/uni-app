export {
  mocks,
  isPage
}
  from '../../../mp-baidu/runtime/wrapper/util'

export {
  initRefs
}
  from '../../../mp-weixin/runtime/wrapper/util'

export const instances = Object.create(null)

export function initRelation ({
  vuePid,
  mpInstance
}) {
  // triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  const nodeId = mpInstance.nodeId + ''
  const webviewId = mpInstance.pageinstance.__pageId__ + ''

  instances[webviewId + '_' + nodeId] = mpInstance.$vm

  this.triggerEvent('__l', {
    vuePid,
    nodeId,
    webviewId
  })
}

export function handleLink ({
  detail: {
    nodeId,
    webviewId
  }
}) {
  const vm = instances[webviewId + '_' + nodeId]
  if (!vm) {
    return
  }
  let parentVm = instances[webviewId + '_' + vm.$scope.ownerId]
  if (!parentVm) {
    parentVm = this.$vm
  }

  vm.$parent = parentVm
  vm.$root = parentVm.$root
  parentVm.$children.push(vm)

  const createdVm = function () {
    vm.__call_hook('created')
  }
  const mountedVm = function () {
    // 处理当前 vm 子
    if (vm._$childVues) {
      vm._$childVues.forEach(([createdVm]) => createdVm())
      vm._$childVues.forEach(([, mountedVm]) => mountedVm())
      delete vm._$childVues
    }
    vm.__call_hook('beforeMount')
    vm._isMounted = true
    vm.__call_hook('mounted')
    vm.__call_hook('onReady')
  }
  // 当 parentVm 已经 mounted 时，直接触发，否则延迟
  if (!parentVm || parentVm._isMounted) {
    createdVm()
    mountedVm()
  } else {
    (parentVm._$childVues || (parentVm._$childVues = [])).push([createdVm, mountedVm])
  }
}
