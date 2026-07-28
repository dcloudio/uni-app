import { defineOffApi, defineOnApi } from '../../helpers/api'
import type {
  API_NAVIGATE_BACK,
  API_NAVIGATE_TO,
  API_REDIRECT_TO,
  API_RE_LAUNCH,
  API_SWITCH_TAB,
} from '../../protocols/route/route'

export const API_ON_APP_ROUTE = 'onAppRoute'
export const API_OFF_APP_ROUTE = 'offAppRoute'

export type AppRouteOpenType =
  | 'appLaunch'
  | typeof API_NAVIGATE_TO
  | typeof API_NAVIGATE_BACK
  | typeof API_REDIRECT_TO
  | typeof API_RE_LAUNCH
  | typeof API_SWITCH_TAB

export interface AppRouteEvent {
  path: string
  query: Record<string, string>
  openType: AppRouteOpenType
  timeStamp: number
  routeEventId: string
  notFound: boolean
}

export type AppRouteEventInit = Omit<
  AppRouteEvent,
  'timeStamp' | 'routeEventId'
> &
  Partial<Pick<AppRouteEvent, 'timeStamp' | 'routeEventId'>>

export interface AppRouteContext {
  event: AppRouteEvent
}

export type AppRouteCallback = (event: AppRouteEvent) => void
export type OnAppRoute = (callback: AppRouteCallback) => void
export type OffAppRoute = (callback?: AppRouteCallback | null) => void

export function createAppRouteRuntime() {
  let routeEventId = 0

  // 监听器注册沿用 defineOnApi，异常统一在 dispatchAppRoute 派发边界隔离。
  const onAppRoute = defineOnApi<OnAppRoute>(API_ON_APP_ROUTE, () => {})
  const offAppRoute = defineOffApi<OffAppRoute>(API_OFF_APP_ROUTE, () => {}, {
    allowClearAll: true,
  })

  function createAppRouteContext(event: AppRouteEventInit): AppRouteContext {
    const timeStamp = event.timeStamp ?? Date.now()
    return {
      event: {
        path: event.path,
        query: Object.assign({}, event.query),
        openType: event.openType,
        notFound: event.notFound,
        timeStamp,
        routeEventId: event.routeEventId ?? `${timeStamp}-${++routeEventId}`,
      },
    }
  }

  function dispatchAppRoute(context: AppRouteContext) {
    const event = context.event
    try {
      UniServiceJSBridge.invokeOnCallback<OnAppRoute>(API_ON_APP_ROUTE, {
        path: event.path,
        query: Object.assign({}, event.query),
        openType: event.openType,
        notFound: event.notFound,
        timeStamp: event.timeStamp,
        routeEventId: event.routeEventId,
      })
    } catch (error) {
      // 路由事件监听器异常不能影响底层路由流程。
      console.error(error)
    }
  }

  return {
    onAppRoute,
    offAppRoute,
    createAppRouteContext,
    dispatchAppRoute,
  }
}
