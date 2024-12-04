import type { ComponentOptions } from 'vue'

import { ON_LOAD, addLeadingSlash, stringifyQuery } from '@dcloudio/uni-shared'

import {
  type CustomComponentInstanceProperty,
  parseComponent,
} from './createComponent'

import {
  PAGE_INIT_HOOKS,
  type ParseComponentOptions,
  initHooks,
  initMixinRuntimeHooks,
  initPageProps,
  initRuntimeHooks,
  initUnknownHooks,
} from '@dcloudio/uni-mp-core'

function parsePage(
  vueOptions: ComponentOptions,
  parseOptions: ParseComponentOptions
) {
  const { parse, mocks, isPage, initRelation, handleLink, initLifetimes } =
    parseOptions
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks,
    isPage,
    initRelation,
    handleLink,
    initLifetimes,
  })

  initPageProps(
    miniProgramPageOptions,
    (vueOptions.default || vueOptions).props
  )

  const methods =
    miniProgramPageOptions.methods as WechatMiniprogram.Component.MethodOption

  methods.onLoad = function (
    this: CustomComponentInstanceProperty,
    query: Record<string, any>
  ) {
    if (__X__) {
      // query并非多层级结构，无需递归处理
      ;(this as any).options = new UTSJSONObject(query || {})
    } else {
      ;(this as any).options = query
    }
    ;(this as any).$page = {
      fullPath: addLeadingSlash((this as any).route + stringifyQuery(query)),
    }
    return this.$vm && this.$vm.$callHook(ON_LOAD, query)
  }

  initHooks(methods, PAGE_INIT_HOOKS)
  initUnknownHooks(methods, vueOptions)
  initRuntimeHooks(methods, vueOptions.__runtimeHooks)
  initMixinRuntimeHooks(methods)
  parse && parse(miniProgramPageOptions, { handleLink })

  return miniProgramPageOptions
}

declare const Component: WechatMiniprogram.Component.Constructor

export function initCreatePage(parseOptions: ParseComponentOptions) {
  return function createPage(vuePageOptions: ComponentOptions) {
    return Component(parsePage(vuePageOptions, parseOptions))
  }
}
