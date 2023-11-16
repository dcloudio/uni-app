import {
  API_NAVIGATE_TO,
  API_TYPE_NAVIGATE_TO,
  defineAsyncApi,
  NavigateToOptions,
  NavigateToProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const navigateTo = defineAsyncApi<API_TYPE_NAVIGATE_TO>(
  API_NAVIGATE_TO,
  // @ts-ignore
  ({ url, events, isAutomatedTesting }, { resolve, reject }) =>
    navigate({ type: API_NAVIGATE_TO, url, events, isAutomatedTesting })
      // @ts-ignore
      .then(resolve)
      .catch(reject),
  NavigateToProtocol,
  NavigateToOptions
)
