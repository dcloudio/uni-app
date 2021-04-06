import {
  API_SWITCH_TAB,
  defineAsyncApi,
  SwitchTabOptions,
  SwitchTabProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const switchTab = defineAsyncApi<typeof uni.switchTab>(
  API_SWITCH_TAB,
  ({ url }) => navigate(API_SWITCH_TAB, url),
  SwitchTabProtocol,
  SwitchTabOptions
)
