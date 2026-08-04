import {
  type AppRouteOpenType,
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
  const routeOpenTypes = new Map<string, AppRouteOpenType>()
  const appRouteRuntime = createAppRouteRuntime()

  if (platform.canIUse('createRouteObserver')) {
    const observer = platform.createRouteObserver({ pages: ['app://*'] })
    observer.beforeRoute((payload) => {
      const openType = normalizeOpenType(payload.openType)
      if (openType) {
        routeOpenTypes.set(payload.routeEventId, openType)
      }
    })
    observer.afterShow((payload) => {
      const routeEventId = payload.routeEventId
      const openType = routeOpenTypes.get(routeEventId)
      routeOpenTypes.delete(routeEventId)
      if (!openType) {
        return
      }
      const path = normalizePath(payload.path)
      appRouteRuntime.dispatchAppRoute(
        appRouteRuntime.createAppRouteContext({
          path,
          query: payload.query || {},
          openType,
          notFound: false,
          routeEventId,
        })
      )
    })
    observer.afterRoute((payload) => {
      routeOpenTypes.delete(payload.routeEventId)
    })
    observer.onPageNotFound((payload) => {
      routeOpenTypes.delete(payload.routeEventId)
    })
    observer.observe()
  }

  return {
    onAppRoute: appRouteRuntime.onAppRoute,
    offAppRoute: appRouteRuntime.offAppRoute,
  }
}

const appRouteApi = /*#__PURE__*/ createAlipayAppRouteApi(my)

export const onAppRoute = appRouteApi.onAppRoute
export const offAppRoute = appRouteApi.offAppRoute
