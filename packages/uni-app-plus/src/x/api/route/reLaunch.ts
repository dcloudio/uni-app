import {
  API_RE_LAUNCH,
  API_TYPE_RE_LAUNCH,
  defineAsyncApi,
  ReLaunchOptions,
  ReLaunchProtocol,
  DefineAsyncApiFn,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import { RouteOptions } from '../../../service/api/route/utils'
import { getTabIndex, switchSelect } from '../../framework/app/tabBar'
import { showWebview } from './webview'
import { registerPage } from '../../framework/page/register'
import { getAllPages } from '../../../service/framework/page/getCurrentPages'
import { closePage } from './utils'

interface ReLaunchOptions extends RouteOptions {}

export const $reLaunch: DefineAsyncApiFn<API_TYPE_RE_LAUNCH> = (
  { url },
  { resolve, reject }
) => {
  const { path, query } = parseUrl(url)
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
    const pages = getAllPages().slice(0)
    let selected: number = getTabIndex(path)
    function callback() {
      pages.forEach((page) => closePage(page, 'none'))
      resolve(undefined)
      // TODO setStatusBarStyle()
    }
    if (selected === -1) {
      showWebview(
        registerPage({ url, path, query, openType: 'reLaunch' }),
        'none',
        0,
        callback
      )
    } else {
      switchSelect(selected, path, query, true, callback)
    }
  })
}

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  $reLaunch,
  ReLaunchProtocol,
  ReLaunchOptions
)
