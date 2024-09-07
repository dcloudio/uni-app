import {
  API_STOP_PULL_DOWN_REFRESH,
  type API_TYPE_STOP_PULL_DOWN_REFRESH,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'

export const stopPullDownRefresh =
  defineAsyncApi<API_TYPE_STOP_PULL_DOWN_REFRESH>(
    API_STOP_PULL_DOWN_REFRESH,
    (_args, res) => {
      const page = (getCurrentPage() as unknown as UniPage).vm
      if (page === null) {
        res.reject('page is not ready')
        return
      }
      page.$nativePage!.stopPullDownRefresh()
      res.resolve()
    }
  )
