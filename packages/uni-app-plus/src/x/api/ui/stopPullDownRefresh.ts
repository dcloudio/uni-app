import {
  API_STOP_PULL_DOWN_REFRESH,
  API_TYPE_STOP_PULL_DOWN_REFRESH,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

export const stopPullDownRefresh =
  defineAsyncApi<API_TYPE_STOP_PULL_DOWN_REFRESH>(
    API_STOP_PULL_DOWN_REFRESH,
    (_args, res) => {
      const page = getCurrentPage() as ComponentPublicInstance
      if (page === null) {
        res.reject('page is not ready')
        return
      }
      page.$nativePage!.stopPullDownRefresh()
      res.resolve()
    }
  )
