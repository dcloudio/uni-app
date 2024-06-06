export { navigateTo } from './route/navigateTo'
export { navigateBack } from './route/navigateBack'
export { redirectTo } from './route/redirectTo'
export { switchTab } from './route/switchTab'
export { reLaunch } from './route/reLaunch'

export { setTabBarBadge } from './tabBar/setTabBarBadge'
export { removeTabBarBadge } from './tabBar/removeTabBarBadge'
export { setTabBarItem } from './tabBar/setTabBarItem'
export { setTabBarStyle } from './tabBar/setTabBarStyle'
export { hideTabBar } from './tabBar/hideTabBar'
export { showTabBar } from './tabBar/showTabBar'
export { showTabBarRedDot } from './tabBar/showTabBarRedDot'
export { hideTabBarRedDot } from './tabBar/hideTabBarRedDot'
export { onTabBarMidButtonTap } from './tabBar/onTabBarMidButtonTap'

// navigation
export { setNavigationBarColor } from './navigationBar/setNavigationBarColor'
export { setNavigationBarTitle } from './navigationBar/setNavigationBarTitle'

// dom
export { getElementById } from './dom/getElementById'
export { createSelectorQuery } from './dom/createSelectorQuery'

// ui
export { pageScrollTo } from './ui/pageScrollTo'
export { loadFontFace } from './ui/loadFontFace'
export { startPullDownRefresh } from './ui/startPullDownRefresh'
export { stopPullDownRefresh } from './ui/stopPullDownRefresh'
// base
export { $emit, $off, $on, $once } from './base/event-bus'
export { removeInterceptor, addInterceptor } from './base/interceptor'
export { getLaunchOptionsSync } from './base/getLaunchOptionsSync'
export { env } from './base/env'

export {
  initUTSProxyClass,
  initUTSProxyFunction,
  initUTSIndexClassName,
  initUTSClassName,
  initUTSPackageName,
  requireUTSPlugin,
  registerUTSPlugin,
  registerUTSInterface,
} from '../../service/api/plugin/uts'
// 临时使用 1.0 的日志格式
export { __log__ } from '../../service/api/plugin/log'
