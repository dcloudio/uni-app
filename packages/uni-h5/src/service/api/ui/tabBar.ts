import { hasOwn } from '@vue/shared'
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
const setTabBarItemProps = ['text', 'iconPath', 'selectedIconPath']
const setTabBarStyleProps = [
  'color',
  'selectedColor',
  'backgroundColor',
  'borderStyle',
]
const setTabBarBadgeProps = ['badge', 'redDot']

function setProperties(
  item: Record<string, any>,
  props: string[],
  propsData: Record<string, any>
) {
  props.forEach(function (name) {
    if (hasOwn(propsData, name)) {
      item[name] = propsData[name]
    }
  })
}

function normalizeRoute(
  index: number,
  oldPagePath: string,
  newPagePath: string
) {
  const oldTabBarRoute = __uniRoutes.find(
    (item) => item.meta.route === oldPagePath
  )
  if (oldTabBarRoute) {
    const { meta } = oldTabBarRoute
    delete meta.tabBarIndex
    meta.isQuit = meta.isTabBar = false
  }
  const newTabBarRoute = __uniRoutes.find(
    (item) => item.meta.route === newPagePath
  )
  if (newTabBarRoute) {
    const { meta } = newTabBarRoute
    meta.tabBarIndex = index
    meta.isQuit = meta.isTabBar = false
  }
}

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
      break
    case 'setTabBarItem':
      const { index } = args
      const tabBarItem = tabBar.list[index]
      const oldPagePath = tabBarItem.pagePath
      setProperties(tabBarItem, setTabBarItemProps, args)
      const { pagePath } = args
      if (pagePath && pagePath !== oldPagePath) {
        normalizeRoute(index, oldPagePath, pagePath)
      }
      break
    case 'setTabBarStyle':
      setProperties(tabBar, setTabBarStyleProps, args)
      break
    case 'showTabBarRedDot':
      setProperties(tabBar.list[args.index], setTabBarBadgeProps, {
        badge: '',
        redDot: true,
      })
      break
    case 'setTabBarBadge':
      setProperties(tabBar.list[args.index], setTabBarBadgeProps, {
        badge: args.text,
        redDot: true,
      })
      break
    case 'hideTabBarRedDot':
    case 'removeTabBarBadge':
      setProperties(tabBar.list[args.index], setTabBarBadgeProps, {
        badge: '',
        redDot: false,
      })
      break
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
  (args, { resolve }) => {
    setTabBar('setTabBarStyle', args, resolve)
  },
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
  (args, { resolve }) => {
    setTabBar('hideTabBarRedDot', args, resolve)
  },
  HideTabBarRedDotProtocol,
  HideTabBarRedDotOptions
)

export const showTabBarRedDot = defineAsyncApi<typeof uni.showTabBarRedDot>(
  'showTabBarRedDot',
  (args, { resolve }) => {
    setTabBar('showTabBarRedDot', args, resolve)
  },
  ShowTabBarRedDotProtocol,
  ShowTabBarRedDotOptions
)

export const removeTabBarBadge = defineAsyncApi<typeof uni.removeTabBarBadge>(
  'removeTabBarBadge',
  (args, { resolve }) => {
    setTabBar('removeTabBarBadge', args, resolve)
  },
  RemoveTabBarBadgeProtocol,
  RemoveTabBarBadgeOptions
)

export const setTabBarBadge = defineAsyncApi<typeof uni.setTabBarBadge>(
  'setTabBarBadge',
  (args, { resolve }) => {
    setTabBar('setTabBarBadge', args, resolve)
  },
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions
)
