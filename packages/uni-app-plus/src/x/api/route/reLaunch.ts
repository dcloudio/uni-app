import {
  API_RE_LAUNCH,
  type API_TYPE_RE_LAUNCH,
  type AppRouteOpenType,
  type DefineAsyncApiFn,
  ReLaunchOptions,
  ReLaunchProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import type { RouteOptions } from '../../../service/api/route/utils'
import { getTabIndex, switchSelect } from '../../framework/app/tabBar'
import { showWebview } from './webview'
import { registerPage } from '../../framework/page/register'
import { getAllPages } from '../../../service/framework/page/getCurrentPages'
import { closePage } from './utils'
import { setStatusBarStyle } from '../../statusBar'
import {
  entryPageState,
  reLaunchPagesBeforeEntryPages,
} from '../../framework/app'
import { type ResolvedAppRoute, resolveAppRoute } from './appRoute'

interface ReLaunchOptions extends RouteOptions {}

export const $reLaunch: DefineAsyncApiFn<API_TYPE_RE_LAUNCH> = (
  { url },
  { resolve, reject }
) => {
  const { path, query } = parseUrl(url)
  if (!entryPageState.isReady) {
    reLaunchPagesBeforeEntryPages.push({
      args: { url },
      handler: { resolve, reject },
    })
    return
  }
  _reLaunch({
    url,
    path,
    query,
  })
    .then(resolve)
    .catch(reject)
}

export function _reLaunch(
  options: ReLaunchOptions,
  appRouteOpenType: AppRouteOpenType = API_RE_LAUNCH,
  resolvedAppRoute?: ResolvedAppRoute
): Promise<undefined> {
  const appRoute =
    resolvedAppRoute || resolveAppRoute(options.url, appRouteOpenType)
  const { path, query } = parseUrl(appRoute.url)
  return new Promise((resolve) => {
    setTimeout(() => {
      const pages = getAllPages().slice(0)
      let selected: number = getTabIndex(path)
      let isRegistered = false
      let isShown = false
      function callback() {
        if (!isRegistered || !isShown) {
          return
        }
        pages.forEach((page) => closePage(page, 'none'))
        pages.length = 0
        resolve(undefined)
        setStatusBarStyle()
      }
      if (selected === -1) {
        showWebview(
          registerPage({
            url: appRoute.url,
            path,
            query,
            openType: 'reLaunch',
            appRouteOpenType,
            appRouteContext: appRoute.context,
            onRegistered() {
              isRegistered = true
              callback()
            },
          }),
          'none',
          0,
          () => {
            isShown = true
            callback()
          }
        )
      } else {
        isRegistered = true
        isShown = true
        switchSelect(
          selected,
          path,
          query,
          true,
          callback,
          appRouteOpenType,
          true,
          appRoute.context
        )
      }
    }, 0)
  })
}

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  $reLaunch,
  ReLaunchProtocol,
  ReLaunchOptions
)
