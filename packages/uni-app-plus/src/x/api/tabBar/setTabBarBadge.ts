import { getTabBar } from '../../framework/app/tabBar'
import {
  API_SET_TAB_BAR_BADGE,
  type API_TYPE_SET_TAB_BAR_BADGE,
  SetTabBarBadgeOptions,
  SetTabBarBadgeProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const setTabBarBadge = defineAsyncApi<API_TYPE_SET_TAB_BAR_BADGE>(
  API_SET_TAB_BAR_BADGE,
  ({ index, text }, { resolve, reject }) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    tabBar!.setTabBarBadge(
      new Map<string, any | null>([
        ['index', index],
        ['text', text],
      ])
    )
    resolve()
  },
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions
)
