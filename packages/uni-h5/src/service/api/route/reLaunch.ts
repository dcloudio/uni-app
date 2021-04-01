import {
  API_RE_LAUNCH,
  defineAsyncApi,
  ReLaunchOptions,
  ReLaunchProtocol,
} from '@dcloudio/uni-api'

export const reLaunch = defineAsyncApi(
  API_RE_LAUNCH,
  () => {},
  ReLaunchProtocol,
  ReLaunchOptions
)
