import {
  API_REDIRECT_TO,
  API_TYPE_REDIRECT_TO,
  defineAsyncApi,
  RedirectToOptions,
  RedirectToProtocol,
} from '@dcloudio/uni-api'
import { removeCurrentPages } from '../../../framework/plugin/page'
import { navigate } from './utils'

export const redirectTo = defineAsyncApi<API_TYPE_REDIRECT_TO>(
  API_REDIRECT_TO,
  ({ url }, { resolve, reject }) => {
    removeCurrentPages(1, true)
    return navigate(API_REDIRECT_TO, url).then(resolve).catch(reject)
  },
  RedirectToProtocol,
  RedirectToOptions
)
