import {
  defineAsyncApi,
  API_TYPE_SHOW_TAB_BAR,
  API_SHOW_TAB_BAR,
  ShowTabBarProtocol,
} from '@dcloudio/uni-api'
import { getTabBar } from '../../framework/app/tabBar'

export const showTabBar = defineAsyncApi<API_TYPE_SHOW_TAB_BAR>(
  API_SHOW_TAB_BAR,
  (args, { resolve, reject }) => {
    const tabBar = getTabBar()
    const animation = args && args.animation

    if (tabBar === null) {
      reject('tabBar is not exist')
      return
    }
    tabBar!.showTabBar(new Map<string, any | null>([['animation', animation]]))
    resolve()
  },
  ShowTabBarProtocol
)
