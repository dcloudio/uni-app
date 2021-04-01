import {
  API_REDIRECT_TO,
  defineAsyncApi,
  RedirectToOptions,
  RedirectToProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const redirectTo = defineAsyncApi<typeof uni.redirectTo>(
  API_REDIRECT_TO,
  (options, callback?: Function) =>
    navigate(API_REDIRECT_TO, options.url, callback!),
  RedirectToProtocol,
  RedirectToOptions
)
