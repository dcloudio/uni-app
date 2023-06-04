import {
  API_START_PULL_DOWN_REFRESH,
  API_TYPE_START_PULL_DOWN_REFRESH,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPageId } from '@dcloudio/uni-core'

export const startPullDownRefresh =
  defineAsyncApi<API_TYPE_START_PULL_DOWN_REFRESH>(
    API_START_PULL_DOWN_REFRESH,
    (_args, { resolve }) => {
      UniServiceJSBridge.invokeViewMethod(
        API_START_PULL_DOWN_REFRESH,
        {},
        getCurrentPageId()
      )
      resolve()
    }
  )
