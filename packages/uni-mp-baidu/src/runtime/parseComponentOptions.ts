import { hasOwn } from '@vue/shared'
import {
  type MPComponentInstance,
  type MPComponentOptions,
  fixSetDataEnd,
  fixSetDataStart,
  handleEvent,
  initMocks,
  initPageInstance,
  nextSetDataTick,
} from '@dcloudio/uni-mp-core'
import { ON_INIT, ON_LOAD, ON_SHOW } from '@dcloudio/uni-shared'

export { handleLink, initLifetimes } from '@dcloudio/uni-mp-weixin'

export const mocks = ['nodeId', 'componentName', '_componentId', 'uniquePrefix']

export function isPage(mpInstance: MPComponentInstance) {
  return !!(mpInstance.methods as any).onLoad
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
  // 百度小程序基础库 3.260 以上支持页面 onInit 生命周期，提前创建 vm 实例
  lifetimes.onInit = function onInit(query: any) {
    // 百度小程序后续可能移除 pageinstance 属性，为向后兼容进行补充
    if (!this.pageinstance || !this.pageinstance.setData) {
      const pages = getCurrentPages()
      this.pageinstance = pages[pages.length - 1]
    }
    this.pageinstance._$props = query
    // 处理百度小程序 onInit 生命周期调用 setData 无效的问题
    fixSetDataStart(this as MPComponentInstance)
    oldAttached.call(this)
    this.pageinstance.$vm = this.$vm
    if (__X__) {
      this.pageinstance.vm = this.pageinstance.$vm
    }
    initPageInstance(this.pageinstance)
    this.$vm.$callHook(ON_INIT, query)
  }
  lifetimes.attached = function attached(this: MPComponentInstance) {
    if (!this.$vm) {
      oldAttached.call(this)
    } else {
      initMocks(this.$vm.$, this, mocks)
      fixSetDataEnd(this)
    }
    if (isPage(this) && this.$vm) {
      // 百度 onLoad 在 attached 之前触发（基础库小于 3.70）
      // 百度 当组件作为页面时 pageinstance 不是原来组件的 instance
      const pageInstance = (this as any).pageinstance
      pageInstance.$vm = this.$vm
      if (__X__) {
        pageInstance.vm = pageInstance.$vm
      }
      initPageInstance(pageInstance)
      if (hasOwn(pageInstance, '_$args')) {
        this.$vm.$callHook(ON_LOAD, pageInstance._$args)
        this.$vm.$callHook(ON_SHOW)
        delete pageInstance._$args
      }
    } else {
      // 百度小程序组件不触发 methods 内的 onReady
      if (this.$vm) {
        nextSetDataTick(this, () => {
          this.$vm!.$callHook('mounted')
        })
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
  // 百度小程序自定义组件，不支持绑定动态事件，故由 __e 分发
  methods.__e = handleEvent
}
