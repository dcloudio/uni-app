import { hasOwn } from '@vue/shared'
import type { ComponentPublicInstance } from 'vue'
import {
  type MPComponentInstance,
  type MPComponentOptions,
  nextSetDataTick,
} from '@dcloudio/uni-mp-core'

import { findVmByVueId } from '@dcloudio/uni-mp-core'

import type { ParseComponentOptions } from 'packages/uni-mp-core/src/runtime/component'
import { ON_READY } from '@dcloudio/uni-shared'

export { initLifetimes } from './componentLifetimes'

export const mocks = [
  '__route__',
  '__webviewId__',
  '__nodeId__',
  '__nodeid__' /* @Deprecated */,
]

export function isPage(mpInstance: MPComponentInstance) {
  return (
    (mpInstance as any).__nodeId__ === 0 || (mpInstance as any).__nodeid__ === 0
  )
}

interface RelationOptions {
  vuePid: string
  nodeId: number
  webviewId: string
}

export const instances: Record<
  string,
  ComponentPublicInstance | MPComponentInstance
> = Object.create(null)

export function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, any>
) {
  // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  const nodeId = (hasOwn(mpInstance, '__nodeId__')
    ? mpInstance.__nodeId__
    : mpInstance.__nodeid__) as unknown as number
  const webviewId = mpInstance.__webviewId__ + ''
  instances[webviewId + '_' + nodeId] = mpInstance.$vm!

  // 使用 virtualHost 后，头条不支持 triggerEvent，通过主动调用方法抹平差异
  if (
    (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') &&
    mpInstance?.$vm?.$options?.options?.virtualHost
  ) {
    nextSetDataTick(mpInstance, () => {
      handleLink.apply(mpInstance, [
        {
          detail: {
            vuePid: detail.vuePid,
            nodeId,
            webviewId,
            // 如果是 virtualHost，则需要找到页面 vm 传递给 handleLink，因为此时的上下文是不对的，需要从页面 vm 递归查找
            // 目前测试来看，页面的 nodeId 是 0
            pageVm: instances[webviewId + '_0'] as ComponentPublicInstance,
          },
        },
      ])
    })
  } else {
    mpInstance.triggerEvent('__l', {
      vuePid: (detail as any).vuePid,
      nodeId,
      webviewId,
    })
  }
}

export function handleLink(
  this: MPComponentInstance,
  {
    detail: { vuePid, nodeId, webviewId, pageVm },
  }: {
    detail: RelationOptions & { pageVm?: ComponentPublicInstance }
  }
) {
  const vm = instances[webviewId + '_' + nodeId] as ComponentPublicInstance
  if (!vm) {
    return
  }

  let parentVm
  if (vuePid) {
    parentVm = findVmByVueId(pageVm || this.$vm!, vuePid)
  } else {
    // 如果 vuePid 不存在，则认为当前组件的父是页面，目前测试来看，页面的 nodeId 是 0
    parentVm = instances[webviewId + '_0']
  }
  if (parentVm) {
    vm.$.parent = parentVm.$
  }

  // 不再需要下述逻辑
  // if (this.$vm?.$options?.options?.virtualHost) {
  //   // 抖音小程序下 form 组件开启 virtualHost 出现 infinite loop. see: https://github.com/vuejs/core/blob/32a1433e0debd538c199bde18390bb903b4cde5a/packages/runtime-core/src/componentProps.ts#L227
  //   // vm.$.parent = null
  // } else {
  //   vm.$.parent = parentVm.$
  // }

  if (__VUE_OPTIONS_API__ && parentVm) {
    ;(parentVm as any).$children.push(vm)
  }
  vm.$callCreatedHook()
  // TODO 字节小程序父子组件关系建立的较晚，导致 inject 和 provide 初始化变慢
  // 由此引发在 setup 中暂不可用，只能通过 options 方式配置
  // 初始化完 inject 后，再次调用 update，触发一次更新
  if (vm.$options.inject) {
    vm.$.update()
  }
  nextSetDataTick(this, () => {
    vm.$callHook('mounted')
    vm.$callHook(ON_READY)
  })
}

export function parse(
  componentOptions: MPComponentOptions,
  { handleLink }: Partial<ParseComponentOptions>
) {
  componentOptions.methods!.__l = handleLink!
}
