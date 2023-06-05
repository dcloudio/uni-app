import {
  EventChannel,
  invokeArrayFns,
  SLOT_DEFAULT_NAME,
} from '@dcloudio/uni-shared'
import { capitalize, hasOwn, isArray } from '@vue/shared'

import {
  ComponentPublicInstance,
  ComponentInternalInstance,
  // @ts-ignore
  devtoolsComponentRemoved,
  // @ts-ignore
  devtoolsComponentAdded,
} from 'vue'
import { MPComponentInstance } from './component'

const MP_METHODS = [
  'createSelectorQuery',
  'createIntersectionObserver',
  'selectAllComponents',
  'selectComponent',
]

function createEmitFn(oldEmit: Function, ctx: Record<string, any>) {
  return function emit(
    this: ComponentPublicInstance,
    event: string,
    ...args: any[]
  ) {
    const scope = ctx.$scope as MPComponentInstance
    if (scope && event) {
      const detail: Record<string, any> = { __args__: args }
      // 百度小程序，快手小程序，自定义组件不能绑定动态事件
      if (
        __PLATFORM__ === 'mp-baidu' ||
        __PLATFORM__ === 'mp-kuaishou' ||
        __PLATFORM__ === 'mp-xhs'
      ) {
        detail.__ins__ = scope
      }
      if (__PLATFORM__ === 'mp-jd') {
        // 京东小程序 triggerEvent 只读
        ;(scope._triggerEvent || scope.triggerEvent)(event, detail)
      } else {
        scope.triggerEvent(event, detail)
      }
    }
    if (__PLATFORM__ === 'mp-alipay') {
      const props = scope.props as unknown as Record<string, unknown>
      if (props && props[`on${capitalize(event)}`]) {
        return
      }
    }
    return oldEmit.apply(this, [event, ...args])
  }
}

export interface CreateComponentOptions {
  mpType: 'app' | 'page' | 'component'
  mpInstance: any
  slots?: string[]
  parentComponent?: ComponentInternalInstance
  onBeforeSetup?: Function
}

export function initBaseInstance(
  instance: ComponentInternalInstance,
  options: CreateComponentOptions
) {
  const ctx = (instance as any).ctx
  // mp
  ctx.mpType = options.mpType // @deprecated
  ctx.$mpType = options.mpType
  ctx.$mpPlatform = __PLATFORM__
  ctx.$scope = options.mpInstance

  // TODO @deprecated
  ctx.$mp = {}
  if (__VUE_OPTIONS_API__) {
    ctx._self = {}
  }

  // slots
  instance.slots = {}
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true as any
    })
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true as any
    }
  }

  ctx.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    if (__PLATFORM__ === 'mp-weixin') {
      return options.mpInstance.getOpenerEventChannel()
    }
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel()
    }
    return this.__eventChannel__
  }

  ctx.$hasHook = hasHook
  ctx.$callHook = callHook

  // $emit
  instance.emit = createEmitFn(instance.emit, ctx)
}

export function initComponentInstance(
  instance: ComponentInternalInstance,
  options: CreateComponentOptions
) {
  initBaseInstance(instance, options)

  const ctx = (instance as any).ctx
  MP_METHODS.forEach((method) => {
    ctx[method] = function (...args: any[]) {
      const mpInstance = ctx.$scope as MPComponentInstance
      if (mpInstance && mpInstance[method]) {
        return (mpInstance[method] as Function).apply(mpInstance, args)
      }
      if (__PLATFORM__ === 'mp-alipay') {
        return (my as any)[method] && (my as any)[method].apply(my, args)
      }
    }
  })
}

export function initMocks(
  instance: ComponentInternalInstance,
  mpInstance: MPComponentInstance,
  mocks: string[]
) {
  const ctx = (instance as any).ctx
  mocks.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      ;(instance as any)[mock] = ctx[mock] = mpInstance[mock]
    }
  })
}

function hasHook(this: ComponentPublicInstance, name: string) {
  const hooks = (this.$ as any)[name]
  if (hooks && hooks.length) {
    return true
  }
  return false
}

function callHook(this: ComponentPublicInstance, name: string, args?: unknown) {
  if (name === 'mounted') {
    callHook.call(this, 'bm') // beforeMount
    this.$.isMounted = true
    name = 'm'
  }
  if (__PLATFORM__ !== 'mp-weixin') {
    if (name === 'onLoad' && args && (args as any).__id__) {
      ;(this as any).__eventChannel__ = __GLOBAL__.getEventChannel(
        (args as any).__id__
      )
      delete (args as any).__id__
    }
  }
  // 处理飞书小程序页面切换uni-vue-devtools无法更新数据问题
  if (
    __PLATFORM__ === 'mp-lark' &&
    __VUE_PROD_DEVTOOLS__ &&
    name === 'onShow'
  ) {
    devtoolsComponentRemoved(this.$)
    devtoolsComponentAdded(this.$)
  }
  const hooks = (this.$ as any)[name]
  return hooks && invokeArrayFns(hooks, args)
}
