import { extend } from '@vue/shared'
import { injectAppLaunchHooks } from '@dcloudio/uni-api'
import { invokeHook } from '@dcloudio/uni-core'
import { ON_LAUNCH, ON_SHOW, ON_HIDE } from '@dcloudio/uni-shared'
import { ComponentPublicInstance } from 'vue'
import { initLaunchOptions } from './utils'

export function initAppLaunch(appVm: ComponentPublicInstance) {
  const { entryPagePath, entryPageQuery, referrerInfo } = __uniConfig
  const args = extend(
    {
      // 为了让 uni-stat 在 uni.onLaunch 中可以 mixin
      app: { mixin: appVm.$.appContext.app.mixin },
    },
    initLaunchOptions({
      path: entryPagePath,
      query: entryPageQuery,
      referrerInfo: referrerInfo,
    })
  )
  injectAppLaunchHooks(appVm.$)
  invokeHook(appVm, ON_LAUNCH, args)
  invokeHook(appVm, ON_SHOW, args)
  // https://tower.im/teams/226535/todos/16905/
  const getAppState = weex.requireModule('plus').getAppState
  const appState = getAppState && Number(getAppState())
  if (appState === 2) {
    invokeHook(appVm, ON_HIDE, args)
  }
}
