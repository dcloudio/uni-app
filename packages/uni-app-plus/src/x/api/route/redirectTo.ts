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
import { closeWebview, showWebview } from './webview'
import { ComponentPublicInstance } from 'vue'

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
  if (lastPage) {
    removePage(lastPage)
  }

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
          closeWebview((lastPage as ComponentPublicInstance).$appPage!, 'none')
        }
        resolve(undefined)
        // TODO setStatusBarStyle()
      }
    )
  })
}
