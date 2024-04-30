import {
  API_RE_LAUNCH,
  type API_TYPE_RE_LAUNCH,
  ReLaunchOptions,
  ReLaunchProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { $reLaunch } from './_reLaunch'

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  $reLaunch,
  ReLaunchProtocol,
  ReLaunchOptions
)
