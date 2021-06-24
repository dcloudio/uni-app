import { extend } from '@vue/shared'

export function initPullToRefresh(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  if (!routeMeta.enablePullDownRefresh) {
    return
  }
  webviewStyle.pullToRefresh = extend(
    {},
    plus.os.name === 'Android'
      ? defaultAndroidPullToRefresh
      : defaultPullToRefresh,
    routeMeta.refreshOptions
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
