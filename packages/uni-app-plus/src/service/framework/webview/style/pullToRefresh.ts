import { normalizePullToRefreshRpx } from '@dcloudio/uni-core'
import { extend } from '@vue/shared'

export function initPullToRefresh(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  if (!routeMeta.enablePullDownRefresh) {
    return
  }
  webviewStyle.pullToRefresh = normalizePullToRefreshRpx(
    extend(
      {},
      plus.os.name === 'Android'
        ? defaultAndroidPullToRefresh
        : defaultPullToRefresh,
      routeMeta.pullToRefresh
    )
  ) as unknown as PlusWebviewWebviewPullToRefreshStyles
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
