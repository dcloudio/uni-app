import type {
  MPComponentInstance,
  RelationOptions,
} from '@dcloudio/uni-mp-core'

import { findVmByVueId } from '@dcloudio/uni-mp-core'

export { initLifetimes } from './lifetimes'

export const mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__']

export function isPage(mpInstance: MPComponentInstance) {
  return !!mpInstance.route
}

export function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, unknown>
) {
  mpInstance.triggerEvent('__l', detail)
}

export function handleLink(this: MPComponentInstance, event: unknown) {
  // detail 是微信,value 是百度(dipatch)
  const detail = ((event as any).detail ||
    (event as any).value) as RelationOptions
  const vuePid = detail.vuePid
  let parentVm

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm!, vuePid)
  }

  if (!parentVm) {
    parentVm = this.$vm
  }

  detail.parent = parentVm
}
