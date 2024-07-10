/**
 * uni.getLaunchOptionsSync()
 * 获取本次启动时的参数。返回值与App.onLaunch的回调参数一致 onLaunch(res)
 * 通过通用链接打开返回 appLink
 * 通过 appSchema打开返回 appScheme
 * onHide - onShow 信息清除
 */

import { defineSyncApi } from '@dcloudio/uni-api'
import { getLaunchOptions } from '@dcloudio/uni-platform'

import type { GetLaunchOptionsSync } from '@dcloudio/uni-app-x/types/uni'
import { getNativeApp } from '../../framework/app/app'

const API_GET_LAUNCH_OPTIONS_SYNC = 'getLaunchOptionsSync'

export const getLaunchOptionsSync = defineSyncApi<GetLaunchOptionsSync>(
  API_GET_LAUNCH_OPTIONS_SYNC,
  () => {
    const app = getNativeApp()
    const baseInfo = getLaunchOptions()
    const schemaInfo = app.getLaunchOptionsSync()
    return Object.assign({}, baseInfo, schemaInfo)
  }
)
