import { defineSyncApi } from '@dcloudio/uni-api'
import { getLaunchOptions } from '@dcloudio/uni-platform'

import { GetLaunchOptionsSync } from '@dcloudio/uni-app-x/types/uni'

const API_GET_LAUNCH_OPTIONS_SYNC = 'getLaunchOptionsSync'

export const getLaunchOptionsSync = defineSyncApi<GetLaunchOptionsSync>(
  API_GET_LAUNCH_OPTIONS_SYNC,
  () => {
    return getLaunchOptions()
  }
)
