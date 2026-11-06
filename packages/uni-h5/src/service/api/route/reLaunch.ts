import {
  API_RE_LAUNCH,
  type API_TYPE_RE_LAUNCH,
  ReLaunchOptions,
  ReLaunchProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  entryPageState,
  getCurrentPagesMap,
  reLaunchPagesBeforeEntryPages,
  removePage,
} from '../../../framework/setup/page'
import { navigate } from './utils'

export function removeAllPages() {
  const keys = getCurrentPagesMap().keys()
  for (const routeKey of keys) {
    removePage(routeKey)
  }
}

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  function reLaunch(args, callbacks) {
    // @ts-expect-error 自动化测试的内部参数不属于公开 API 类型。
    const { url, isAutomatedTesting } = args
    const { resolve, reject } = callbacks
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      const options = { url, isAutomatedTesting }
      reLaunchPagesBeforeEntryPages.push(() => {
        reLaunch(options, callbacks)
      })
      return
    }

    if (!__X__) {
      removeAllPages()
    }
    return navigate({ type: API_RE_LAUNCH, url, isAutomatedTesting })
      .then(resolve)
      .catch(reject)
  },
  ReLaunchProtocol,
  ReLaunchOptions
)
