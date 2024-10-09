import { addLeadingSlash, removeLeadingSlash } from '@dcloudio/uni-shared'
import { get$pageByPage } from './util'

export function normalizeRoute(toRoute: string) {
  if (toRoute.indexOf('/') === 0) {
    return toRoute
  }
  let fromRoute = ''
  const pages = getCurrentPages()
  if (pages.length) {
    fromRoute = get$pageByPage(pages[pages.length - 1]).route
  }
  return getRealRoute(fromRoute, toRoute)
}

export function getRealRoute(fromRoute: string, toRoute: string): string {
  if (toRoute.indexOf('/') === 0) {
    return toRoute
  }
  if (toRoute.indexOf('./') === 0) {
    return getRealRoute(fromRoute, toRoute.slice(2))
  }
  const toRouteArray = toRoute.split('/')
  const toRouteLength = toRouteArray.length
  let i = 0
  for (; i < toRouteLength && toRouteArray[i] === '..'; i++) {
    // noop
  }
  toRouteArray.splice(0, i)
  toRoute = toRouteArray.join('/')
  const fromRouteArray = fromRoute.length > 0 ? fromRoute.split('/') : []
  fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1)
  return addLeadingSlash(fromRouteArray.concat(toRouteArray).join('/'))
}

export function getRouteOptions(path: string, alias: boolean = false) {
  if (alias) {
    return __uniRoutes.find(
      (route) => route.path === path || route.alias === path
    )
  }
  return __uniRoutes.find((route) => route.path === path)
}

export function getRouteMeta(path: string) {
  const routeOptions = getRouteOptions(path)
  if (routeOptions) {
    return routeOptions.meta
  }
}

export function normalizeTabBarRoute(
  index: number,
  oldPagePath: string,
  newPagePath: string
) {
  const oldTabBarRoute = getRouteOptions(addLeadingSlash(oldPagePath))
  if (oldTabBarRoute) {
    const { meta } = oldTabBarRoute
    delete meta.tabBarIndex
    meta.isQuit = meta.isTabBar = false
  }
  const newTabBarRoute = getRouteOptions(addLeadingSlash(newPagePath))
  if (newTabBarRoute) {
    const { meta } = newTabBarRoute
    meta.tabBarIndex = index
    meta.isQuit = meta.isTabBar = true
    const tabBar = __uniConfig.tabBar
    if (tabBar && tabBar.list && tabBar.list[index]) {
      tabBar.list[index].pagePath = removeLeadingSlash(newPagePath)
    }
  }
}
