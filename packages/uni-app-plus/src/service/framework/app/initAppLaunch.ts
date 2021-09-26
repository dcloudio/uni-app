import { injectAppLaunchHooks } from '@dcloudio/uni-api'
import { invokeHook } from '@dcloudio/uni-core'
import { ON_LAUNCH, ON_SHOW, ON_HIDE } from '@dcloudio/uni-shared'
import { ComponentPublicInstance } from 'vue'

export function initAppLaunch(appVm: ComponentPublicInstance) {
  const args = {
    path: __uniConfig.entryPagePath,
    query: {},
    scene: 1001,
    app: appVm,
  }
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
