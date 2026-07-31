import { type Router, START_LOCATION } from 'vue-router'
import {
  API_NAVIGATE_BACK,
  API_NAVIGATE_TO,
  API_REDIRECT_TO,
  API_RE_LAUNCH,
  API_SWITCH_TAB,
  type AppRouteContext,
  type AppRouteOpenType,
  createAppRouteRuntime,
} from '@dcloudio/uni-api'
import { invokeHook } from '@dcloudio/uni-core'
import {
  ON_PAGE_NOT_FOUND,
  decodedQuery,
  removeLeadingSlash,
} from '@dcloudio/uni-shared'

const appRouteRuntime = createAppRouteRuntime()
const pendingAppRouteContexts: AppRouteContext[] = []

interface AppRouteLocation {
  path: string
  fullPath?: string
  query: Record<string, any>
  meta: { route?: unknown }
  matched: { length: number }
  redirectedFrom?: { fullPath?: string }
}

interface PendingHistoryRoute {
  fullPath: string
  openType: typeof API_NAVIGATE_BACK | typeof API_NAVIGATE_TO
}

const historyOpenTypes = new WeakMap<object, PendingHistoryRoute['openType']>()
let pendingHistoryRoute: PendingHistoryRoute | undefined
let appRouteReady = false
let appRouteStarted = false

export const onAppRoute = appRouteRuntime.onAppRoute
export const offAppRoute = appRouteRuntime.offAppRoute

function dispatchAppRoute(context: AppRouteContext) {
  if (!appRouteReady) {
    pendingAppRouteContexts.push(context)
    return
  }
  const event = context.event
  if (event.notFound) {
    invokeHook((getApp() as any).vm, ON_PAGE_NOT_FOUND, {
      path: event.path,
      query: Object.assign({}, event.query),
      isEntryPage: event.openType === 'appLaunch',
    })
  }
  appRouteRuntime.dispatchAppRoute(context)
}

function getRoutePath(route: AppRouteLocation) {
  const pagePath = route.meta.route
  return typeof pagePath === 'string'
    ? pagePath
    : removeLeadingSlash(route.path)
}

export function dispatchWebAppRoute(route: AppRouteLocation) {
  const context = appRouteRuntime.createAppRouteContext({
    path: getRoutePath(route),
    query: decodedQuery(route.query),
    openType: resolveOpenType(route),
    notFound: route.matched.length === 0,
  })
  dispatchAppRoute(context)
}

function isPendingHistoryRoute(to: AppRouteLocation) {
  const fullPath = to.fullPath || to.path
  return (
    pendingHistoryRoute &&
    (pendingHistoryRoute.fullPath === fullPath ||
      pendingHistoryRoute.fullPath === to.redirectedFrom?.fullPath)
  )
}

function takePendingHistoryOpenType(to: AppRouteLocation) {
  if (pendingHistoryRoute && isPendingHistoryRoute(to)) {
    const { openType } = pendingHistoryRoute
    pendingHistoryRoute = undefined
    return openType
  }
}

function bindHistoryOpenType(to: AppRouteLocation) {
  const openType = takePendingHistoryOpenType(to)
  if (openType) {
    historyOpenTypes.set(to, openType)
  }
}

function takeHistoryOpenType(to: AppRouteLocation) {
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

function resolveOpenType(to: AppRouteLocation): AppRouteOpenType {
  if (!appRouteStarted) {
    appRouteStarted = true
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
    if (failure) {
      takeHistoryOpenType(to)
      return
    }
    if (from === START_LOCATION && to.matched.length === 0) {
      dispatchWebAppRoute(to)
    }
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
  pendingAppRouteContexts.splice(0).forEach(dispatchAppRoute)
}
