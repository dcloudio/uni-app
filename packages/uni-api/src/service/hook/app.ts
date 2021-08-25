import { ON_LAUNCH } from '@dcloudio/uni-shared'

import { ComponentInternalInstance, injectHook } from 'vue'

type AppLaunchHook = (options: UniApp.LaunchOptionsApp) => void
const appLaunchHooks: AppLaunchHook[] = []
export function onAppLaunch(hook: AppLaunchHook) {
  const app = getApp({ allowDefault: true })
  if (app && app.$vm) {
    return injectHook(ON_LAUNCH, hook, app.$vm.$)
  }
  appLaunchHooks.push(hook)
}

export function injectAppLaunchHooks(appInstance: ComponentInternalInstance) {
  appLaunchHooks.forEach((hook) => {
    injectHook(ON_LAUNCH, hook, appInstance)
  })
}
