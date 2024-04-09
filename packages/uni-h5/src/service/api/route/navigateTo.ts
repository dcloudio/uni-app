import {
  API_NAVIGATE_TO,
  type API_TYPE_NAVIGATE_TO,
  NavigateToOptions,
  NavigateToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const navigateTo = defineAsyncApi<API_TYPE_NAVIGATE_TO>(
  API_NAVIGATE_TO,
  // @ts-expect-error
  ({ url, events, isAutomatedTesting }, { resolve, reject }) =>
    navigate({ type: API_NAVIGATE_TO, url, events, isAutomatedTesting })
      // @ts-expect-error
      .then(resolve)
      .catch(reject),
  NavigateToProtocol,
  NavigateToOptions
)
