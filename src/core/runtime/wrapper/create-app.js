import Vue from 'vue'

import {
  initHooks
} from './util'

const hooks = [
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound'
]

export function createApp (vueOptions) {
  vueOptions = vueOptions.default || vueOptions

  const appOptions = {
    onLaunch (args) {
      this.$vm = new Vue(vueOptions)
      this.$vm.mpType = 'app'
      this.$vm.$mp = {
        app: this
      }
      this.$vm.$mount()
      this.$vm.__call_hook('onLaunch', args)
    }
  }

  initHooks(appOptions, hooks)

  App(appOptions)

  return vueOptions
}
