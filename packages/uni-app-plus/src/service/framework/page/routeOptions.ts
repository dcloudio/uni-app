import { getRouteOptions, initRouteMeta } from '@dcloudio/uni-core'

export function initRouteOptions(path: string, openType: UniApp.OpenType) {
  // 需要序列化一遍
  const routeOptions = JSON.parse(
    JSON.stringify(getRouteOptions(path)!)
  ) as UniApp.UniRoute

  routeOptions.meta = initRouteMeta(routeOptions.meta)

  if (
    openType !== 'preloadPage' &&
    !__uniConfig.realEntryPagePath &&
    (openType === 'reLaunch' || getCurrentPages().length === 0) // redirectTo
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
