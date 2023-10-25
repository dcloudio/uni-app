import Vue from 'vue'

import {
  stringifyQuery
} from 'uni-shared/query'

import {
  initData,
  initHooks,
  initUnknownHooks,
  handleEvent,
  initBehaviors,
  initVueComponent,
  PAGE_EVENT_HOOKS
} from 'uni-wrapper/util'

import { handleLink, initBehavior } from '../../../mp-weixin/runtime/wrapper/util'

import {
  handleWrap,
  initSpecialMethods
} from './util'

const hooks = [
  'onShow',
  'onHide',
  'onUnload'
]

hooks.push(...PAGE_EVENT_HOOKS)

export default function parsePage (vuePageOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vuePageOptions)

  const pageOptions = {
    mixins: initBehaviors(vueOptions, initBehavior),
    data: initData(vueOptions, Vue.prototype),
    onLoad (query) {
      const properties = this.props

      this.__query = query
      this.__options = {
        mpType: 'page',
        mpInstance: this,
        propsData: properties
      }
    },
    onReady () {
      // initChildVues(this)
      // 初始化 vue 实例
      this.$vm = new VueComponent(this.__options)

      // 触发首次 setData
      this.$vm.$mount()

      initSpecialMethods(this)
      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted')

      // mounted => onLoad
      this.options = this.__query
      this.$vm.$mp.query = this.__query // 兼容 mpvue
      const copyQuery = Object.assign({}, this.__query)
      delete copyQuery.__id__
      this.$page = {
        fullPath: '/' + this.route + stringifyQuery(copyQuery)
      }

      this.$vm.__call_hook('onLoad', this.__query)
      setTimeout(() => {
        this.$vm.__call_hook('onReady')
      })
    },
    onUnload () {
      this.$vm.__call_hook('onUnload')
      this.$vm.$destroy()
    },
    // __r: handleRef,
    __e: handleEvent,
    __l: handleLink,
    __w: handleWrap,
    triggerEvent: function noop () {}
  }

  initHooks(pageOptions, hooks, vueOptions)
  initUnknownHooks(pageOptions, vueOptions, ['onReady'])

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      pageOptions[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      }
    })
  }

  return pageOptions
}
