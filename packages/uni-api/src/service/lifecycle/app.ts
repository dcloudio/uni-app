import { getEnterOptions, getLaunchOptions } from '@dcloudio/uni-platform'
import { ON_HIDE, ON_SHOW } from '@dcloudio/uni-shared'
import { defineSyncApi } from '../../helpers/api'

import { ComponentInternalInstance, injectHook } from 'vue'

type AppShowHook = (options: UniApp.LaunchOptionsApp) => void
type AppHideHook = () => void
interface AppHooks {
  onShow: AppShowHook[]
  onHide: AppHideHook[]
}

const appHooks: AppHooks = {
  [ON_SHOW]: [],
  [ON_HIDE]: [],
}

function onAppHook(type: keyof AppHooks, hook: (...args: any[]) => void) {
  const app = getApp({ allowDefault: true })
  if (app && app.$vm) {
    return injectHook(type, hook, app.$vm.$)
  }
  appHooks[type].push(hook)
}

export function onAppShow(hook: AppShowHook) {
  onAppHook(ON_SHOW, hook)
}

export function onAppHide(hook: AppHideHook) {
  onAppHook(ON_HIDE, hook)
}

export function injectAppHooks(
  type: keyof AppHooks,
  appInstance: ComponentInternalInstance
) {
  appHooks[type].forEach((hook) => {
    injectHook(type, hook, appInstance)
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
