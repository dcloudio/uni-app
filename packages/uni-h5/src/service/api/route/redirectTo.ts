import {
  API_REDIRECT_TO,
  API_TYPE_REDIRECT_TO,
  defineAsyncApi,
  RedirectToOptions,
  RedirectToProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const redirectTo = defineAsyncApi<API_TYPE_REDIRECT_TO>(
  API_REDIRECT_TO,
  ({ url }, { resolve, reject }) =>
    navigate(API_REDIRECT_TO, url).then(resolve).catch(reject),
  RedirectToProtocol,
  RedirectToOptions
)
