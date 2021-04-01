import {
  API_SWITCH_TAB,
  defineAsyncApi,
  SwitchTabOptions,
  SwitchTabProtocol,
} from '@dcloudio/uni-api'

export const switchTab = defineAsyncApi(
  API_SWITCH_TAB,
  () => {},
  SwitchTabProtocol,
  SwitchTabOptions
)
