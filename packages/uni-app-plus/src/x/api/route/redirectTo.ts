import {
  API_REDIRECT_TO,
  API_TYPE_REDIRECT_TO,
  defineAsyncApi,
  RedirectToOptions,
  RedirectToProtocol,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import { getCurrentPage } from '@dcloudio/uni-core'
import { removePage } from '../../../service/framework/page/getCurrentPages'
import { registerPage } from '../../framework/page'
import { RouteOptions } from '../../../service/api/route/utils'
import { showWebview } from './webview'

export const redirectTo = defineAsyncApi<API_TYPE_REDIRECT_TO>(
  API_REDIRECT_TO,
  ({ url }, { resolve, reject }) => {
    const { path, query } = parseUrl(url)
    _redirectTo({
      url,
      path,
      query,
    })
      .then(resolve)
      .catch(reject)
  },
  RedirectToProtocol,
  RedirectToOptions
)

interface RedirectToOptions extends RouteOptions {}

function _redirectTo({
  url,
  path,
  query,
}: RedirectToOptions): Promise<undefined> {
  const lastPage = getCurrentPage()
  lastPage && removePage(lastPage)

  return new Promise((resolve) => {
    showWebview(
      registerPage({
        url,
        path,
        query,
        openType: 'redirectTo',
      }),
      'none',
      0,
      () => {
        if (lastPage) {
          const nPage = __pageManager.findPageById(lastPage.$page.id + '')!
          // TODO preload removePreloadWebview
          nPage.close(new Map<string, any>([['animationType', 'none']]))
        }
        resolve(undefined)
      }
    )
    // TODO setStatusBarStyle()
  })
}
