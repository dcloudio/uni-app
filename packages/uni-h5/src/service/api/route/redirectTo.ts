import {
  API_REDIRECT_TO,
  type API_TYPE_REDIRECT_TO,
  RedirectToOptions,
  RedirectToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'
import { normalizeRouteKey, removePage } from '../../../framework/setup/page'
import { navigate } from './utils'

function removeLastPage() {
  const page = getCurrentPage()
  if (!page) {
    return
  }
  const $page = page.$page
  removePage(normalizeRouteKey($page.path, $page.id))
}

export const redirectTo = defineAsyncApi<API_TYPE_REDIRECT_TO>(
  API_REDIRECT_TO,
  // @ts-expect-error
  ({ url, isAutomatedTesting }, { resolve, reject }) => {
    return (
      // TODO exists 属性未实现
      removeLastPage(),
      navigate({ type: API_REDIRECT_TO, url, isAutomatedTesting })
        .then(resolve)
        .catch(reject)
    )
  },
  RedirectToProtocol,
  RedirectToOptions
)
