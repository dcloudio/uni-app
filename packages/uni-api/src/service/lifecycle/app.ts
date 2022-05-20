import { getEnterOptions, getLaunchOptions } from '@dcloudio/uni-platform'
import {
  ON_ERROR,
  ON_HIDE,
  ON_PAGE_NOT_FOUND,
  ON_SHOW,
  ON_UNHANDLE_REJECTION,
} from '@dcloudio/uni-shared'
import { ComponentInternalInstance, injectHook } from 'vue'
import { removeHook } from '@dcloudio/uni-core'
import { remove } from '@vue/shared'

import { defineSyncApi } from '../../helpers/api'

type AppShowHook = (options: UniApp.GetLaunchOptionsSyncOptions) => void
type AppHideHook = () => void
interface AppHooks {
  onUnhandledRejection: UniApp.OnUnhandledRejectionCallback[]
  onPageNotFound: UniApp.OnPageNotFoundCallback[]
  onError: UniApp.OnAppErrorCallback[]
  onShow: AppShowHook[]
  onHide: AppHideHook[]
}

const appHooks: AppHooks = {
  [ON_UNHANDLE_REJECTION]: [],
  [ON_PAGE_NOT_FOUND]: [],
  [ON_ERROR]: [],
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

export function injectAppHooks(appInstance: ComponentInternalInstance) {
  Object.keys(appHooks).forEach((type) => {
    appHooks[type as keyof AppHooks].forEach((hook) => {
      injectHook(type, hook, appInstance)
    })
  })
}

function offAppHook(type: keyof AppHooks, hook: (...args: any[]) => void) {
  const app = getApp({ allowDefault: true })
  if (app && app.$vm) {
    return removeHook(app.$vm, type, hook)
  }
  remove(appHooks[type] as Function[], hook)
}

export function onUnhandledRejection(
  hook: UniApp.OnUnhandledRejectionCallback
) {
  onAppHook(ON_UNHANDLE_REJECTION, hook)
}

export function offUnhandledRejection(
  hook: UniApp.OnUnhandledRejectionCallback
) {
  offAppHook(ON_UNHANDLE_REJECTION, hook)
}

export function onPageNotFound(hook: UniApp.OnPageNotFoundCallback) {
  onAppHook(ON_PAGE_NOT_FOUND, hook)
}

export function offPageNotFound(hook: UniApp.OnPageNotFoundCallback) {
  offAppHook(ON_PAGE_NOT_FOUND, hook)
}

export function onError(hook: UniApp.OnAppErrorCallback) {
  onAppHook(ON_ERROR, hook)
}

export function offError(hook: UniApp.OnAppErrorCallback) {
  offAppHook(ON_ERROR, hook)
}

export function onAppShow(hook: AppShowHook) {
  onAppHook(ON_SHOW, hook)
}

export function offAppShow(hook: AppShowHook) {
  offAppHook(ON_SHOW, hook)
}

export function onAppHide(hook: AppHideHook) {
  onAppHook(ON_HIDE, hook)
}

export function offAppHide(hook: AppHideHook) {
  offAppHook(ON_HIDE, hook)
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
