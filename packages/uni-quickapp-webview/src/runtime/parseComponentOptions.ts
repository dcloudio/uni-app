import type {
  MPComponentInstance,
  RelationOptions,
} from '@dcloudio/uni-mp-core'

import { extend } from '@vue/shared'
import { instances } from '@dcloudio/uni-mp-toutiao'

export { mocks } from '@dcloudio/uni-mp-baidu'

export function isPage(mpInstance: MPComponentInstance) {
  return (
    !!mpInstance.route ||
    !!((mpInstance._methods || mpInstance.methods || mpInstance) as any).onLoad
  )
}
export {
  parseComponent as parse,
  initComponentLifetimes as initLifetimes,
} from '@dcloudio/uni-mp-toutiao'

export function initRelation(
  mpInstance: MPComponentInstance,
  relationOptions: RelationOptions
) {
  const nodeId = mpInstance.nodeId + ''
  const webviewId = (mpInstance as any).pageinstance.__pageId__ + ''
  // 存储的是当前mpInstance，而不是$vm，因为$vm还没有创建
  instances[webviewId + '_' + nodeId] = mpInstance
  // 不使用 triggerEvent 是因为时机太晚，应该同步建立父子关系，确保setup中的provide/inject正常
  // 当前平台有ownerId可以查找父子关系
  extend(relationOptions, {
    nodeId,
    webviewId,
  })
  handleLink.call(mpInstance, {
    detail: relationOptions,
  })
}

export function handleLink(
  this: MPComponentInstance,
  {
    detail,
  }: {
    detail: RelationOptions
  }
) {
  const { nodeId, webviewId } = detail
  const mpInstance = instances[webviewId + '_' + nodeId] as MPComponentInstance
  if (!mpInstance) {
    return
  }
  let parentVm = (
    instances[webviewId + '_' + mpInstance.ownerId] as MPComponentInstance
  )?.$vm

  if (!parentVm) {
    parentVm = this.$vm!
  }

  detail.parent = parentVm
}
