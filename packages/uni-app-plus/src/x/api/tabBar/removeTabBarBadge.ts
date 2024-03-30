import { getTabBar } from '../../framework/app/tabBar'
import {
  defineAsyncApi,
  API_TYPE_REMOVE_TAB_BAR_BADGE,
  API_REMOVE_TAB_BAR_BADGE,
  RemoveTabBarBadgeOptions,
  RemoveTabBarBadgeProtocol,
} from '@dcloudio/uni-api'

export const removeTabBarBadge = defineAsyncApi<API_TYPE_REMOVE_TAB_BAR_BADGE>(
  API_REMOVE_TAB_BAR_BADGE,
  ({ index }, { resolve, reject }) => {
    // setTabBarBadgeNone(index)
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    tabBar.removeTabBarBadge(new Map<string, any | null>([['index', index]]))
    resolve()
  },
  RemoveTabBarBadgeProtocol,
  RemoveTabBarBadgeOptions
)
