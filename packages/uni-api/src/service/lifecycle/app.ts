import { getEnterOptions, getLaunchOptions } from '@dcloudio/uni-platform'
import { ON_LAUNCH } from '@dcloudio/uni-shared'
import { defineSyncApi } from '../../helpers/api'

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

type API_TYPE_GET_ENTER_OPTIONS_SYNC = typeof uni.getLaunchOptionsSync
const API_GET_ENTER_OPTIONS_SYNC = 'getEnterOptionsSync'
export const getEnterOptionsSync =
  defineSyncApi<API_TYPE_GET_ENTER_OPTIONS_SYNC>(
    API_GET_ENTER_OPTIONS_SYNC,
    () => {
      return getEnterOptions()
    }
  )

type API_TYPE_GET_LAUNCH_OPTIONS_SYNC = typeof uni.getLaunchOptionsSync
const API_GET_LAUNCH_OPTIONS_SYNC = 'getLaunchOptionsSync'
export const getLaunchOptionsSync =
  defineSyncApi<API_TYPE_GET_LAUNCH_OPTIONS_SYNC>(
    API_GET_LAUNCH_OPTIONS_SYNC,
    () => {
      return getLaunchOptions()
    }
  )
