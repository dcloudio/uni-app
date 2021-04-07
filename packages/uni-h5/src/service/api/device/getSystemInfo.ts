import { defineAsyncApi } from '@dcloudio/uni-api'

import { getSystemInfoSync } from './getSystemInfoSync'

export const getSystemInfo = defineAsyncApi<typeof uni.getSystemInfo>(
  'getSystemInfo',
  (_args, { resolve }) => {
    return resolve(getSystemInfoSync())
  }
)
