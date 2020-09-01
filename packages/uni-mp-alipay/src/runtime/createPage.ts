import { ComponentOptions } from 'vue'

import {
  PAGE_HOOKS,
  handleEvent,
  initData,
  initHooks,
  initUnknownHooks,
  $destroyComponent,
  initWxsCallMethods
} from '@dcloudio/uni-mp-core'

import { stringifyQuery } from '@dcloudio/uni-shared'

import {
  handleRef,
  handleLink,
  initChildVues,
  initSpecialMethods,
  createVueComponent
} from './util'

declare function Page<D>(options: tinyapp.PageOptions<D>): void

export function createPage(vueOptions: ComponentOptions) {
  vueOptions = vueOptions.default || vueOptions
  const pageOptions: tinyapp.PageOptions = {
    onLoad(query) {
      this.options = query
      this.$page = {
        fullPath: '/' + this.route + stringifyQuery(query)
      }
      // 初始化 vue 实例
      this.$vm = createVueComponent('page', this, vueOptions)
      initSpecialMethods(this)
      this.$vm.$callHook('onLoad', query)
    },
    onReady() {
      initChildVues(this)
      this.$vm.$callHook('mounted')
      this.$vm.$callHook('onReady')
    },
    onUnload() {
      if (this.$vm) {
        this.$vm.$callHook('onUnload')
        $destroyComponent(this.$vm)
      }
    },
    events: {
      // 支付宝小程序有些页面事件只能放在events下
      onBack() {
        this.$vm.$callHook('onBackPress')
      }
    },
    __r: handleRef,
    __e: handleEvent,
    __l: handleLink
  }
  if (__VUE_OPTIONS_API__) {
    pageOptions.data = initData(vueOptions)
  }
  initHooks(pageOptions, PAGE_HOOKS)
  initUnknownHooks(pageOptions, vueOptions)

  initWxsCallMethods(
    pageOptions as WechatMiniprogram.Component.MethodOption,
    vueOptions.wxsCallMethods
  )

  return Page(pageOptions)
}
