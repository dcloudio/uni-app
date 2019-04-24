import Vue from 'vue'

import {
  isFn
} from 'uni-shared'

import {
  initPage,
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

function initVm (VueComponent) { // 百度的 onLoad 触发在 attached 之前
  if (this.$vm) {
    return
  }

  this.$vm = new VueComponent({
    mpType: 'page',
    mpInstance: this
  })

  if (__PLATFORM__ === 'mp-baidu') {
    this.$vm.$baiduComponentInstances = Object.create(null)
  }

  this.$vm.__call_hook('created')
  this.$vm.$mount()
}

export function createPage (vueOptions) {
  vueOptions = vueOptions.default || vueOptions
  let VueComponent
  if (isFn(vueOptions)) {
    VueComponent = vueOptions
    vueOptions = VueComponent.extendOptions
  } else {
    VueComponent = Vue.extend(vueOptions)
  }
  const pageOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true
    },
    data: getData(vueOptions, Vue.prototype),
    lifetimes: { // 当页面作为组件时
      attached () {
        initVm.call(this, VueComponent)
      },
      ready () {
        this.$vm.__call_hook('beforeMount')
        this.$vm._isMounted = true
        this.$vm.__call_hook('mounted')
        this.$vm.__call_hook('onReady')
      },
      detached () {
        this.$vm.$destroy()
      }
    },
    methods: { // 作为页面时
      onLoad (args) {
        initVm.call(this, VueComponent)
        if (__PLATFORM__ === 'mp-baidu') { // 百度当组件作为页面时 pageinstancce 不是原来组件的 instance
          this.pageinstance.$vm = this.$vm
        }
        this.$vm.$mp.query = args // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args) // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      onUnload () {
        this.$vm.__call_hook('onUnload')
        if (__PLATFORM__ === 'mp-baidu') { // 百度组件不会在页面 unload 时触发 detached
          baiduPageDestroy(this.$vm)
        }
      },
      __e: handleEvent,
      __l: handleLink
    }
  }

  initHooks(pageOptions.methods, hooks)

  return initPage(pageOptions, vueOptions)
}
