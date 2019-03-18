import Vue from 'vue'

import {
  handleLink
} from 'uni-platform/runtime/wrapper/index'

import {
  getData,
  initHooks,
  handleEvent,
  baiduPageDestroy
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
    data: getData(vueOptions),
    onLoad (args) {
      if (__PLATFORM__ === 'mp-baidu') {
        this.$baiduComponentInstances = Object.create(null)
      }

      this.$vm = new Vue(Object.assign(vueOptions, {
        mpType: 'page',
        mpInstance: this
      }))

      this.$vm.$mount()
      this.$vm.__call_hook('onLoad', args)
    },
    onReady () {
      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted')
      this.$vm.__call_hook('onReady')
    },
    onUnload () {
      this.$vm.__call_hook('onUnload')
      if (__PLATFORM__ === 'mp-baidu') { // 百度组件不会在页面 unload 时触发 detached
        baiduPageDestroy(this.$vm)
      } else {
        this.$vm.$destroy()
      }
    },
    __e: handleEvent,
    __l: handleLink
  }

  initHooks(pageOptions, hooks)

  return Page(pageOptions)
}
