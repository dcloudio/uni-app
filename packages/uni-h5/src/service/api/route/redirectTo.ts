import {
  API_REDIRECT_TO,
  defineAsyncApi,
  RedirectToOptions,
  RedirectToProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const redirectTo = defineAsyncApi<typeof uni.redirectTo>(
  API_REDIRECT_TO,
  ({ url }, { resolve, reject }) =>
    navigate(API_REDIRECT_TO, url).then(resolve).catch(reject),
  RedirectToProtocol,
  RedirectToOptions
)
