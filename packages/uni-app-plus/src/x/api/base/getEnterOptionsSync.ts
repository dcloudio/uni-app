import { defineSyncApi } from '@dcloudio/uni-api'
import type {
  GetEnterOptionsSync,
  OnShowOptions,
} from '@dcloudio/uni-app-x/types/uni'
import { getLaunchOptions } from '@dcloudio/uni-platform'

const API_GET_ENTER_OPTIONS_SYNC = 'getEnterOptionsSync'

let enterOptions: OnShowOptions = {
  path: '',
  appScheme: null,
  appLink: null,
}

export const setEnterOptionsSync = function (options: OnShowOptions) {
  enterOptions = options
}

export const getEnterOptionsSync = defineSyncApi<GetEnterOptionsSync>(
  API_GET_ENTER_OPTIONS_SYNC,
  () => {
    const baseInfo = getLaunchOptions()
    return Object.assign({}, baseInfo, enterOptions)
  }
)
