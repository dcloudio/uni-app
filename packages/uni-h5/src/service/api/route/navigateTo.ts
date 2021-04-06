import {
  API_NAVIGATE_TO,
  defineAsyncApi,
  NavigateToOptions,
  NavigateToProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const navigateTo = defineAsyncApi<typeof uni.navigateTo>(
  API_NAVIGATE_TO,
  ({ url }) => navigate(API_NAVIGATE_TO, url),
  NavigateToProtocol,
  NavigateToOptions
)
