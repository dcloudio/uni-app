import {
  ComponentOptions,
  // @ts-ignore
  devtoolsComponentAdded,
} from 'vue'

import {
  PAGE_INIT_HOOKS,
  initData,
  initHooks,
  initUnknownHooks,
  $destroyComponent,
  initWxsCallMethods,
  initRuntimeHooks,
  handleEvent,
} from '@dcloudio/uni-mp-core'

import {
  addLeadingSlash,
  ON_LOAD,
  ON_SHOW,
  ON_READY,
  ON_UNLOAD,
  stringifyQuery,
} from '@dcloudio/uni-shared'

import {
  handleRef,
  handleLink,
  initSpecialMethods,
  createVueComponent,
} from './util'

import { extend, isPlainObject } from '@vue/shared'

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
      onShow() {
        if (__VUE_PROD_DEVTOOLS__) {
          devtoolsComponentAdded(this.$vm.$)
        }
        this.$vm.$callHook(ON_SHOW)
      },
      onReady() {
        this.$vm.$callHook('mounted')
        this.$vm.$callHook(ON_READY)
      },
      onUnload() {
        if (this.$vm) {
          this.$vm.$callHook(ON_UNLOAD)
          $destroyComponent(this.$vm)
        }
      },
      __r: handleRef,
      __l: handleLink,
      __e: function (event: any) {
        const {
          currentTarget: { dataset },
        } = event
        dataset['eO'] = {
          // eslint-disable-next-line no-restricted-syntax
          ...dataset['eO'],
          tap: dataset['eO']?.tap || dataset['eO']?.click,
        }
        // console.log('触发了page事件', event)
        // @ts-ignore
        return handleEvent.call(this, event)
      },
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
