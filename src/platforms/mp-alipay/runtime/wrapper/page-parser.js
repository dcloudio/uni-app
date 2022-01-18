import Vue from 'vue'

import {
  stringifyQuery
} from 'uni-shared/query'

import {
  initData,
  initHooks,
  handleEvent,
  initBehaviors,
  initVueComponent,
  PAGE_EVENT_HOOKS
} from 'uni-wrapper/util'

import {
  handleRef,
  handleLink,
  handleWrap,
  initBehavior,
  triggerEvent,
  initChildVues,
  initSpecialMethods
} from './util'

const hooks = [
  'onShow',
  'onHide',
  // mp-alipay 特有
  'onTitleClick',
  'onOptionMenuClick',
  'onPopMenuClick',
  'onPullIntercept'
]

hooks.push(...PAGE_EVENT_HOOKS)

export default function parsePage (vuePageOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vuePageOptions)

  const pageOptions = {
    mixins: initBehaviors(vueOptions, initBehavior),
    data: initData(vueOptions, Vue.prototype),
    onLoad (query) {
      const properties = this.props

      const options = {
        mpType: 'page',
        mpInstance: this,
        propsData: properties
      }

      // 初始化 vue 实例
      this.$vm = new VueComponent(options)

      initSpecialMethods(this)

      // 触发首次 setData
      this.$vm.$mount()

      const copyQuery = Object.assign({}, query)
      delete copyQuery.__id__

      this.$page = {
        fullPath: '/' + this.route + stringifyQuery(copyQuery)
      }

      this.options = query
      this.$vm.$mp.query = query // 兼容 mpvue
      this.$vm.__call_hook('onLoad', query)
    },
    onReady () {
      initChildVues(this)
      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted')
      this.$vm.__call_hook('onReady')
    },
    onUnload () {
      this.$vm.__call_hook('onUnload')
      this.$vm.$destroy()
    },
    events: {
      // 支付宝小程序有些页面事件只能放在events下
      onBack () {
        this.$vm.__call_hook('onBackPress')
      }
    },
    __r: handleRef,
    __e: handleEvent,
    __l: handleLink,
    __w: handleWrap,
    triggerEvent
  }

  initHooks(pageOptions, hooks, vuePageOptions)

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      pageOptions[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      }
    })
  }

  return pageOptions
}
