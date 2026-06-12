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

export function initChildVues (vm) {
  if (vm._$childVues) {
    vm._$childVues.forEach(([createdVm]) => createdVm())
    vm._$childVues.forEach(([, mountedVm]) => mountedVm())
    delete vm._$childVues
  }
}

export function initComponentLifecycle (mpInstance) {
  const vm = mpInstance.$vm
  if (!vm || vm.mpType === 'page' || vm._isMounted) {
    return
  }
  const parentVm = vm.$parent
  const createdVm = function () {
    vm.__call_hook('created')
  }
  const mountedVm = function () {
    if (vm._isMounted) {
      return
    }
    initChildVues(vm)
    vm.__call_hook('beforeMount')
    vm._isMounted = true
    vm.__call_hook('mounted')
    vm.__call_hook('onReady')
  }
  // 父实例未 mounted 时先挂起，避免首页组件早于页面 ready 时丢失生命周期。
  if (!parentVm || parentVm._isMounted) {
    createdVm()
    mountedVm()
  } else {
    (parentVm._$childVues || (parentVm._$childVues = [])).push([createdVm, mountedVm])
  }
}

export function initRelation ({
  options,
  mpInstance
}) {
  // triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  const nodeId = mpInstance.nodeId + ''
  const webviewId = mpInstance.pageinstance.__pageId__ + ''

  instances[webviewId + '_' + nodeId] = mpInstance

  Object.assign(options, {
    nodeId,
    webviewId
  })

  handleLink.call(mpInstance, {
    detail: options
  })
}

export function handleLink ({
  detail
}) {
  const { nodeId, webviewId } = detail
  const mpInstance = instances[webviewId + '_' + nodeId]
  if (!mpInstance) {
    return
  }

  const owner = instances[webviewId + '_' + mpInstance.ownerId]
  let parentVm = owner && owner.$vm

  if (!parentVm) {
    parentVm = this.$vm
  }

  detail.parent = parentVm
}
