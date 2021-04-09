import {
  defineAsyncApi,
  HideTabBarProtocol,
  HideTabBarRedDotOptions,
  HideTabBarRedDotProtocol,
  RemoveTabBarBadgeOptions,
  RemoveTabBarBadgeProtocol,
  SetTabBarBadgeOptions,
  SetTabBarBadgeProtocol,
  SetTabBarItemOptions,
  SetTabBarItemProtocol,
  SetTabBarStyleOptions,
  SetTabBarStyleProtocol,
  ShowTabBarProtocol,
  ShowTabBarRedDotOptions,
  ShowTabBarRedDotProtocol,
} from '@dcloudio/uni-api'
import { useTabBar } from '../../../framework/plugin/state'

function setTabBar(
  type: string,
  args: Record<string, any>,
  resolve: () => void
) {
  const tabBar = useTabBar()!
  switch (type) {
    case 'showTabBar':
      tabBar.shown = true
      break
    case 'hideTabBar':
      tabBar.shown = false
  }
  resolve()
}

export const setTabBarItem = defineAsyncApi<typeof uni.setTabBarItem>(
  'setTabBarItem',
  (args, { resolve }) => {
    setTabBar('setTabBarItem', args, resolve)
  },
  SetTabBarItemProtocol,
  SetTabBarItemOptions
)

export const setTabBarStyle = defineAsyncApi<typeof uni.setTabBarStyle>(
  'setTabBarStyle',
  () => {},
  SetTabBarStyleProtocol,
  SetTabBarStyleOptions
)

export const hideTabBar = defineAsyncApi<typeof uni.hideTabBar>(
  'hideTabBar',
  (args, { resolve }) => {
    setTabBar('hideTabBar', args, resolve)
  },
  HideTabBarProtocol
)

export const showTabBar = defineAsyncApi<typeof uni.showTabBar>(
  'showTabBar',
  (args, { resolve }) => {
    setTabBar('showTabBar', args, resolve)
  },
  ShowTabBarProtocol
)
export const hideTabBarRedDot = defineAsyncApi<typeof uni.hideTabBarRedDot>(
  'hideTabBarRedDot',
  () => {},
  HideTabBarRedDotProtocol,
  HideTabBarRedDotOptions
)

export const showTabBarRedDot = defineAsyncApi<typeof uni.showTabBarRedDot>(
  'showTabBarRedDot',
  () => {},
  ShowTabBarRedDotProtocol,
  ShowTabBarRedDotOptions
)

export const removeTabBarBadge = defineAsyncApi<typeof uni.removeTabBarBadge>(
  'removeTabBarBadge',
  () => {},
  RemoveTabBarBadgeProtocol,
  RemoveTabBarBadgeOptions
)

export const setTabBarBadge = defineAsyncApi<typeof uni.setTabBarBadge>(
  'setTabBarBadge',
  () => {},
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions
)
