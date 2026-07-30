import { Emitter } from '@dcloudio/uni-shared'

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

const eventTransport = /*#__PURE__*/ new Emitter()

export function createAppRouteRuntime() {
  let routeEventId = 0

  // 独立通道避免依赖平台 Bridge，对外仍沿用 define API 的校验和拦截器。
  const onAppRoute = defineOnApi<OnAppRoute>(API_ON_APP_ROUTE, () => {}, {
    eventTransport,
  })
  const offAppRoute = defineOffApi<OffAppRoute>(API_OFF_APP_ROUTE, () => {}, {
    allowClearAll: true,
    eventTransport,
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
      const routeEvent = {
        path: event.path,
        query: Object.assign({}, event.query),
        openType: event.openType,
        notFound: event.notFound,
        timeStamp: event.timeStamp,
        routeEventId: event.routeEventId,
      }
      eventTransport.emit(API_ON_APP_ROUTE, routeEvent)
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
