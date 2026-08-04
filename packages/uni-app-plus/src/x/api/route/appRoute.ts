import {
  type AppRouteContext,
  type AppRouteEvent,
  type AppRouteOpenType,
  type AppRouteRewriteResult,
  createAppRouteRuntime,
  createNormalizeUrl,
} from '@dcloudio/uni-api'
import { invokeHook } from '@dcloudio/uni-core'
import {
  ON_PAGE_NOT_FOUND,
  decodedQuery,
  parseUrl,
  removeLeadingSlash,
  stringifyQuery,
} from '@dcloudio/uni-shared'

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
    path: removeLeadingSlash(path),
    query: decodedQuery(query),
    notFound: false,
  }
}

const appRouteRuntime = createAppRouteRuntime({ normalizeRewriteRoute })

export const onAppRoute = appRouteRuntime.onAppRoute
export const offAppRoute = appRouteRuntime.offAppRoute
export const onBeforeAppRoute = appRouteRuntime.onBeforeAppRoute
export const offBeforeAppRoute = appRouteRuntime.offBeforeAppRoute
export const rewriteRoute = appRouteRuntime.rewriteRoute

export interface ResolvedAppRoute {
  url: string
  context: AppRouteContext
}

export function createAppRouteContext(
  path: string,
  query: Record<string, any>,
  openType: AppRouteOpenType,
  notFound = false
) {
  return appRouteRuntime.createAppRouteContext({
    path: removeLeadingSlash(path),
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

export function dispatchBeforeAppRoute(context: AppRouteContext) {
  return appRouteRuntime.dispatchBeforeAppRoute(context)
}

export function dispatchAppRoute(context: AppRouteContext): void
export function dispatchAppRoute(
  path: string,
  query: Record<string, any>,
  openType: AppRouteOpenType,
  notFound?: boolean
): void
export function dispatchAppRoute(
  contextOrPath: AppRouteContext | string,
  query: Record<string, any> = {},
  openType: AppRouteOpenType = 'appLaunch',
  notFound = false
) {
  const context =
    typeof contextOrPath === 'string'
      ? createAppRouteContext(contextOrPath, query, openType, notFound)
      : contextOrPath
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

export function dispatchAppRouteNotFound(
  url: string,
  context?: AppRouteContext
) {
  if (!context) {
    const { path, query } = parseUrl(url)
    context = createAppRouteContext(path, query, 'appLaunch', true)
  }
  dispatchAppRoute(context)
}
