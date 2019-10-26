import initVue from 'uni-core/vue'

import {
  registerApp
} from '../app'

import {
  initData
} from './data'

import {
  initLifecycle
} from './lifecycle'

export default {
  install (Vue, options) {
    initVue(Vue)

    initData(Vue)
    initLifecycle(Vue)

    Object.defineProperty(Vue.prototype, '$page', {
      get () {
        return this.$root.$scope.$page
      }
    })

    const oldMount = Vue.prototype.$mount
    Vue.prototype.$mount = function mount (el, hydrating) {
      if (this.mpType === 'app') {
        this.$options.render = function () {}
        registerApp(this)
      }
      return oldMount.call(this, el, hydrating)
    }
  }
}
