import type { RouteLocationRaw, Router } from 'vue-router'
import {
  API_NAVIGATE_BACK,
  API_NAVIGATE_TO,
  type AppRouteContext,
  type AppRouteEvent,
  type AppRouteOpenType,
  type AppRouteRewriteResult,
  createAppRouteRuntime,
  createNormalizeUrl,
} from '@dcloudio/uni-api'
import { getRouteOptions, invokeHook } from '@dcloudio/uni-core'
import {
  ON_PAGE_NOT_FOUND,
  decodedQuery,
  parseUrl,
  removeLeadingSlash,
  stringifyQuery,
} from '@dcloudio/uni-shared'

interface AppRouteLocation {
  path: string
  fullPath: string
  query: Record<string, any>
  meta: { route?: unknown }
  matched: { length: number }
  redirectedFrom?: AppRouteLocation
}

export interface ResolvedAppRoute {
  url: string
  context: AppRouteContext
}

export interface WebAppRouteTransaction {
  finalFullPath: string
  openType: AppRouteOpenType
  context?: AppRouteContext
  pageId?: number
  delta?: number
  cleaned?: boolean
  cancelled?: boolean
}

interface PendingHistoryRoute {
  fullPath: string
  openType: typeof API_NAVIGATE_BACK | typeof API_NAVIGATE_TO
  delta: number
}

interface WebAppRouteRouterOptions {
  onRouteConfirmed: (transaction: WebAppRouteTransaction) => void
  onMissingRoute: (transaction: WebAppRouteTransaction) => void
}

type WebAppRouteLaunchExecutor = (
  route: AppRouteLocation
) => ResolvedAppRoute | Promise<ResolvedAppRoute>

function normalizeAppRoutePath(path: string) {
  const route = getRouteOptions(path, true)
  const pagePath = route?.meta.route
  return typeof pagePath === 'string'
    ? pagePath
    : removeLeadingSlash(route?.path || path)
}

function normalizeRewriteRoute(
  { url, preserveQuery }: { url: string; preserveQuery?: boolean },
  event: AppRouteEvent
): AppRouteRewriteResult | string {
  if (preserveQuery) {
    url = parseUrl(url).path + stringifyQuery(event.query)
  }
  const params = { url, openType: event.openType }
  const errMsg = createNormalizeUrl(event.openType, {
    skipNavigatorLock: true,
  })(url, params)
  if (errMsg) {
    return errMsg
  }
  const { path, query } = parseUrl(params.url)
  return {
    url: params.url,
    path: normalizeAppRoutePath(path),
    query: decodedQuery(query),
    notFound: false,
  }
}

const appRouteRuntime = createAppRouteRuntime({ normalizeRewriteRoute })
const pendingProgrammaticRoutes: WebAppRouteTransaction[] = []
const routeTransactions = new WeakMap<object, WebAppRouteTransaction>()
let pendingHistoryRoute: PendingHistoryRoute | undefined
let appRouteStarted = false
let launchExecutor: WebAppRouteLaunchExecutor | undefined
let resolveLaunchExecutor: (() => void) | undefined
const launchExecutorReady = new Promise<void>((resolve) => {
  resolveLaunchExecutor = resolve
})
let singlePageAppRouteContext: AppRouteContext | undefined

export const onAppRoute = appRouteRuntime.onAppRoute
export const offAppRoute = appRouteRuntime.offAppRoute
export const onBeforeAppRoute = appRouteRuntime.onBeforeAppRoute
export const offBeforeAppRoute = appRouteRuntime.offBeforeAppRoute
export const rewriteRoute = appRouteRuntime.rewriteRoute

export function createAppRouteContext(
  path: string,
  query: Record<string, any>,
  openType: AppRouteOpenType,
  notFound = false
) {
  return appRouteRuntime.createAppRouteContext({
    path: normalizeAppRoutePath(path),
    query: decodedQuery(query),
    openType,
    notFound,
  })
}

export function resolveAppRoute(
  url: string,
  openType: AppRouteOpenType,
  notFound = false
): ResolvedAppRoute {
  let routeUrl = url
  let routeNotFound = notFound
  let rewriteCount = 0
  while (true) {
    const { path, query } = parseUrl(routeUrl)
    const context = createAppRouteContext(path, query, openType, routeNotFound)
    context.rewriteCount = rewriteCount
    const rewrite = appRouteRuntime.dispatchBeforeAppRoute(context)
    if (!rewrite) {
      return { url: routeUrl, context }
    }
    routeUrl = rewrite.url
    routeNotFound = rewrite.notFound
    rewriteCount++
  }
}

