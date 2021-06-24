import { OpenType } from '.'

export function initRouteOptions(path: string, openType: OpenType) {
  // 需要序列化一遍
  const routeOptions = JSON.parse(
    JSON.stringify(__uniRoutes.find((route) => route.path === path))
  ) as UniApp.UniRoute
  if (
    openType === 'reLaunch' ||
    (!__uniConfig.realEntryPagePath && getCurrentPages().length === 0) // redirectTo
  ) {
    routeOptions.meta.isQuit = true
  } else if (!routeOptions.meta.isTabBar) {
    routeOptions.meta.isQuit = false
  }
  // TODO
  //   if (routeOptions.meta.isTabBar) {
  //     routeOptions.meta.visible = true
  //   }
  return routeOptions
}
