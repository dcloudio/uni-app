import {
  API_NAVIGATE_TO,
  API_TYPE_NAVIGATE_TO,
  defineAsyncApi,
  NavigateToOptions,
  NavigateToProtocol,
} from '@dcloudio/uni-api'

export const navigateTo = defineAsyncApi<API_TYPE_NAVIGATE_TO>(
  API_NAVIGATE_TO,
  ({ url }, { resolve, reject }) => {},
  NavigateToProtocol,
  NavigateToOptions
)
