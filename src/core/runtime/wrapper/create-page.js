import Vue from 'vue'

import {
  getData,
  initRefs,
  initHooks,
  initMethods,
  handleLink,
  handleEvent
} from './util'

const hooks = [
  'onShow',
  'onHide',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
  'onBackPress',
  'onNavigationBarButtonTap',
  'onNavigationBarSearchInputChanged',
  'onNavigationBarSearchInputConfirmed',
  'onNavigationBarSearchInputClicked'
]

export function createPage (vueOptions) {
  vueOptions = vueOptions.default || vueOptions
  const pageOptions = {
    data: getData(vueOptions.data),
    onLoad (args) {
      this.$vm = new Vue(vueOptions)
      this.$vm.mpType = 'page'
      this.$vm.$mp = {
        data: {},
        page: this
      }

      initRefs(this.$vm)

      this.$vm.$mount()
      this.$vm.__call_hook('onLoad', args)
    },
    onReady () {
      this.$vm._isMounted = true
      this.$vm.__call_hook('onReady')
    },
    onUnload () {
      this.$vm.__call_hook('onUnload')
      this.$vm.$destroy()
    },
    __e: handleEvent,
    __l: handleLink
  }

  initHooks(pageOptions, hooks)

  initMethods(pageOptions, vueOptions)

  return Page(pageOptions)
}
