import {
  isPage
} from 'uni-helpers/index'

import {
  initEvents,
  processEvent
} from './events'

import initBehaviors from './behaviors'

import {
  createComponentDescriptor
} from './wxs/component-descriptor'

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

    const findUniTarget = function ($event, $el) {
      let target = $event.target
      for (; target && target !== $el; target = target.parentNode) {
        if (target.tagName && target.tagName.indexOf('UNI-') === 0) {
          break
        }
      }
      return target
    }

    Vue.prototype.$handleEvent = function ($event) {
      if ($event instanceof Event) { // 未处理的 event 对象 需要对 target 校正及包装
        // 查找 uniTarget
        const target = findUniTarget($event, this.$el)
        $event = processEvent.call(this, $event.type, $event, {}, target || $event.target, $event.currentTarget)
      }
      return $event
    }

    Vue.prototype.$getComponentDescriptor = function (vm, isOwnerInstance) {
      return createComponentDescriptor(vm || this, isOwnerInstance)
    }

    Object.defineProperty(Vue.prototype, '$ownerInstance', {
      get () {
        return this.$getComponentDescriptor(this)
      }
    })

    Vue.prototype.$handleWxsEvent = function ($event) {
      if ($event instanceof Event) { // 未处理的 event 对象 需要对 target 校正及包装
        const currentTarget = $event.currentTarget
        const instance = currentTarget &&
          currentTarget.__vue__ &&
          currentTarget.__vue__.$getComponentDescriptor(currentTarget.__vue__, false)
        const $origEvent = $event
        $event = processEvent.call(this, $origEvent.type, $origEvent, {}, findUniTarget($origEvent, this.$el) || $origEvent.target,
          $origEvent.currentTarget)
        $event.instance = instance
        $event.preventDefault = function () {
          return $origEvent.preventDefault()
        }
        $event.stopPropagation = function () {
          return $origEvent.stopPropagation()
        }
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

        if (__PLATFORM__ === 'h5' && isPage(this)) {
          options.mounted = options.mounted ? [].concat(pageMounted, options.mounted) : [pageMounted]
        }
      }
    })
  }

}
