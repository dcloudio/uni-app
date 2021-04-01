import {
  API_REDIRECT_TO,
  defineAsyncApi,
  RedirectToOptions,
  RedirectToProtocol,
} from '@dcloudio/uni-api'

export const redirectTo = defineAsyncApi(
  API_REDIRECT_TO,
  () => {},
  RedirectToProtocol,
  RedirectToOptions
)
