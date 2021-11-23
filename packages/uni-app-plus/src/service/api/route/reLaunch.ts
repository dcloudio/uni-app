import {
  API_RE_LAUNCH,
  API_TYPE_RE_LAUNCH,
  defineAsyncApi,
  DefineAsyncApiFn,
  ReLaunchOptions,
  ReLaunchProtocol,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import tabBar from '../../framework/app/tabBar'
import { registerPage } from '../../framework/page'
import { getAllPages } from '../../framework/page/getCurrentPages'
import { setStatusBarStyle } from '../../statusBar'
import { closePage, navigate, RouteOptions } from './utils'
import { showWebview } from './webview'

export const $reLaunch: DefineAsyncApiFn<API_TYPE_RE_LAUNCH> = (
  { url },
  { resolve, reject }
) => {
  const { path, query } = parseUrl(url)
  navigate(path, () => {
    _reLaunch({
      url,
      path,
      query,
    })
      .then(resolve)
      .catch(reject)
  })
}

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  $reLaunch,
  ReLaunchProtocol,
  ReLaunchOptions
)

interface ReLaunchOptions extends RouteOptions {}

function _reLaunch({ url, path, query }: ReLaunchOptions): Promise<undefined> {
  return new Promise((resolve) => {
    // 获取目前所有页面
    const pages = getAllPages().slice(0)
    const routeOptions = __uniRoutes.find((route) => route.path === path)!
    if (routeOptions.meta.isTabBar) {
      tabBar.switchTab(path.slice(1))
    }

    showWebview(
      registerPage({
        url,
        path,
        query,
        openType: 'reLaunch',
      }),
      'none',
      0,
      () => {
        pages.forEach((page) => closePage(page, 'none'))
        resolve(undefined)
      }
    )
    setStatusBarStyle()
  })
}
