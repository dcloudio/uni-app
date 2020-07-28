import { MPComponentOptions, MPComponentInstance } from '@dcloudio/uni-mp-core'

import { parse as parseComponentOptions } from './parseComponentOptions'

export { handleLink, initLifetimes } from '@dcloudio/uni-mp-weixin'

export { mocks, isPage, initRelation } from './parseComponentOptions'

export function parse(pageOptions: MPComponentOptions) {
  parseComponentOptions(pageOptions)

  const methods = pageOptions.methods as Record<string, (...args: any[]) => any>
  // 纠正百度小程序生命周期methods:onShow在methods:onLoad之前触发的问题
  methods.onShow = function onShow(this: MPComponentInstance) {
    if (this.$vm && this._$loaded) {
      this.$vm.$callHook('onShow')
    }
  }

  methods.onLoad = function onLoad(this: MPComponentInstance, args) {
    // 百度 onLoad 在 attached 之前触发，先存储 args, 在 attached 里边触发 onLoad
    if (this.$vm) {
      ;(this as any)._$loaded = true
      this.$vm.$callHook('onLoad', args)
      this.$vm.$callHook('onShow')
    } else {
      ;(this as any).pageinstance._$args = args
    }
  }
}
