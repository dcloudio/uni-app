import { extend } from '@vue/shared'
import { parseQuery } from '@dcloudio/uni-shared'
import { createLaunchOptions, LaunchOptions } from '@dcloudio/uni-core'

export const EVENT_BACKBUTTON = 'backbutton'

export function backbuttonListener() {
  uni.navigateBack({
    from: 'backbutton',
    success() {}, // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
  } as UniApp.NavigateBackOptions)
}

const enterOptions: LaunchOptions = createLaunchOptions()
const launchOptions: LaunchOptions = createLaunchOptions()

export function getLaunchOptions() {
  return launchOptions
}

export function getEnterOptions() {
  return enterOptions
}

export function initEnterOptions({
  path,
  query,
  referrerInfo,
}: Partial<RedirectInfo>) {
  extend(enterOptions, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {},
  })
}

export function initLaunchOptions({
  path,
  query,
  referrerInfo,
}: Partial<RedirectInfo>) {
  extend(launchOptions, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {},
  })
  extend(enterOptions, launchOptions)
  return launchOptions
}

export interface RedirectInfo extends Omit<LaunchOptions, 'query' | 'scene'> {
  query: string
  userAction: boolean
}

export function parseRedirectInfo(): RedirectInfo | void {
  const weexPlus = weex.requireModule('plus')
  if (weexPlus.getRedirectInfo) {
    const { path, query, extraData, userAction, fromAppid } =
      weexPlus.getRedirectInfo() || {}
    const referrerInfo: UniApp.UniConfig['referrerInfo'] = {
      appId: fromAppid,
      extraData: {},
    }
    if (extraData) {
      referrerInfo.extraData = extraData
    }
    return {
      path: path || '',
      query: query ? '?' + query : '',
      referrerInfo,
      userAction,
    }
  }
}
