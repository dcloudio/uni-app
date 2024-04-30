import {
  API_REDIRECT_TO,
  type API_TYPE_REDIRECT_TO,
  RedirectToOptions,
  RedirectToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import { getCurrentPage } from '@dcloudio/uni-core'
import { getAllPages } from '../../../service/framework/page/getCurrentPages'
import { registerPage } from '../../framework/page'
import type { RouteOptions } from '../../../service/api/route/utils'
import { showWebview } from './webview'
import type { ComponentPublicInstance } from 'vue'
import { setStatusBarStyle } from '../../statusBar'
import { isTabPage } from '../../framework/app/tabBar'
import { closePage } from './utils'

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
  const lastPage = getCurrentPage() as ComponentPublicInstance
  // 与 uni-app x 安卓一致，后移除页面

  return new Promise((resolve) => {
    showWebview(
      registerPage({
        url,
        path,
        query,
        openType:
          isTabPage(lastPage) || getAllPages().length === 1
            ? 'reLaunch'
            : 'redirectTo',
      }),
      'none',
      0,
      () => {
        if (lastPage) {
          removePages(lastPage)
        }
        resolve(undefined)
        setStatusBarStyle()
      }
    )
  })
}

function removePages(currentPage: ComponentPublicInstance) {
  if (isTabPage(currentPage)) {
    const pages = getAllPages().slice(0, -1)
    pages.forEach((page) => {
      closePage(page, 'none')
    })
  } else {
    closePage(currentPage, 'none')
  }
}
