import {
  API_SWITCH_TAB,
  API_TYPE_SWITCH_TAB,
  defineAsyncApi,
  SwitchTabOptions,
  SwitchTabProtocol,
} from '@dcloudio/uni-api'
import { navigate } from './utils'

export const switchTab = defineAsyncApi<API_TYPE_SWITCH_TAB>(
  API_SWITCH_TAB,
  ({ url }, { resolve, reject }) =>
    navigate(API_SWITCH_TAB, url).then(resolve).catch(reject),
  SwitchTabProtocol,
  SwitchTabOptions
)
