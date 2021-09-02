import {
  initPullToRefreshI18n,
  normalizePullToRefreshRpx,
} from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import { extend } from '@vue/shared'

export function initPullToRefresh(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  if (!routeMeta.enablePullDownRefresh) {
    return
  }
  const pullToRefresh = normalizePullToRefreshRpx(
    extend(
      {},
      plus.os.name === 'Android'
        ? defaultAndroidPullToRefresh
        : defaultPullToRefresh,
      routeMeta.pullToRefresh
    )
  ) as unknown as PlusWebviewWebviewPullToRefreshStyles

  webviewStyle.pullToRefresh = initWebviewPullToRefreshI18n(
    pullToRefresh,
    routeMeta
  )
}

function initWebviewPullToRefreshI18n(
  pullToRefresh: PlusWebviewWebviewPullToRefreshStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  const i18nResult = initPullToRefreshI18n(pullToRefresh)
  if (!i18nResult) {
    return pullToRefresh
  }
  const [contentdownI18n, contentoverI18n, contentrefreshI18n] = i18nResult
  if (contentdownI18n || contentoverI18n || contentrefreshI18n) {
    uni.onLocaleChange(() => {
      const webview = plus.webview.getWebviewById(routeMeta.id + '')
      if (!webview) {
        return
      }
      const newPullToRefresh: PlusWebviewWebviewPullToRefreshStyles = {
        support: true,
      }
      if (contentdownI18n) {
        newPullToRefresh.contentdown = {
          caption: pullToRefresh.contentdown!.caption,
        }
      }
      if (contentoverI18n) {
        newPullToRefresh.contentover = {
          caption: pullToRefresh.contentover!.caption,
        }
      }
      if (contentrefreshI18n) {
        newPullToRefresh.contentrefresh = {
          caption: pullToRefresh.contentrefresh!.caption,
        }
      }
      if (__DEV__) {
        console.log(formatLog('updateWebview', webview.id, newPullToRefresh))
      }
      webview.setStyle({
        pullToRefresh: newPullToRefresh,
      })
    })
  }
  return pullToRefresh
}

const defaultAndroidPullToRefresh = { support: true, style: 'circle' }
const defaultPullToRefresh = {
  support: true,
  style: 'default',
  height: '50px',
  range: '200px',
  contentdown: {
    caption: '',
  },
  contentover: {
    caption: '',
  },
  contentrefresh: {
    caption: '',
  },
}
