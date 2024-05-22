import {
  type ComponentInternalInstance,
  type ComponentOptions,
  // @ts-expect-error: 模块“"vue"”没有导出的成员“devtoolsComponentAdded”
  devtoolsComponentAdded,
} from 'vue'

import {
  $createComponent,
  $destroyComponent,
  type CreateComponentOptions,
  PAGE_INIT_HOOKS,
  findPropsData,
  handleEvent,
  initComponentInstance,
  initData,
  initHooks,
  initMocks,
  initRefs,
  initRuntimeHooks,
  initUnknownHooks,
  initWxsCallMethods,
} from '@dcloudio/uni-mp-core'

import {
  ON_LOAD,
  ON_READY,
  ON_SHOW,
  ON_UNLOAD,
  addLeadingSlash,
  stringifyQuery,
} from '@dcloudio/uni-shared'

import { handleLink, initSpecialMethods, mocks } from './util'

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
        const mpInstance = this
        this.$vm = $createComponent(
          {
            type: vueOptions,
            props: findPropsData(this.props, true),
          },
          {
            mpType: 'page',
            mpInstance: this,
            slots: this.props.uS || {}, // vueSlots
            onBeforeSetup(
              instance: ComponentInternalInstance,
              options: CreateComponentOptions
            ) {
              initRefs(instance, mpInstance as any)
              initMocks(instance, mpInstance as any, mocks)
              initComponentInstance(instance, options)
            },
          }
        )
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
        setTimeout(() => {
          this.$vm.$callHook('mounted')
          this.$vm.$callHook(ON_READY)
        }, 100)
      },
      onUnload() {
        if (this.$vm) {
          this.$vm.$callHook(ON_UNLOAD)
          $destroyComponent(this.$vm)
        }
      },
      __l: handleLink,
      __e: handleEvent,
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
