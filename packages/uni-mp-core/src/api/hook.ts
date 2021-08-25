import { ON_LAUNCH } from '@dcloudio/uni-shared'

import { ComponentInternalInstance, injectHook } from 'vue'

type AppLaunchHook = (options: UniApp.LaunchOptionsApp) => void
__GLOBAL__.appLaunchHooks = []
export function onAppLaunch(hook: AppLaunchHook) {
  const app = getApp({ allowDefault: true })
  if (app && app.$vm) {
    return injectHook(ON_LAUNCH, hook, app.$vm.$)
  }
  __GLOBAL__.appLaunchHooks.push(hook)
}

export function injectAppLaunchHooks(appInstance: ComponentInternalInstance) {
  ;(__GLOBAL__.appLaunchHooks as AppLaunchHook[]).forEach((hook) => {
    injectHook(ON_LAUNCH, hook, appInstance)
  })
}
