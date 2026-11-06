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
  getPage$BasePage,
  normalizeRouteKey,
  redirectToPagesBeforeEntryPages,
  removePage,
} from '../../../framework/setup/page'
import { navigate } from './utils'

export function removeLastPage() {
  const page = __X__
    ? (getCurrentPage() as unknown as UniPage)?.vm
    : getCurrentPage()
  if (!page) {
    return
  }
  const $page = getPage$BasePage(page)
  removePage(normalizeRouteKey($page.path, $page.id))
}

export const redirectTo = defineAsyncApi<API_TYPE_REDIRECT_TO>(
  API_REDIRECT_TO,
  function redirectTo(args, callbacks) {
    // @ts-expect-error 自动化测试的内部参数不属于公开 API 类型。
    const { url, isAutomatedTesting } = args
    const { resolve, reject } = callbacks
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      const options = { url, isAutomatedTesting }
      redirectToPagesBeforeEntryPages.push(() => {
        redirectTo(options, callbacks)
      })
      return
    }

    // TODO exists 属性未实现
    if (!__X__) {
      removeLastPage()
    }
    return navigate({ type: API_REDIRECT_TO, url, isAutomatedTesting })
      .then(resolve)
      .catch(reject)
  },
  RedirectToProtocol,
  RedirectToOptions
)
