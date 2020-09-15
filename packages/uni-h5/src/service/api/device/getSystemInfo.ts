import { createApi } from '@dcloudio/uni-api'

import { getSystemInfoSync } from './getSystemInfoSync'

export const getSystemInfo = createApi<typeof uni.getSystemInfo>(() => {
  return getSystemInfoSync()
})
