/**
 * uni.getLaunchOptionsSync()
 * 获取本次启动时的参数。返回值与App.onLaunch的回调参数一致 onLaunch(res)
 * 通过通用链接打开返回 appLink
 * 通过 appSchema打开返回 appScheme
 * onHide - onShow 信息清除
 */

import { defineSyncApi } from '@dcloudio/uni-api'
import { getLaunchOptions } from '@dcloudio/uni-platform'

import type {
  GetLaunchOptionsSync,
  OnLaunchOptions,
} from '@dcloudio/uni-app-x/types/uni'

const API_GET_LAUNCH_OPTIONS_SYNC = 'getLaunchOptionsSync'

let launchOptions: OnLaunchOptions = {
  path: '',
  appScheme: null,
  appLink: null,
}

export const setLaunchOptionsSync = function (options: OnLaunchOptions) {
  launchOptions = options
}

export const getLaunchOptionsSync = defineSyncApi<GetLaunchOptionsSync>(
  API_GET_LAUNCH_OPTIONS_SYNC,
  () => {
    const baseInfo = getLaunchOptions()
    return Object.assign({}, baseInfo, launchOptions)
  }
)
