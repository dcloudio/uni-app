import {
  MINI_PROGRAM_PAGE_RUNTIME_HOOKS,
  ON_ADD_TO_FAVORITES,
  ON_HIDE,
  ON_LOAD,
  ON_PULL_DOWN_REFRESH,
  ON_REACH_BOTTOM,
  ON_READY,
  ON_RESIZE,
  ON_SHOW,
  ON_TAB_ITEM_TAP,
  ON_UNLOAD,
} from '@dcloudio/uni-shared'
import { hasOwn, isFunction } from '@vue/shared'

import { ComponentOptions } from 'vue'

import { MiniProgramAppOptions } from '../index'
import { CustomAppInstanceProperty } from './app'
import { CustomComponentInstanceProperty } from './component'

export const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES,
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
]

function findHooks(
  vueOptions: ComponentOptions,
  hooks = new Set<string>()
): Set<string> {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf('on') === 0 && isFunction(vueOptions[name])) {
        hooks.add(name)
      }
    })
    if (__VUE_OPTIONS_API__) {
      const { extends: extendsOptions, mixins } = vueOptions
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks))
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks)
      }
    }
  }
  return hooks
}

function initHook(
  mpOptions: MiniProgramAppOptions | WechatMiniprogram.Component.MethodOption,
  hook: string,
  excludes: string[]
) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (
      this: CustomAppInstanceProperty | CustomComponentInstanceProperty,
      args: unknown
    ) {
      if (
        (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') &&
        hook === 'onError'
      ) {
        return getApp().$vm.$callHook(hook, args)
      }
      return this.$vm && this.$vm.$callHook(hook, args)
    }
  }
}

const EXCLUDE_HOOKS = [ON_READY]

export function initHooks(
  mpOptions: MiniProgramAppOptions | WechatMiniprogram.Component.MethodOption,
  hooks: string[],
  excludes: string[] = EXCLUDE_HOOKS
) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes))
}

export function initUnknownHooks(
  mpOptions: MiniProgramAppOptions | WechatMiniprogram.Component.MethodOption,
  vueOptions: ComponentOptions,
  excludes: string[] = EXCLUDE_HOOKS
) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes))
}

export function initRuntimeHooks(
  mpOptions: MiniProgramAppOptions | WechatMiniprogram.Component.MethodOption,
  runtimeHooks?: number
) {
  if (!runtimeHooks) {
    return
  }
  const hooks = Object.keys(
    MINI_PROGRAM_PAGE_RUNTIME_HOOKS
  ) as (keyof typeof MINI_PROGRAM_PAGE_RUNTIME_HOOKS)[]
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, [])
    }
  })
}
