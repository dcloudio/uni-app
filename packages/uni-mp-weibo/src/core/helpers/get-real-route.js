export default function getRealRoute (fromRoute, toRoute) {
  if (!toRoute) {
    toRoute = fromRoute
    if (toRoute.indexOf('/') === 0) {
      return toRoute
    }
    const pages = getCurrentPages()
    if (pages.length) {
      fromRoute = pages[pages.length - 1].$page.route
    } else {
      fromRoute = ''
    }
  } else {
    if (toRoute.indexOf('/') === 0) {
      return toRoute
    }
  }
  if (toRoute.indexOf('./') === 0) {
    return getRealRoute(fromRoute, toRoute.substr(2))
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
  return '/' + fromRouteArray.concat(toRouteArray).join('/')
}
