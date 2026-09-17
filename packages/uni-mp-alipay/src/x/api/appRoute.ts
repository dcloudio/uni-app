import { defineAsyncApi } from '@dcloudio/uni-api/src/helpers/api'
import {
  API_REWRITE_ROUTE,
  type AppRouteContext,
  type AppRouteOpenType,
  type RewriteRoute,
  createAppRouteRuntime,
} from '@dcloudio/uni-api/src/service/route/appRoute'

type AlipayRoutePayload = {
  path: string
  query?: Record<string, string>
  routeEventId: string
}

type AlipayRouteEventPayload = AlipayRoutePayload & {
  openType: string
}

type AlipayRouteCallback = (payload: AlipayRoutePayload) => void
type AlipayRouteEventCallback = (payload: AlipayRouteEventPayload) => void

interface AlipayRouteObserver {
  beforeRoute(callback: AlipayRouteEventCallback): AlipayRouteObserver
  afterShow(callback: AlipayRouteCallback): AlipayRouteObserver
  afterRoute(callback: AlipayRouteEventCallback): AlipayRouteObserver
  onPageNotFound(callback: AlipayRouteCallback): AlipayRouteObserver
  observe(): void
}

interface AlipayRoutePlatform {
  canIUse(api: string): boolean
  createRouteObserver(options: { pages: string[] }): AlipayRouteObserver
}

declare const my: AlipayRoutePlatform

function normalizeOpenType(openType: string): AppRouteOpenType | undefined {
  switch (openType) {
    case 'appLaunch':
    case 'navigateTo':
    case 'redirectTo':
    case 'switchTab':
    case 'reLaunch':
    case 'navigateBack':
      return openType
    case 'back':
      return 'navigateBack'
    case 'tabClick':
      return 'switchTab'
  }
}

function normalizePath(path: string): string {
  return path.replace(/^app:\/\//, '')
}

export function createAlipayAppRouteApi(platform: AlipayRoutePlatform) {
  const routeContexts = new Map<string, AppRouteContext>()
  const appRouteRuntime = createAppRouteRuntime()

  if (platform.canIUse('createRouteObserver')) {
    const observer = platform.createRouteObserver({ pages: ['app://*'] })
    observer.beforeRoute((payload) => {
      const openType = normalizeOpenType(payload.openType)
      if (!openType) {
        return
      }
      const context = appRouteRuntime.createAppRouteContext({
        path: normalizePath(payload.path),
        query: payload.query || {},
        openType,
        // 支付宝 beforeRoute 不提供 notFound，缺页会在 onPageNotFound 中另行通知。
        notFound: false,
        routeEventId: payload.routeEventId,
      })
      routeContexts.set(payload.routeEventId, context)
      appRouteRuntime.dispatchBeforeAppRoute(context)
    })
    observer.afterShow((payload) => {
      const routeEventId = payload.routeEventId
      const context = routeContexts.get(routeEventId)
      routeContexts.delete(routeEventId)
      if (!context) {
        return
      }
      context.event.path = normalizePath(payload.path)
      context.event.query = Object.assign({}, payload.query)
      appRouteRuntime.dispatchAppRoute(context)
    })
    observer.afterRoute((payload) => {
      routeContexts.delete(payload.routeEventId)
    })
    observer.onPageNotFound((payload) => {
      routeContexts.delete(payload.routeEventId)
    })
    observer.observe()
  }

  return {
    onAppRoute: appRouteRuntime.onAppRoute,
    offAppRoute: appRouteRuntime.offAppRoute,
    onBeforeAppRoute: appRouteRuntime.onBeforeAppRoute,
    offBeforeAppRoute: appRouteRuntime.offBeforeAppRoute,
    rewriteRoute: defineAsyncApi<RewriteRoute>(
      API_REWRITE_ROUTE,
      (_, { reject }) => reject('not supported', { errCode: 4 })
    ),
  }
}

const appRouteApi = /*#__PURE__*/ createAlipayAppRouteApi(my)

export const onAppRoute = appRouteApi.onAppRoute
export const offAppRoute = appRouteApi.offAppRoute
export const onBeforeAppRoute = appRouteApi.onBeforeAppRoute
export const offBeforeAppRoute = appRouteApi.offBeforeAppRoute
export const rewriteRoute = appRouteApi.rewriteRoute
