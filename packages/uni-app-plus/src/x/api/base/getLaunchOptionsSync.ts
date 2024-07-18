import { defineSyncApi } from '@dcloudio/uni-api'
import { getLaunchOptions } from '@dcloudio/uni-platform'

import type { GetLaunchOptionsSync } from '@dcloudio/uni-app-x/types/uni'

const API_GET_LAUNCH_OPTIONS_SYNC = 'getLaunchOptionsSync'

let launchOptions: ReturnType<GetLaunchOptionsSync> = {
  path: '',
  appScheme: null,
  appLink: null,
}

export const setLaunchOptionsSync = function (
  options: ReturnType<GetLaunchOptionsSync>
) {
  launchOptions = options
}

export const getLaunchOptionsSync = defineSyncApi<GetLaunchOptionsSync>(
  API_GET_LAUNCH_OPTIONS_SYNC,
  () => {
    const baseInfo = getLaunchOptions()
    return Object.assign({}, baseInfo, launchOptions)
  }
)
