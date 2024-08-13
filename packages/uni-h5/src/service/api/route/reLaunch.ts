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
  // @ts-expect-error
  ({ url, isAutomatedTesting }, { resolve, reject }) => {
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      reLaunchPagesBeforeEntryPages.push({
        args: { type: API_RE_LAUNCH, url, isAutomatedTesting },
        resolve,
        reject,
      })
      return
    }

    return (
      removeAllPages(),
      navigate({ type: API_RE_LAUNCH, url, isAutomatedTesting })
        .then(resolve)
        .catch(reject)
    )
  },
  ReLaunchProtocol,
  ReLaunchOptions
)
