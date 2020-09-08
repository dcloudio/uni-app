import Vue from 'vue'

import {
  initHooks,
  initMocks
} from 'uni-wrapper/util'

const hooks = [
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound'
]

export default function parseBaseApp (vm, {
  mocks,
  initRefs
}) {
  if (vm.$options.store) {
    Vue.prototype.$store = vm.$options.store
  }

  Vue.prototype.mpHost = __PLATFORM__

  Vue.mixin({
    beforeCreate () {
      if (!this.$options.mpType) {
        return
      }

      this.mpType = this.$options.mpType

      this.$mp = {
        data: {},
        [this.mpType]: this.$options.mpInstance
      }

      this.$scope = this.$options.mpInstance

      delete this.$options.mpType
      delete this.$options.mpInstance

      if (this.mpType !== 'app') {
        initRefs(this)
        initMocks(this, mocks)
      }
    }
  })

  const appOptions = {
    onLaunch (args) {
      if (this.$vm) { // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return
      }

      this.$vm = vm

      this.$vm.$mp = {
        app: this
      }

      this.$vm.$scope = this
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData

      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted', args)

      this.$vm.__call_hook('onLaunch', args)
    }
  }

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {}
  // 将 methods 中的方法挂在 getApp() 中
  const methods = vm.$options.methods
  if (methods) {
    Object.keys(methods).forEach(name => {
      appOptions[name] = methods[name]
    })
  }

  initHooks(appOptions, hooks)

  return appOptions
}
