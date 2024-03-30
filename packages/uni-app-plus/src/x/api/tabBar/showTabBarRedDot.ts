import {
  defineAsyncApi,
  API_TYPE_SHOW_TAB_BAR_RED_DOT,
  API_SHOW_TAB_BAR_RED_DOT,
  ShowTabBarRedDotProtocol,
  ShowTabBarRedDotOptions,
} from '@dcloudio/uni-api'
import { getTabBar } from '../../framework/app/tabBar'

export const showTabBarRedDot = defineAsyncApi<API_TYPE_SHOW_TAB_BAR_RED_DOT>(
  API_SHOW_TAB_BAR_RED_DOT,
  ({ index }, { resolve, reject }) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    tabBar!.showTabBarRedDot(new Map<string, any | null>([['index', index]]))
    resolve()
  },
  ShowTabBarRedDotProtocol,
  ShowTabBarRedDotOptions
)
