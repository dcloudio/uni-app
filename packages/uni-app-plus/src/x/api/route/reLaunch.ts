import {
  API_RE_LAUNCH,
  type API_TYPE_RE_LAUNCH,
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

function _reLaunch({ url, path, query }: ReLaunchOptions): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pages = getAllPages().slice(0)
      let selected: number = getTabIndex(path)
      function callback() {
        pages.forEach((page) => closePage(page, 'none'))
        pages.length = 0
        resolve(undefined)
        setStatusBarStyle()
      }
      if (selected === -1) {
        showWebview(
          registerPage({
            url,
            path,
            query,
            openType: 'reLaunch',
            onRegistered: callback,
          }),
          'none',
          0
        )
      } else {
        switchSelect(selected, path, query, true, callback)
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
