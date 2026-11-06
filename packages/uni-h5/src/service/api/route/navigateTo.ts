import {
  API_NAVIGATE_TO,
  type API_TYPE_NAVIGATE_TO,
  NavigateToOptions,
  NavigateToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { navigate } from './utils'
import {
  entryPageState,
  navigateToPagesBeforeEntryPages,
} from '../../../framework/setup/page'

export const navigateTo = defineAsyncApi<API_TYPE_NAVIGATE_TO>(
  API_NAVIGATE_TO,
  function navigateTo(args, callbacks) {
    // @ts-expect-error 自动化测试的内部参数不属于公开 API 类型。
    const { url, events, isAutomatedTesting } = args
    const { resolve, reject } = callbacks
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      const options = { url, events, isAutomatedTesting }
      navigateToPagesBeforeEntryPages.push(() => {
        navigateTo(options, callbacks)
      })
      return
    }

    return (
      navigate({ type: API_NAVIGATE_TO, url, events, isAutomatedTesting })
        // @ts-expect-error
        .then(resolve)
        .catch(reject)
    )
  },
  NavigateToProtocol,
  NavigateToOptions
)
