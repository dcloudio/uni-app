import {
  API_REDIRECT_TO,
  type API_TYPE_REDIRECT_TO,
  RedirectToOptions,
  RedirectToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'
import {
  entryPageState,
  normalizeRouteKey,
  redirectToPagesBeforeEntryPages,
  removePage,
} from '../../../framework/setup/page'
import { navigate } from './utils'

export function removeLastPage() {
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
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      redirectToPagesBeforeEntryPages.push({
        args: { type: API_REDIRECT_TO, url, isAutomatedTesting },
        resolve,
        reject,
      })
      return
    }

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
