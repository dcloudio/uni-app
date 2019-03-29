import Vue from 'vue'

import {
  isFn
} from 'uni-shared'

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

function attached (VueComponent) {
  if (__PLATFORM__ === 'mp-baidu') {
    this.$baiduComponentInstances = Object.create(null)
  }

  this.$vm = new VueComponent({
    mpType: 'page',
    mpInstance: this
  })

  this.$vm.__call_hook('created')
  this.$vm.$mount()
}

function ready () {
  this.$vm.__call_hook('beforeMount')
  this.$vm._isMounted = true
  this.$vm.__call_hook('mounted')
  this.$vm.__call_hook('onReady')
}

function detached () {
  this.$vm.__call_hook('onUnload')
  if (__PLATFORM__ === 'mp-baidu') { // 百度组件不会在页面 unload 时触发 detached
    baiduPageDestroy(this.$vm)
  } else {
    this.$vm.$destroy()
  }
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
        attached.call(this, VueComponent)
      },
      ready () {
        ready.call(this)
      },
      detached () {
        detached.call(this)
      }
    },
    methods: { // 作为页面时
      onLoad (args) {
        this.$vm.$mp.query = args // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args) // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      __e: handleEvent,
      __l: handleLink
    }
  }

  initHooks(pageOptions.methods, hooks)

  return Component(pageOptions)
}
