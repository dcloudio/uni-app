import { hasOwn, isFunction } from '@vue/shared'

import { ComponentOptions } from 'vue'

import { MiniProgramAppOptions } from '../index'
import { CustomAppInstanceProperty } from './app'
import { CustomComponentInstanceProperty } from './component'

export const PAGE_HOOKS = [
  'onLoad',
  'onShow',
  // 'onReady', // lifetimes.ready
  'onHide',
  'onUnload',

  'onResize',
  // 'onPageScroll', // 影响性能，开发者手动注册
  'onTabItemTap',
  'onReachBottom',
  'onPullDownRefresh',

  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  'onAddToFavorites'
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
]

function findHooks(
  vueOptions: ComponentOptions,
  hooks = new Set<string>()
): Set<string> {
  if (vueOptions) {
    Object.keys(vueOptions).forEach(name => {
      if (name.indexOf('on') === 0 && isFunction(vueOptions[name])) {
        hooks.add(name)
      }
    })
    if (__VUE_OPTIONS_API__) {
      const { extends: extendsOptions, mixins } = vueOptions
      if (mixins) {
        mixins.forEach(mixin => findHooks(mixin, hooks))
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
    mpOptions[hook] = function(
      this: CustomAppInstanceProperty | CustomComponentInstanceProperty,
      args: unknown
    ) {
      if (__PLATFORM__ === 'mp-toutiao' && hook === 'onError') {
        return getApp().$vm.$callHook(hook, args)
      }
      return this.$vm && this.$vm.$callHook(hook, args)
    }
  }
}

const EXCLUDE_HOOKS = ['onReady']

export function initHooks(
  mpOptions: MiniProgramAppOptions | WechatMiniprogram.Component.MethodOption,
  hooks: string[],
  excludes: string[] = EXCLUDE_HOOKS
) {
  hooks.forEach(hook => initHook(mpOptions, hook, excludes))
}

export function initUnknownHooks(
  mpOptions: MiniProgramAppOptions | WechatMiniprogram.Component.MethodOption,
  vueOptions: ComponentOptions,
  excludes: string[] = EXCLUDE_HOOKS
) {
  findHooks(vueOptions).forEach(hook => initHook(mpOptions, hook, excludes))
}
