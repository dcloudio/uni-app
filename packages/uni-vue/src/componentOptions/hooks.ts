import { invokeHook } from '@dcloudio/uni-core'
import {
  LINEFEED,
  ON_LOAD,
  ON_SHOW,
  decodedQuery,
  isUniLifecycleHook,
} from '@dcloudio/uni-shared'
import { isArray, isFunction } from '@vue/shared'

import type {
  ComponentInternalInstance,
  ComponentOptions,
  ComponentPublicInstance,
} from 'vue'

import { injectHook } from 'vue'

function injectLifecycleHook(
  name: string,
  hook: Function,
  publicThis: ComponentPublicInstance,
  instance: ComponentInternalInstance
) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance)
  }
}

export function initHooks(
  options: ComponentOptions,
  instance: ComponentInternalInstance,
  publicThis: ComponentPublicInstance
) {
  const mpType = options.mpType || publicThis.$mpType
  if (!mpType || mpType === 'component') {
    // 仅 App,Page 类型支持在 options 中配置 on 生命周期，组件可以使用组合式 API 定义页面生命周期
    return
  }

  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name]
      if (isArray(hooks)) {
        hooks.forEach((hook) =>
          injectLifecycleHook(name, hook, publicThis, instance)
        )
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance)
      }
    }
  })
  if ((__PLATFORM__ === 'app' || __PLATFORM__ === 'h5') && mpType === 'page') {
    instance.__isVisible = true
    // 直接触发页面 onLoad、onShow 组件内的 onLoad 和 onShow 在注册时，直接触发一次
    try {
      let query = instance.attrs.__pageQuery as Record<string, any>
      // onLoad 的 query 进行 decode
      if (__X__) {
        query = new UTSJSONObject(decodedQuery(query))
      }
      if (__PLATFORM__ === 'app' && __X__) {
        // TODO 统一处理 Web
        publicThis.options = query || {}
      }
      invokeHook(publicThis, ON_LOAD, query)
      delete instance.attrs.__pageQuery
      // iOS-X 的非 Tab 页面与 uni-app 一致固定触发 onShow
      const $basePage = __X__
        ? publicThis.$basePage
        : (publicThis.$page as Page.PageInstance['$page'])
      if (!(__PLATFORM__ === 'app' && __X__ && $basePage?.meta.isTabBar)) {
        if ($basePage?.openType !== 'preloadPage') {
          invokeHook(publicThis, ON_SHOW)
        }
      }
    } catch (e: any) {
      console.error(e.message + LINEFEED + e.stack)
    }
  }
}
