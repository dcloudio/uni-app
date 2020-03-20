import initVue from 'uni-core/vue'

import {
  initPolyfill
} from 'uni-core/service/plugins/polyfill'

import {
  registerApp
} from '../app'

import {
  initData
} from './data'

import {
  initLifecycle
} from './lifecycle'

import {
  vdSyncCallbacks
} from '../subscribe-handlers/on-vd-sync-callback'

export default {
  install (Vue, options) {
    initVue(Vue)

    initData(Vue)
    initLifecycle(Vue)

    initPolyfill(Vue)

    Object.defineProperty(Vue.prototype, '$page', {
      get () {
        return this.$root.$scope.$page
      }
    })
    // 兼容旧版本
    Object.defineProperty(Vue.prototype, '$mp', {
      get () {
        return {
          page: this.$root.$scope
        }
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

    Vue.prototype.$nextTick = function nextTick (cb) {
      const renderWatcher = this._watcher
      const callback = typeof cb === 'function'
      const result = new Promise((resolve) => {
        if (
          renderWatcher &&
          this._$queue.find(watcher => renderWatcher === watcher)
        ) {
          vdSyncCallbacks.push(callback ? cb.bind(this) : resolve)
        } else {
          // $nextTick bind vm context
          Vue.nextTick(callback ? () => cb.call(this) : resolve)
        }
        callback && resolve()
      })
      return callback ? undefined : result
    }
  }
}
