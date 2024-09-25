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
  // @ts-expect-error
  ({ url, events, isAutomatedTesting }, { resolve, reject }) => {
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      navigateToPagesBeforeEntryPages.push({
        args: { type: API_NAVIGATE_TO, url, events, isAutomatedTesting },
        resolve,
        reject,
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
