import { API_TYPE_ASYNC, createApi } from '@dcloudio/uni-api'

import { getSystemInfoSync } from './getSystemInfoSync'

export const getSystemInfo = createApi<typeof uni.getSystemInfo>(
  { type: API_TYPE_ASYNC, name: 'getSystemInfo' },
  () => {
    return getSystemInfoSync()
  }
)
