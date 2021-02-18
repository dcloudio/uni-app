import { createAsyncApi } from '@dcloudio/uni-api'

import { getSystemInfoSync } from './getSystemInfoSync'

export const getSystemInfo = createAsyncApi<typeof uni.getSystemInfo>(
  'getSystemInfo',
  () => {
    return getSystemInfoSync()
  }
)
