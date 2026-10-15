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
import {
  createPendingComponent,
  hasPendingComponent,
  isPendingVirtualHost,
  pendingRelationsKey,
  setComponentVirtualHost,
} from './componentLifetimes'

export { initLifetimes } from './componentLifetimes'

interface RelationDetail {
  vuePid?: string
  nodeId: number
  webviewId: string
  pageVm?: ComponentPublicInstance
}

interface RelationEvent {
  detail: RelationDetail
  receiver?: MPComponentInstance
}

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

export const instances: Record<
  string,
  ComponentPublicInstance | MPComponentInstance
> = Object.create(null)

const pendingRelationInstances = new Set<MPComponentInstance>()

function queueRelation(
  mpInstance: MPComponentInstance,
  event: RelationEvent,
  receiver: MPComponentInstance
) {
  const relations = (mpInstance as any)[pendingRelationsKey] as
    | RelationEvent[]
    | undefined
  if (
    relations?.some(
      ({ detail }) =>
        detail.nodeId === event.detail.nodeId &&
        detail.webviewId === event.detail.webviewId &&
        detail.vuePid === event.detail.vuePid
    )
  ) {
    return
  }
  const pendingEvent = Object.assign({}, event, { receiver })
  if (relations) {
    relations.push(pendingEvent)
  } else {
    ;(mpInstance as any)[pendingRelationsKey] = [pendingEvent]
  }
  pendingRelationInstances.add(mpInstance)
}

function takePendingRelations(mpInstance: MPComponentInstance) {
  const relations =
    ((mpInstance as any)[pendingRelationsKey] as RelationEvent[]) || []
  delete (mpInstance as any)[pendingRelationsKey]
  pendingRelationInstances.delete(mpInstance)
  return relations
}

function retryPendingRelations() {
  const pending: Array<{
    mpInstance: MPComponentInstance
    relation: RelationEvent
  }> = []
  pendingRelationInstances.forEach((mpInstance) => {
    const relations = (mpInstance as any)[pendingRelationsKey] as
      | RelationEvent[]
      | undefined
    delete (mpInstance as any)[pendingRelationsKey]
    pendingRelationInstances.delete(mpInstance)
    relations?.forEach((relation) => pending.push({ mpInstance, relation }))
  })
  pending.forEach(({ mpInstance, relation }) => {
    handleToutiaoLink.call(relation.receiver || mpInstance, relation)
  })
}

