import type {
  API_TYPE_RE_LAUNCH,
  DefineAsyncApiFn,
  ReLaunchOptions,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import tabBar from '../../framework/app/tabBar'
import { registerPage } from '../../framework/page/register'
import { getAllPages } from '../../framework/page/getCurrentPages'
import { type RouteOptions, closePage, navigate } from './utils'
import { showWebview } from '@dcloudio/uni-app-plus/service/api/route/webview'
import { setStatusBarStyle } from '../../../helpers/statusBar'

interface ReLaunchOptions extends RouteOptions {}

export const $reLaunch: DefineAsyncApiFn<API_TYPE_RE_LAUNCH> = (
  { url },
  { resolve, reject }
) => {
  const { path, query } = parseUrl(url)
  navigate(
    path,
    () => {
      _reLaunch({
        url,
        path,
        query,
      })
        .then(resolve)
        .catch(reject)
    },
    false
  )
}

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
