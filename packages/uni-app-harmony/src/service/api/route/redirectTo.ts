import {
  API_REDIRECT_TO,
  type API_TYPE_REDIRECT_TO,
  RedirectToOptions,
  RedirectToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import { getCurrentPage } from '@dcloudio/uni-core'
import { removePage } from '../../framework/page/getCurrentPages'
import { registerPage } from '../../framework/page'
import { type RouteOptions, navigate } from './utils'
import { showWebview } from '@dcloudio/uni-app-plus/service/api/route/webview'
import type { ComponentPublicInstance } from 'vue'
import { setStatusBarStyle } from '../../../helpers/statusBar'

export const redirectTo = defineAsyncApi<API_TYPE_REDIRECT_TO>(
  API_REDIRECT_TO,
  ({ url }, { resolve, reject }) => {
    const { path, query } = parseUrl(url)
    navigate(
      path,
      () => {
        _redirectTo({
          url,
          path,
          query,
        })
          .then(resolve)
          .catch(reject)
      },
      false
    )
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
  // TODO exists
  //   if (exists === 'back') {
  //     const existsPageIndex = findExistsPageIndex(url)
  //     if (existsPageIndex !== -1) {
  //       const delta = len - existsPageIndex
  //       if (delta > 0) {
  //         navigateBack({
  //           delta,
  //         })
  //         invoke(callbackId, {
  //           errMsg: 'redirectTo:ok',
  //         })
  //         return
  //       }
  //     }
  //   }

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
          const webview = (lastPage as ComponentPublicInstance)
            .$getAppWebview!()
          webview.close('none')
        }
        resolve(undefined)
      }
    )
    setStatusBarStyle()
  })
}
