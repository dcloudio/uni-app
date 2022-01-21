import {
  API_RE_LAUNCH,
  API_TYPE_RE_LAUNCH,
  defineAsyncApi,
  ReLaunchOptions,
  ReLaunchProtocol,
} from '@dcloudio/uni-api'
import { $reLaunch } from './_reLaunch'

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  $reLaunch,
  ReLaunchProtocol,
  ReLaunchOptions
)
