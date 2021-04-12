import {
  API_RE_LAUNCH,
  API_TYPE_RE_LAUNCH,
  defineAsyncApi,
  ReLaunchOptions,
  ReLaunchProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  ({ url }, { resolve, reject }) =>
    navigate(API_RE_LAUNCH, url).then(resolve).catch(reject),
  ReLaunchProtocol,
  ReLaunchOptions
)