function dispatchAppRoute(context: AppRouteContext) {
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

export function createWebAppRouteTransaction(
  finalFullPath: string,
  openType: AppRouteOpenType,
  context?: AppRouteContext
): WebAppRouteTransaction {
  return {
    finalFullPath,
    openType,
    context,
  }
}

export function queueWebAppRouteTransaction(
  transaction: WebAppRouteTransaction
) {
  pendingProgrammaticRoutes.push(transaction)
}

export function discardWebAppRouteTransaction(
  transaction: WebAppRouteTransaction
) {
  transaction.cancelled = true
  const index = pendingProgrammaticRoutes.indexOf(transaction)
  if (index !== -1) {
    pendingProgrammaticRoutes.splice(index, 1)
  }
}

function takePendingProgrammaticRoute(to: AppRouteLocation) {
  const redirectedFrom = getOriginalRoute(to.redirectedFrom)
  const index = pendingProgrammaticRoutes.findIndex(
    (transaction) =>
      !transaction.cancelled &&
      (transaction.finalFullPath === to.fullPath ||
        transaction.finalFullPath === redirectedFrom?.fullPath)
  )
  if (index !== -1) {
    return pendingProgrammaticRoutes.splice(index, 1)[0]
  }
}

function takePendingHistoryRoute(to: AppRouteLocation) {
  const redirectedFrom = getOriginalRoute(to.redirectedFrom)
  if (
    pendingHistoryRoute &&
    (pendingHistoryRoute.fullPath === to.fullPath ||
      pendingHistoryRoute.fullPath === redirectedFrom?.fullPath)
  ) {
    const route = pendingHistoryRoute
    pendingHistoryRoute = undefined
    return route
  }
}

function getOriginalRoute(route: AppRouteLocation | undefined) {
  while (route?.redirectedFrom) {
    route = route.redirectedFrom
  }
  return route
}

function getRouteUrl(route: AppRouteLocation) {
  return route.fullPath || route.path
}

function resolveFullPath(router: Router, url: string) {
  const { path, query } = parseUrl(url)
  return router.resolve({ path, query }).fullPath
}

function toRouteLocation(url: string): RouteLocationRaw {
  const { path, query } = parseUrl(url)
  return { path, query }
}

function bindRouteTransaction(
  route: AppRouteLocation,
  transaction: WebAppRouteTransaction
) {
  routeTransactions.set(route, transaction)
  const originalRoute = getOriginalRoute(route.redirectedFrom)
  if (originalRoute) {
    routeTransactions.set(originalRoute, transaction)
  }
}

function findRouteTransaction(route: AppRouteLocation) {
  const transaction =
    routeTransactions.get(route) ||
    (getOriginalRoute(route.redirectedFrom)
      ? routeTransactions.get(getOriginalRoute(route.redirectedFrom)!)
      : undefined)
  return transaction?.cancelled ? undefined : transaction
}

function replaceTransactionRoute(
  router: Router,
  transaction: WebAppRouteTransaction,
  route: AppRouteLocation
) {
  const routeUrl = getRouteUrl(route)
  const resolved = resolveAppRoute(
    routeUrl,
    transaction.openType,
    route.matched.length === 0
  )
  transaction.finalFullPath = resolveFullPath(router, resolved.url)
  transaction.context = resolved.context
  return resolved
}

function bindOrRedirectTransaction(
  router: Router,
  to: AppRouteLocation,
  transaction: WebAppRouteTransaction
) {
  if (transaction.finalFullPath !== to.fullPath) {
    const resolved = replaceTransactionRoute(router, transaction, to)
    if (transaction.finalFullPath !== to.fullPath) {
      pendingProgrammaticRoutes.unshift(transaction)
      return toRouteLocation(resolved.url)
    }
  }
  bindRouteTransaction(to, transaction)
}

async function createLaunchTransaction(router: Router, to: AppRouteLocation) {
  await launchExecutorReady
  const originalRoute = getOriginalRoute(to) || to
  const resolved = await launchExecutor!(originalRoute)
  const sourceFullPath = originalRoute.fullPath
  const transaction = createWebAppRouteTransaction(
    resolveFullPath(router, resolved.url),
    'appLaunch',
    resolved.context
  )
  if (transaction.finalFullPath !== sourceFullPath) {
    pendingProgrammaticRoutes.unshift(transaction)
    return {
      transaction,
      redirect: toRouteLocation(resolved.url),
    }
  }
  return { transaction }
}

export function registerWebAppRouteLaunchExecutor(
  executor: WebAppRouteLaunchExecutor
) {
  launchExecutor = executor
  resolveLaunchExecutor?.()
  resolveLaunchExecutor = undefined
}

export function setSinglePageAppRoute(
  resolved: ResolvedAppRoute,
  originalUrl: string
) {
  singlePageAppRouteContext = resolved.context
  if (resolved.url === originalUrl) {
    return
  }
  const queryIndex = resolved.url.indexOf('?')
  const search = queryIndex === -1 ? '' : resolved.url.slice(queryIndex)
  const url = location.pathname + search + location.hash
  history.replaceState(history.state, '', url)
}

export function dispatchWebAppRoute(route?: AppRouteLocation) {
  let context: AppRouteContext | undefined
  if (route) {
    const transaction = findRouteTransaction(route)
    if (transaction && !transaction.cancelled) {
      context = transaction.context
      routeTransactions.delete(route)
      const originalRoute = getOriginalRoute(route.redirectedFrom)
      if (originalRoute) {
        routeTransactions.delete(originalRoute)
      }
    }
  } else {
    context = singlePageAppRouteContext
    singlePageAppRouteContext = undefined
  }
  if (context) {
    dispatchAppRoute(context)
  }
}

export function setWebAppRouteHistoryDirection(
  fullPath: string,
  direction: 'back' | 'forward' | '',
  delta = 0
) {
  pendingHistoryRoute = {
    fullPath,
    openType: direction === 'back' ? API_NAVIGATE_BACK : API_NAVIGATE_TO,
    delta: Math.abs(delta),
  }
}

export function initWebAppRouteListener(
  router: Router,
  { onRouteConfirmed, onMissingRoute }: WebAppRouteRouterOptions
) {
  if (__NODE_JS__) {
    return
  }
  router.beforeEach(async (to) => {
    const route = to as unknown as AppRouteLocation
    if (!appRouteStarted) {
      appRouteStarted = true
      const launch = await createLaunchTransaction(router, route)
      if (launch.redirect) {
        return launch.redirect
      }
      return bindOrRedirectTransaction(router, route, launch.transaction)
    }

    let transaction = takePendingProgrammaticRoute(route)
    if (!transaction) {
      const historyRoute = takePendingHistoryRoute(route)
      if (historyRoute) {
        const originalRoute = getOriginalRoute(route.redirectedFrom) || route
        const resolved = resolveAppRoute(
          historyRoute.fullPath,
          historyRoute.openType,
          originalRoute.matched.length === 0
        )
        transaction = createWebAppRouteTransaction(
          resolveFullPath(router, resolved.url),
          historyRoute.openType,
          resolved.context
        )
        transaction.delta = historyRoute.delta
        if (transaction.finalFullPath !== historyRoute.fullPath) {
          pendingProgrammaticRoutes.unshift(transaction)
          return toRouteLocation(resolved.url)
        }
      }
    }
    if (!transaction) {
      transaction = findRouteTransaction(route)
    }
    if (!transaction) {
      const originalRoute = getOriginalRoute(route.redirectedFrom) || route
      const resolved = resolveAppRoute(
        getRouteUrl(originalRoute),
        API_NAVIGATE_TO,
        originalRoute.matched.length === 0
      )
      transaction = createWebAppRouteTransaction(
        resolveFullPath(router, resolved.url),
        API_NAVIGATE_TO,
        resolved.context
      )
      if (transaction.finalFullPath !== originalRoute.fullPath) {
        pendingProgrammaticRoutes.unshift(transaction)
        return toRouteLocation(resolved.url)
      }
    }
    return bindOrRedirectTransaction(router, route, transaction)
  })

  router.afterEach((to, _from, failure) => {
    const route = to as unknown as AppRouteLocation
    const transaction = findRouteTransaction(route)
    if (!transaction) {
      return
    }
    if (failure) {
      discardWebAppRouteTransaction(transaction)
      routeTransactions.delete(route)
      return
    }
    if (!transaction.cleaned) {
      transaction.cleaned = true
      onRouteConfirmed(transaction)
    }
    if (!transaction.context) {
      routeTransactions.delete(route)
      return
    }
    if (transaction.context?.event.notFound) {
      dispatchWebAppRoute(route)
      onMissingRoute(transaction)
    }
  })

  router.onError((_error, to) => {
    if (!to) {
      return
    }
    const route = to as unknown as AppRouteLocation
    const transaction = findRouteTransaction(route)
    if (transaction) {
      discardWebAppRouteTransaction(transaction)
      routeTransactions.delete(route)
    }
  })
}
