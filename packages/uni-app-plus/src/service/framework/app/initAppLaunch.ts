import { invokeHook } from '@dcloudio/uni-core'
import { injectAppHooks } from '@dcloudio/uni-api'
import { ON_HIDE, ON_LAUNCH, ON_SHOW } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { initLaunchOptions } from './utils'

export function initAppLaunch(appVm: ComponentPublicInstance) {
  injectAppHooks(appVm.$)
  const { entryPagePath, entryPageQuery, referrerInfo, appScheme, appLink } =
    __uniConfig
  const args = initLaunchOptions({
    path: entryPagePath,
    query: entryPageQuery,
    referrerInfo: referrerInfo,
    appScheme,
    appLink,
  })
  invokeHook(appVm, ON_LAUNCH, args)
  invokeHook(appVm, ON_SHOW, args)
  // https://tower.im/teams/226535/todos/16905/
  const getAppState = weex.requireModule('plus').getAppState
  const appState = getAppState && Number(getAppState())
  if (appState === 2) {
    invokeHook(appVm, ON_HIDE, args)
  }
}
