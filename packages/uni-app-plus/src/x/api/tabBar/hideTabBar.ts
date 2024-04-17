import {
  API_HIDE_TAB_BAR,
  type API_TYPE_HIDE_TAB_BAR,
  HideTabBarProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getTabBar } from '../../framework/app/tabBar'
import type { HideTabBarOptions } from '@dcloudio/uni-app-x/types/uni'

export const hideTabBar = defineAsyncApi<API_TYPE_HIDE_TAB_BAR>(
  API_HIDE_TAB_BAR,
  (options: HideTabBarOptions | null, { resolve, reject }) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    tabBar!.hideTabBar(
      new Map<string, any | null>([['animation', options?.animation]])
    )
    resolve()
  },
  HideTabBarProtocol
)
