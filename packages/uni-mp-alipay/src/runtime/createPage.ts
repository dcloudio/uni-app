import {
  type ComponentOptions,
  // @ts-expect-error
  devtoolsComponentAdded,
} from 'vue'

import {
  $destroyComponent,
  PAGE_INIT_HOOKS,
  initData,
  initHooks,
  initRuntimeHooks,
  initUnknownHooks,
  initWxsCallMethods,
} from '@dcloudio/uni-mp-core'

import {
  ON_BACK_PRESS,
  ON_LOAD,
  ON_READY,
  ON_SHOW,
  ON_UNLOAD,
  addLeadingSlash,
  stringifyQuery,
} from '@dcloudio/uni-shared'

import {
  createVueComponent,
  handleLink,
  handleRef,
  initChildVues,
  initSpecialMethods,
} from './util'

import { extend, isPlainObject } from '@vue/shared'

declare function Page<D>(options: tinyapp.PageOptions<D>): void

export function initCreatePage() {
  return function createPage(vueOptions: ComponentOptions) {
    vueOptions = vueOptions.default || vueOptions
    const pageOptions: tinyapp.PageOptions = {
      onLoad(query) {
        if (__X__) {
          // query并非多层级结构，无需递归处理
          this.options = new UTSJSONObject(query || {})
        } else {
          this.options = query
        }
        this.$page = {
          fullPath: addLeadingSlash(this.route + stringifyQuery(query)),
        }
        // 初始化 vue 实例
        this.props = query
        this.$vm = createVueComponent('page', this, vueOptions)
        initSpecialMethods(this)
        this.$vm.$callHook(ON_LOAD, query)
      },
      onShow() {
        if (__VUE_PROD_DEVTOOLS__) {
          devtoolsComponentAdded(this.$vm.$)
        }
        this.$vm.$callHook(ON_SHOW)
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
        onKeyboardHeight: ((res: unknown) => {
          ;(my as any).$emit('uni:keyboardHeightChange', res)
        }) as any,
      },
      __r: handleRef,
      __l: handleLink,
    }

    if (isPlainObject(vueOptions.events)) {
      extend(pageOptions.events!, vueOptions.events)
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