export function initRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, any>
) {
  if (__PLATFORM__ === 'mp-toutiao') {
    return initToutiaoRelation(mpInstance, detail)
  }

  // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  const nodeId = (hasOwn(mpInstance, '__nodeId__')
    ? mpInstance.__nodeId__
    : mpInstance.__nodeid__) as unknown as number
  const webviewId = mpInstance.__webviewId__ + ''
  instances[webviewId + '_' + nodeId] = mpInstance.$vm!

  // 使用 virtualHost 后，头条不支持 triggerEvent，通过主动调用方法抹平差异
  if (
    __PLATFORM__ === 'mp-lark' &&
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

function initToutiaoRelation(
  mpInstance: MPComponentInstance,
  detail: Record<string, any>
) {
  const nodeId = (hasOwn(mpInstance, '__nodeId__')
    ? mpInstance.__nodeId__
    : mpInstance.__nodeid__) as unknown as number
  const webviewId = mpInstance.__webviewId__ + ''
  instances[webviewId + '_' + nodeId] = mpInstance.$vm || mpInstance
  const relationDetail: RelationDetail = {
    vuePid: detail.vuePid,
    nodeId,
    webviewId,
  }

  if (isPendingVirtualHost(mpInstance)) {
    nextSetDataTick(mpInstance, () => {
      relationDetail.pageVm = instances[
        webviewId + '_0'
      ] as ComponentPublicInstance
      handleLink.call(mpInstance, { detail: relationDetail })
    })
  } else {
    mpInstance.triggerEvent('__l', relationDetail)
  }
}

export function handleLink(
  this: MPComponentInstance,
  {
    detail: { vuePid, nodeId, webviewId, pageVm },
  }: {
    detail: RelationDetail
  }
) {
  if (__PLATFORM__ === 'mp-toutiao') {
    return handleToutiaoLink.call(this, {
      detail: { vuePid, nodeId, webviewId, pageVm },
    })
  }

  const vm = instances[webviewId + '_' + nodeId] as ComponentPublicInstance
  if (!vm) {
    return
  }

  let parentVm
  if (vuePid) {
    parentVm = findVmByVueId(pageVm || this.$vm!, vuePid)
    // fallback从页面查找，当组件嵌套关系比较复杂时，可能会需要回退到这里，比如: question/207952 开发者自定义组件里引用了uni-grid组件（该组件使用了provide/inject,强依赖父子关系）
    if (!pageVm) {
      pageVm = instances[webviewId + '_0'] as ComponentPublicInstance
      if (pageVm) {
        parentVm = findVmByVueId(pageVm, vuePid)
      }
    }
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

function findVmById(
  root: ComponentPublicInstance,
  vuePid: string
): ComponentPublicInstance | undefined {
  const scope = (root as any).$scope
  if (scope && scope._$vueId === vuePid) {
    return root
  }
  return findVmByVueId(root, vuePid)
}

function findNativeWrapperOwner(
  mpInstance: MPComponentInstance,
  pageVm: ComponentPublicInstance | undefined,
  webviewId: string
) {
  const root =
    pageVm || (instances[webviewId + '_0'] as ComponentPublicInstance)
  if (!root) {
    return
  }
  const vuePid = mpInstance._$vuePid
  return vuePid ? findVmById(root, vuePid) : root
}

function handleToutiaoLink(this: MPComponentInstance, event: RelationEvent) {
  const { vuePid, nodeId, webviewId, pageVm } = event.detail
  const childMPInstance = instances[
    webviewId + '_' + nodeId
  ] as MPComponentInstance
  if (!childMPInstance) {
    return
  }

  const relationRoot =
    pageVm ||
    this.$vm ||
    (hasPendingComponent(this)
      ? undefined
      : findNativeWrapperOwner(this, pageVm, webviewId))
  if (!relationRoot) {
    queueRelation(childMPInstance, event, this)
    return
  }

  let parentVm = vuePid ? findVmById(relationRoot, vuePid) : relationRoot
  if (!parentVm && this.$vm && !hasPendingComponent(this)) {
    parentVm = this.$vm
  }
  if (!parentVm && !this.$vm && !hasPendingComponent(this)) {
    parentVm = relationRoot
  }
  if (!parentVm) {
    queueRelation(childMPInstance, event, this)
    return
  }

  const vm = createPendingComponent(childMPInstance, parentVm)
  if (!vm) {
    return
  }
  instances[webviewId + '_' + nodeId] = vm
  vm.$callCreatedHook()

  takePendingRelations(childMPInstance).forEach((relation) => {
    handleToutiaoLink.call(relation.receiver || childMPInstance, relation)
  })
  retryPendingRelations()

  nextSetDataTick(childMPInstance, () => {
    vm.$callHook('mounted')
    vm.$callHook(ON_READY)
  })
}

export function parse(
  componentOptions: MPComponentOptions,
  { handleLink }: Partial<ParseComponentOptions>
) {
  if (__PLATFORM__ === 'mp-toutiao') {
    const attached = componentOptions.lifetimes?.attached
    if (attached) {
      const virtualHost = componentOptions.options?.virtualHost === true
      componentOptions.lifetimes!.attached = function (
        this: MPComponentInstance
      ) {
        setComponentVirtualHost(this, virtualHost)
        attached.call(this)
      }
    }
  }
  componentOptions.methods!.__l = handleLink!
}
