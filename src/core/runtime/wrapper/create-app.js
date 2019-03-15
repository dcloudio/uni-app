import Vue from 'vue'

import {
  initRefs,
  initHooks,
  initMocks,
  initChildren
} from './util'

const hooks = [
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound'
]

export function createApp (vueOptions) {
  vueOptions = vueOptions.default || vueOptions
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
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
      delete this.$options.mpType
      delete this.$options.mpInstance

      if (this.mpType !== 'app') {
        initRefs(this)
        initMocks(this)
        initChildren(this)
      }
    }
  })

  const appOptions = {
    onLaunch (args) {
      this.$vm = new Vue(Object.assign(vueOptions, {
        mpType: 'app',
        mpInstance: this
      }))

      this.$vm.$mount()
      setTimeout(() => this.$vm.__call_hook('onLaunch', args))
    }
  }

  initHooks(appOptions, hooks, true) // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions)

  return vueOptions
}
