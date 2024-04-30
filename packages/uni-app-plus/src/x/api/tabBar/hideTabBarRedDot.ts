import {
  API_HIDE_TAB_BAR_RED_DOT,
  type API_TYPE_HIDE_TAB_BAR_RED_DOT,
  HideTabBarRedDotOptions,
  HideTabBarRedDotProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getTabBar } from '../../framework/app/tabBar'

export const hideTabBarRedDot = defineAsyncApi<API_TYPE_HIDE_TAB_BAR_RED_DOT>(
  API_HIDE_TAB_BAR_RED_DOT,
  ({ index }, { resolve, reject }) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    tabBar!.hideTabBarRedDot(new Map<string, any | null>([['index', index]]))
    resolve()
  },
  HideTabBarRedDotProtocol,
  HideTabBarRedDotOptions
)
