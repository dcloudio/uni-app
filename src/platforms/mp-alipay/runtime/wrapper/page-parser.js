import Vue from 'vue'

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
  initBehavior,
  initChildVues
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
  let [VueComponent, vueOptions] = initVueComponent(Vue, vuePageOptions)

  const pageOptions = {
    mixins: initBehaviors(vueOptions, initBehavior),
    data: initData(vueOptions, Vue.prototype),
    onLoad (args) {
      const properties = this.props

      const options = {
        mpType: 'page',
        mpInstance: this,
        propsData: properties
      }

      // 初始化 vue 实例
      this.$vm = new VueComponent(options)

      // 触发首次 setData
      this.$vm.$mount()

      this.$vm.$mp.query = args // 兼容 mpvue
      this.$vm.__call_hook('onLoad', args)
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
    __r: handleRef,
    __e: handleEvent,
    __l: handleLink
  }

  initHooks(pageOptions, hooks)

  return pageOptions
}
