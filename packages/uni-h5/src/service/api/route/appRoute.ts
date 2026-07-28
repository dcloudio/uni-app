import type { RouteLocationNormalized, Router } from 'vue-router'
import { START_LOCATION } from 'vue-router'
import {
  API_NAVIGATE_BACK,
  API_NAVIGATE_TO,
  API_REDIRECT_TO,
  API_RE_LAUNCH,
  API_SWITCH_TAB,
  type AppRouteContext,
  type AppRouteEventInit,
  type AppRouteOpenType,
  createAppRouteRuntime,
} from '@dcloudio/uni-api'
import { decodedQuery, removeLeadingSlash } from '@dcloudio/uni-shared'

const appRouteRuntime = createAppRouteRuntime()
const pendingAppRouteContexts: AppRouteContext[] = []

interface PendingHistoryRoute {
  fullPath: string
  openType: typeof API_NAVIGATE_BACK | typeof API_NAVIGATE_TO
}

const historyOpenTypes = new WeakMap<object, PendingHistoryRoute['openType']>()
let pendingHistoryRoute: PendingHistoryRoute | undefined
let appRouteReady = false

export const onAppRoute = appRouteRuntime.onAppRoute
export const offAppRoute = appRouteRuntime.offAppRoute

function getRoutePath(route: RouteLocationNormalized) {
  const pagePath = route.meta.route
  return typeof pagePath === 'string'
    ? pagePath
    : removeLeadingSlash(route.path)
}

export function dispatchWebAppRoute(event: AppRouteEventInit) {
  const context = appRouteRuntime.createAppRouteContext(event)
  if (!appRouteReady) {
    pendingAppRouteContexts.push(context)
    return
  }
  appRouteRuntime.dispatchAppRoute(context)
}

function takePendingHistoryOpenType(to: RouteLocationNormalized) {
  if (
    pendingHistoryRoute &&
    (pendingHistoryRoute.fullPath === to.fullPath ||
      pendingHistoryRoute.fullPath === to.redirectedFrom?.fullPath)
  ) {
    const { openType } = pendingHistoryRoute
    pendingHistoryRoute = undefined
    return openType
  }
}

function bindHistoryOpenType(to: RouteLocationNormalized) {
  const openType = takePendingHistoryOpenType(to)
  if (openType) {
    historyOpenTypes.set(to, openType)
  }
}

function takeHistoryOpenType(to: RouteLocationNormalized) {
  const redirectedFrom = to.redirectedFrom
  const openType =
    historyOpenTypes.get(to) ||
    (redirectedFrom && historyOpenTypes.get(redirectedFrom))
  historyOpenTypes.delete(to)
  if (redirectedFrom) {
    historyOpenTypes.delete(redirectedFrom)
  }
  return openType
}

function resolveOpenType(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): AppRouteOpenType {
  if (from === START_LOCATION) {
    return 'appLaunch'
  }
  const historyOpenType = takeHistoryOpenType(to)
  if (historyOpenType) {
    return historyOpenType
  }
  const openType = history.state?.__type__
  if (
    openType === API_NAVIGATE_TO ||
    openType === API_REDIRECT_TO ||
    openType === API_RE_LAUNCH ||
    openType === API_SWITCH_TAB
  ) {
    return openType
  }
  return API_NAVIGATE_TO
}

function dispatchRouterAppRoute(
  to: RouteLocationNormalized,
  openType: AppRouteOpenType
) {
  dispatchWebAppRoute({
    path: getRoutePath(to),
    query: decodedQuery(to.query),
    openType,
    notFound: to.matched.length === 0,
  })
}

export function setWebAppRouteHistoryDirection(
  fullPath: string,
  direction: 'back' | 'forward' | ''
) {
  pendingHistoryRoute = {
    fullPath,
    openType: direction === 'back' ? API_NAVIGATE_BACK : API_NAVIGATE_TO,
  }
}

export function initWebAppRouteListener(router: Router) {
  if (__NODE_JS__) {
    return
  }
  router.beforeEach((to) => {
    bindHistoryOpenType(to)
  })
  router.afterEach((to, from, failure) => {
    const openType = resolveOpenType(to, from)
    if (failure) {
      return
    }
    dispatchRouterAppRoute(to, openType)
  })
  router.onError((_error, to) => {
    takeHistoryOpenType(to)
  })
}

export function setWebAppRouteReady() {
  if (__NODE_JS__ || appRouteReady) {
    return
  }
  appRouteReady = true
  pendingAppRouteContexts.splice(0).forEach(appRouteRuntime.dispatchAppRoute)
}
