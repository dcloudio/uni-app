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

  instances[webviewId + '_' + nodeId] = mpInstance

  handleLink.call(mpInstance, {
    detail: {
      nodeId,
      webviewId,
      vuePid
    }
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
