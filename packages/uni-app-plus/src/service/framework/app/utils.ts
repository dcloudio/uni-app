import { extend } from '@vue/shared'
import { parseQuery } from '@dcloudio/uni-shared'
import { type LaunchOptions, createLaunchOptions } from '@dcloudio/uni-core'

export const EVENT_BACKBUTTON = 'backbutton'

export function backbuttonListener() {
  uni.navigateBack({
    from: 'backbutton',
    success() {}, // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
  } as UniApp.NavigateBackOptions)
}

const enterOptions: LaunchOptions = /*#__PURE__*/ createLaunchOptions()
const launchOptions: LaunchOptions = /*#__PURE__*/ createLaunchOptions()

export function getLaunchOptions() {
  return extend({}, launchOptions)
}

export function getEnterOptions() {
  return extend({}, enterOptions)
}

export function initEnterOptions({
  path,
  query,
  referrerInfo,
  appScheme,
  appLink,
}: Partial<RedirectInfo>) {
  extend(enterOptions, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {},
    appScheme,
    appLink,
  })
  if (__X__) {
    enterOptions.query = new UTSJSONObject(enterOptions.query)
  }
}

export function initLaunchOptions({
  path,
  query,
  referrerInfo,
  appScheme,
  appLink,
}: Partial<RedirectInfo>) {
  extend(launchOptions, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {},
    // TODO uni-app x
    channel: __X__ ? undefined : plus.runtime.channel,
    launcher: __X__ ? undefined : plus.runtime.launcher,
    appScheme,
    appLink,
  })
  if (__X__) {
    launchOptions.query = new UTSJSONObject(launchOptions.query)
  }
  extend(enterOptions, launchOptions)

  return enterOptions
}

export interface RedirectInfo extends Omit<LaunchOptions, 'query' | 'scene'> {
  query: string
  userAction: boolean
}

export function parseRedirectInfo(): RedirectInfo | void {
  const weexPlus = weex.requireModule('plus')
  if (weexPlus.getRedirectInfo) {
    const {
      path,
      query,
      extraData,
      userAction,
      fromAppid,
      appScheme,
      appLink,
    } = weexPlus.getRedirectInfo() || {}
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
      appScheme,
      appLink,
    }
  }
}
