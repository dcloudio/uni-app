import { ComponentPublicInstance } from 'vue'
import { MPComponentInstance } from '@dcloudio/uni-mp-core'

import {
  instances,
  initProvide,
  initInjections,
} from '@dcloudio/uni-mp-toutiao'
import { ON_READY } from '@dcloudio/uni-shared'

export { mocks, isPage } from '@dcloudio/uni-mp-baidu'

export {
  parseComponent as parse,
  initComponentLifetimes as initLifetimes,
} from '@dcloudio/uni-mp-toutiao'

interface RelationOptions {
  nodeId: string
  webviewId: string
}

export function initRelation(mpInstance: MPComponentInstance) {
  // triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  const nodeId = mpInstance.nodeId + ''
  const webviewId = (mpInstance as any).pageinstance.__pageId__ + ''
  instances[webviewId + '_' + nodeId] = mpInstance.$vm!
  mpInstance.triggerEvent('__l', {
    nodeId,
    webviewId,
  })
}

export function handleLink(
  this: MPComponentInstance,
  {
    detail: { nodeId, webviewId },
  }: {
    detail: RelationOptions
  }
) {
  const vm = instances[webviewId + '_' + nodeId] as ComponentPublicInstance & {
    _$childVues?: [Function, Function][]
  }
  if (!vm) {
    return
  }
  let parentVm = instances[
    webviewId + '_' + (vm.$scope as any).ownerId
  ] as ComponentPublicInstance & {
    _$childVues?: [Function, Function][]
  }
  if (!parentVm) {
    parentVm = this.$vm!
  }

  vm.$.parent = parentVm.$

  const createdVm = function () {
    if (__VUE_OPTIONS_API__) {
      ;(parentVm as any).$children.push(vm)
      const parent = parentVm.$ as any
      ;(vm.$ as any).provides = parent
        ? parent.provides
        : Object.create(parent.appContext.provides)
      initInjections(vm)
      initProvide(vm)
    }
    vm.$callCreatedHook()
  }
  const mountedVm = function () {
    // 处理当前 vm 子
    if (vm._$childVues) {
      vm._$childVues.forEach(([createdVm]) => createdVm())
      vm._$childVues.forEach(([, mountedVm]) => mountedVm())
      delete vm._$childVues
    }
    vm.$callHook('mounted')
    vm.$callHook(ON_READY)
  }
  // 当 parentVm 已经 mounted 时，直接触发，否则延迟
  if (!parentVm || parentVm.$.isMounted) {
    createdVm()
    mountedVm()
  } else {
    ;(parentVm._$childVues || (parentVm._$childVues = [])).push([
      createdVm,
      mountedVm,
    ])
  }
}
