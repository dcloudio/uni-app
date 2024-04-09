import {
  API_STOP_PULL_DOWN_REFRESH,
  type API_TYPE_STOP_PULL_DOWN_REFRESH,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPageId } from '@dcloudio/uni-core'

export const stopPullDownRefresh =
  defineAsyncApi<API_TYPE_STOP_PULL_DOWN_REFRESH>(
    API_STOP_PULL_DOWN_REFRESH,
    (_args, { resolve }) => {
      UniServiceJSBridge.invokeViewMethod(
        API_STOP_PULL_DOWN_REFRESH,
        {},
        getCurrentPageId()
      )
      resolve()
    }
  )
