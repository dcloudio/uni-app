import initVue from 'uni-core/vue'

import {
  initPolyfill
} from 'uni-core/service/plugins/polyfill'

import EventChannel from 'uni-helpers/EventChannel'

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

import {
  uniIdMixin
} from 'uni-shared'

export default {
  install (Vue, options) {
    initVue(Vue)

    initData(Vue)
    initLifecycle(Vue)

    initPolyfill(Vue)

    uniIdMixin(Vue)

    Vue.prototype.getOpenerEventChannel = function () {
      if (!this.$root.$scope.eventChannel) {
        this.$root.$scope.eventChannel = new EventChannel()
      }
      return this.$root.$scope.eventChannel
    }

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
        if (weex.config.preload) { // preload
          if (process.env.NODE_ENV !== 'production') {
            console.log('[uni-app] preload app-service.js')
          }
          const globalEvent = weex.requireModule('globalEvent')
          globalEvent.addEventListener('launchApp', () => {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[uni-app] launchApp')
            }
            plus.updateConfigInfo && plus.updateConfigInfo()
            registerApp(this, Vue)
            oldMount.call(this, el, hydrating)
          })
          return
        }
        registerApp(this, Vue)
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
