import {
  API_START_PULL_DOWN_REFRESH,
  type API_TYPE_START_PULL_DOWN_REFRESH,
  defineAsyncApi,
} from '@dcloudio/uni-api'

import { getCurrentPage } from '@dcloudio/uni-core'

export const startPullDownRefresh =
  defineAsyncApi<API_TYPE_START_PULL_DOWN_REFRESH>(
    API_START_PULL_DOWN_REFRESH,
    (_options, res) => {
      const page = (getCurrentPage() as unknown as UniPage).vm

      if (page === null) {
        res.reject('page is not ready')
        return
      }

      page.$nativePage!.startPullDownRefresh({
        success: res.resolve,
        fail: res.reject,
      })
    }
  )
