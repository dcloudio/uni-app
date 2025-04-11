import type { ComponentOptions } from 'vue'

import {
  ON_INIT,
  ON_LOAD,
  ON_READY,
  addLeadingSlash,
  stringifyQuery,
} from '@dcloudio/uni-shared'

import {
  type CustomComponentInstanceProperty,
  type MPComponentInstance,
  type ParseComponentOptions,
  parseComponent,
} from './component'
import {
  PAGE_INIT_HOOKS,
  initHooks,
  initMixinRuntimeHooks,
  initRuntimeHooks,
  initUnknownHooks,
} from './componentHooks'
import { initPageProps } from './componentProps'

function parsePage(
  vueOptions: ComponentOptions,
  parseOptions: ParseComponentOptions
) {
  const { parse, mocks, isPage, initRelation, handleLink, initLifetimes } =
    parseOptions
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks,
    isPage,
    isPageInProject: true,
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
  if (__PLATFORM__ === 'mp-baidu') {
    initUnknownHooks(methods, vueOptions, [ON_INIT, ON_READY])
  } else {
    initUnknownHooks(methods, vueOptions)
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks)
  initMixinRuntimeHooks(methods)
  parse && parse(miniProgramPageOptions, { handleLink })

  return miniProgramPageOptions
}

declare let Component: WechatMiniprogram.Component.Constructor

export function initCreatePage(parseOptions: ParseComponentOptions) {
  return function createPage(vuePageOptions: ComponentOptions) {
    return Component(parsePage(vuePageOptions, parseOptions))
  }
}

export function initPageInstance(mpPageInstance: MPComponentInstance) {
  if (__X__) {
    Object.assign(mpPageInstance, {
      get width(): number {
        return __GLOBAL__.getWindowInfo().windowWidth
      },
      get height(): number {
        const windowInfo = __GLOBAL__.getWindowInfo()
        // 某些版本的微信小程序开发工具获取tabBar页面的screenTop不对，其数值包含了tabBar高度及底部安全区，如果有开发者问起让他使用真机测试即可。
        return windowInfo.windowHeight + windowInfo.screenTop
      },
      get statusBarHeight(): number {
        return __GLOBAL__.getWindowInfo().statusBarHeight
      },
    })
  }
}
