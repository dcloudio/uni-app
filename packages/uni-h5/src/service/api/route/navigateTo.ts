import {
  API_NAVIGATE_TO,
  defineAsyncApi,
  NavigateToOptions,
  NavigateToProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const navigateTo = defineAsyncApi<typeof uni.navigateTo>(
  API_NAVIGATE_TO,
  ({ url }, { resolve, reject }) =>
    navigate(API_NAVIGATE_TO, url).then(resolve).catch(reject),
  NavigateToProtocol,
  NavigateToOptions
)
