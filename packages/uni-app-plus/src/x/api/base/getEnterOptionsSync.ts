import { defineSyncApi } from '@dcloudio/uni-api'
import type { GetLaunchOptionsSync } from '@dcloudio/uni-app-x/types/uni'
import { getLaunchOptions } from '@dcloudio/uni-platform'

const API_GET_ENTER_OPTIONS_SYNC = 'getEnterOptionsSync'

let enterOptions: ReturnType<GetLaunchOptionsSync> = {
  path: '',
  appScheme: null,
  appLink: null,
}

export const setEnterOptionsSync = function (
  options: ReturnType<GetLaunchOptionsSync>
) {
  enterOptions = options
}

export const getEnterOptionsSync = defineSyncApi<GetLaunchOptionsSync>(
  API_GET_ENTER_OPTIONS_SYNC,
  () => {
    const baseInfo = getLaunchOptions()
    return Object.assign({}, baseInfo, enterOptions)
  }
)
