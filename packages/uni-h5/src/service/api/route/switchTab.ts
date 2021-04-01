import {
  API_SWITCH_TAB,
  defineAsyncApi,
  SwitchTabOptions,
  SwitchTabProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const switchTab = defineAsyncApi<typeof uni.switchTab>(
  API_SWITCH_TAB,
  (options, callback?: Function) =>
    navigate(API_SWITCH_TAB, options.url, callback!),
  SwitchTabProtocol,
  SwitchTabOptions
)
