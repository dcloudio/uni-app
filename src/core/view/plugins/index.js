import {
  isPage
} from 'uni-helpers/index'

import {
  initEvents,
  processEvent
} from './events'

import initBehaviors from './behaviors'

function pageMounted () {
  // 通知 Service，View 层已 ready
  UniViewJSBridge.publishHandler('onPageReady', {}, this.$page.id)
}
/**
 * View 层 Vue 插件
 * 1.init events
 * 2.$trigger
 * 3.$handleProxy
 */
export default {
  install (Vue, {
    routes
  } = {}) {
    initEvents()

    Vue.prototype.$handleEvent = function ($event) {
      if ($event instanceof Event) { // 未处理的 event 对象 需要对 target 校正及包装
        // 查找 uniTarget
        let target = $event.target
        const $el = this.$el
        for (; target && target !== $el; target = target.parentNode) {
          if (target.tagName && target.tagName.indexOf('UNI-') === 0) {
            break
          }
        }
        $event = processEvent.call(this, $event.type, $event, {}, target || $event.target, $event.currentTarget)
      }
      return $event
    }

    Vue.mixin({
      beforeCreate () {
        const options = this.$options

        const wxs = options.wxs
        if (wxs) {
          Object.keys(wxs).forEach(module => {
            this[module] = wxs[module]
          })
        }

        if (options.behaviors && options.behaviors.length) {
          initBehaviors(options, this)
        }

        if (isPage(this)) {
          options.mounted = options.mounted ? [].concat(pageMounted, options.mounted) : [pageMounted]
        }
      }
    })
    // TODO 跨平台时，View 层需要注入$page属性
  }

}
