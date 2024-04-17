import {
  API_STOP_PULL_DOWN_REFRESH,
  type API_TYPE_STOP_PULL_DOWN_REFRESH,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  getCurrentWebview,
  getPullDownRefreshWebview,
  setPullDownRefreshWebview,
} from '../../utils'

export const stopPullDownRefresh =
  defineAsyncApi<API_TYPE_STOP_PULL_DOWN_REFRESH>(
    API_STOP_PULL_DOWN_REFRESH,
    (_args, { resolve, reject }) => {
      const webview = getPullDownRefreshWebview() || getCurrentWebview()
      if (!webview) {
        return reject()
      }
      webview.endPullToRefresh()
      setPullDownRefreshWebview(null)
      resolve()
    }
  )
