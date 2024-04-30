import {
  API_START_PULL_DOWN_REFRESH,
  type API_TYPE_START_PULL_DOWN_REFRESH,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  getCurrentWebview,
  getPullDownRefreshWebview,
  setPullDownRefreshWebview,
} from '../../utils'

export const startPullDownRefresh =
  defineAsyncApi<API_TYPE_START_PULL_DOWN_REFRESH>(
    API_START_PULL_DOWN_REFRESH,
    (_args, { resolve, reject }) => {
      let webview = getPullDownRefreshWebview()
      if (webview) {
        webview.endPullToRefresh()
      }
      webview = getCurrentWebview()
      if (!webview) {
        return reject()
      }
      webview.beginPullToRefresh()
      setPullDownRefreshWebview(webview)
      resolve()
    }
  )
