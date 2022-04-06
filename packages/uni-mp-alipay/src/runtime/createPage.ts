import { ComponentOptions } from 'vue'

import {
  PAGE_INIT_HOOKS,
  initData,
  initHooks,
  initUnknownHooks,
  $destroyComponent,
  initWxsCallMethods,
  initRuntimeHooks,
} from '@dcloudio/uni-mp-core'

import {
  addLeadingSlash,
  ON_BACK_PRESS,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  stringifyQuery,
} from '@dcloudio/uni-shared'

import {
  handleRef,
  handleLink,
  initChildVues,
  initSpecialMethods,
  createVueComponent,
} from './util'

declare function Page<D>(options: tinyapp.PageOptions<D>): void

export function initCreatePage() {
  return function createPage(vueOptions: ComponentOptions) {
    vueOptions = vueOptions.default || vueOptions
    const pageOptions: tinyapp.PageOptions = {
      onLoad(query) {
        this.options = query
        this.$page = {
          fullPath: addLeadingSlash(this.route + stringifyQuery(query)),
        }
        // 初始化 vue 实例
        this.props = query
        this.$vm = createVueComponent('page', this, vueOptions)
        initSpecialMethods(this)
        this.$vm.$callHook(ON_LOAD, query)
      },
      onReady() {
        initChildVues(this)
        this.$vm.$callHook('mounted')
        this.$vm.$callHook(ON_READY)
      },
      onUnload() {
        if (this.$vm) {
          this.$vm.$callHook(ON_UNLOAD)
          $destroyComponent(this.$vm)
        }
      },
      events: {
        // 支付宝小程序有些页面事件只能放在events下
        onBack() {
          this.$vm.$callHook(ON_BACK_PRESS)
        },
      },
      __r: handleRef,
      __l: handleLink,
    }
    if (__VUE_OPTIONS_API__) {
      pageOptions.data = initData(vueOptions)
    }
    initHooks(pageOptions, PAGE_INIT_HOOKS)
    initUnknownHooks(pageOptions, vueOptions)
    initRuntimeHooks(pageOptions, vueOptions.__runtimeHooks)
    initWxsCallMethods(
      pageOptions as WechatMiniprogram.Component.MethodOption,
      vueOptions.wxsCallMethods
    )

    return Page(pageOptions)
  }
}
