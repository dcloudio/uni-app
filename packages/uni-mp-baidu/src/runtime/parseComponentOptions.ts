import { hasOwn } from '@vue/shared'

import { MPComponentInstance, MPComponentOptions } from '@dcloudio/uni-mp-core'

export { handleLink, initLifetimes } from '@dcloudio/uni-mp-weixin'

export const mocks = ['nodeId', 'componentName', '_componentId', 'uniquePrefix']

export function isPage(mpInstance: MPComponentInstance) {
  return !hasOwn(mpInstance, 'ownerId')
}

export function initRelation(mpInstance: MPComponentInstance, detail: object) {
  ;(mpInstance as any).dispatch('__l', detail)
}

const newLifecycle = /*#__PURE__*/ swan.canIUse('lifecycle-2-0')

export function parse(componentOptions: MPComponentOptions) {
  const methods = componentOptions.methods as Record<
    string,
    (...args: any[]) => any
  >
  const lifetimes = componentOptions.lifetimes as Record<string, any>

  // 关于百度小程序生命周期的说明(组件作为页面时):
  // lifetimes:attached --> methods:onShow --> methods:onLoad --> methods:onReady
  // 这里在强制将onShow挪到onLoad之后触发,另外一处修改在page-parser.js
  const oldAttached = lifetimes.attached
  lifetimes.attached = function attached(this: MPComponentInstance) {
    oldAttached.call(this)
    if (isPage(this) && this.$vm) {
      // 百度 onLoad 在 attached 之前触发
      // 百度 当组件作为页面时 pageinstance 不是原来组件的 instance
      const pageInstance = (this as any).pageinstance
      pageInstance.$vm = this.$vm
      if (hasOwn(pageInstance, '_$args')) {
        this.$vm.$callHook('onLoad', pageInstance._$args)
        this.$vm.$callHook('onShow')
        delete pageInstance._$args
      }
    } else {
      // 百度小程序组件不触发methods内的onReady
      if (this.$vm) {
        this.$vm.$callHook('mounted')
      }
    }
  }

  if (newLifecycle) {
    methods.onReady = lifetimes.ready
    delete lifetimes.ready
  }
  ;(componentOptions as any).messages = {
    __l: methods.__l,
  }
  delete methods.__l
}
