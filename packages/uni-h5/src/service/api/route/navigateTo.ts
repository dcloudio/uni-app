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
  ({ url, events }, { resolve, reject }) =>
    navigate({ type: API_NAVIGATE_TO, url, events })
      .then(resolve)
      .catch(reject),
  NavigateToProtocol,
  NavigateToOptions
)
