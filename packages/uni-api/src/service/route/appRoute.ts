import { Emitter } from '@dcloudio/uni-shared'

import { defineAsyncApi, defineOffApi, defineOnApi } from '../../helpers/api'
import type {
  API_NAVIGATE_BACK,
  API_NAVIGATE_TO,
  API_REDIRECT_TO,
  API_RE_LAUNCH,
  API_SWITCH_TAB,
} from '../../protocols/route/route'

export const API_ON_APP_ROUTE = 'onAppRoute'
export const API_OFF_APP_ROUTE = 'offAppRoute'
export const API_ON_BEFORE_APP_ROUTE = 'onBeforeAppRoute'
export const API_OFF_BEFORE_APP_ROUTE = 'offBeforeAppRoute'
export const API_REWRITE_ROUTE = 'rewriteRoute'

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
  rewrite?: AppRouteRewriteResult
  normalizeRewriteRoute?: NormalizeRewriteRoute
  rewriteCount?: number
}

export type AppRouteCallback = (event: AppRouteEvent) => void
export type OnAppRoute = (callback: AppRouteCallback) => void
export type OffAppRoute = (callback?: AppRouteCallback | null) => void

export type BeforeAppRouteEvent = Omit<AppRouteEvent, 'timeStamp'>
export type BeforeAppRouteCallback = (event: BeforeAppRouteEvent) => void
export type OnBeforeAppRoute = (callback: BeforeAppRouteCallback) => void
export type OffBeforeAppRoute = (
  callback?: BeforeAppRouteCallback | null
) => void

export interface RewriteRouteSuccess {
  errMsg: string
}

export interface RewriteRouteFail {
  errMsg: string
  errCode: number
}

export interface RewriteRouteOptions {
  url: string
  preserveQuery?: boolean
  success?: (result: RewriteRouteSuccess) => void
  fail?: (result: RewriteRouteFail) => void
  complete?: (result: RewriteRouteSuccess | RewriteRouteFail) => void
}

export type RewriteRoute = (options: RewriteRouteOptions) => void

export interface AppRouteRewriteResult {
  url: string
  path: string
  query: Record<string, string>
  notFound: boolean
}

export type NormalizeRewriteRoute = (
  options: Pick<RewriteRouteOptions, 'url' | 'preserveQuery'>,
  event: AppRouteEvent
) => AppRouteRewriteResult | string

export interface CreateAppRouteRuntimeOptions {
  normalizeRewriteRoute?: NormalizeRewriteRoute
}

const eventTransport = /*#__PURE__*/ new Emitter()
let activeBeforeAppRouteContext: AppRouteContext | undefined
const MAX_APP_ROUTE_REWRITE_COUNT = 100
const APP_ROUTE_ERROR_CODE = 4

export function createAppRouteRuntime(
  options: CreateAppRouteRuntimeOptions = {}
) {
  let routeEventId = 0

  // 独立通道避免依赖平台 Bridge，对外仍沿用 define API 的校验和拦截器。
  const onAppRoute = defineOnApi<OnAppRoute>(API_ON_APP_ROUTE, () => {}, {
    eventTransport,
  })
  const offAppRoute = defineOffApi<OffAppRoute>(API_OFF_APP_ROUTE, () => {}, {
    allowClearAll: true,
    eventTransport,
  })
  const onBeforeAppRoute = defineOnApi<OnBeforeAppRoute>(
    API_ON_BEFORE_APP_ROUTE,
    () => {},
    { eventTransport }
  )
  const offBeforeAppRoute = defineOffApi<OffBeforeAppRoute>(
    API_OFF_BEFORE_APP_ROUTE,
    () => {},
    {
      allowClearAll: true,
      eventTransport,
    }
  )
  const rewriteRoute = defineAsyncApi<RewriteRoute>(
    API_REWRITE_ROUTE,
    ({ url, preserveQuery }, { resolve, reject }) => {
      const rejectRewriteRoute = (errMsg: string) =>
        reject(errMsg, { errCode: APP_ROUTE_ERROR_CODE })
      const context = activeBeforeAppRouteContext
      if (!context) {
        rejectRewriteRoute(
          'rewriteRoute is only allowed in a onBeforeAppRoute callback'
        )
        return
      }
      if (context.event.openType === 'navigateBack') {
        rejectRewriteRoute(
          'a "navigateBack" event is not allowed to be rewritten'
        )
        return
      }
      if (context.rewrite) {
        rejectRewriteRoute(
          `rewriteRoute can only be called once in a route event, this page has been rewritten to "${context.rewrite.path}"`
        )
        return
      }
      if ((context.rewriteCount || 0) >= MAX_APP_ROUTE_REWRITE_COUNT) {
        rejectRewriteRoute(
          `rewriteRoute exceeded the maximum rewrite count of ${MAX_APP_ROUTE_REWRITE_COUNT}`
        )
        return
      }
      if (!context.normalizeRewriteRoute) {
        rejectRewriteRoute('not supported')
        return
      }
      const rewrite = context.normalizeRewriteRoute(
        { url, preserveQuery },
        context.event
      )
      if (typeof rewrite === 'string') {
        rejectRewriteRoute(rewrite)
        return
      }
      context.rewrite = rewrite
      resolve()
    },
    {
      url: {
        type: String,
        required: true,
      },
      preserveQuery: Boolean,
    }
  )

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
      normalizeRewriteRoute: options.normalizeRewriteRoute,
    }
  }

  function dispatchBeforeAppRoute(context: AppRouteContext) {
    const event = context.event
    const beforeEvent: BeforeAppRouteEvent = {
      path: event.path,
      query: Object.assign({}, event.query),
      openType: event.openType,
      notFound: event.notFound,
      routeEventId: event.routeEventId,
    }
    const previousContext = activeBeforeAppRouteContext
    activeBeforeAppRouteContext = context
    try {
      eventTransport.emit(API_ON_BEFORE_APP_ROUTE, beforeEvent)
    } catch (error) {
      // 路由事件监听器异常不能影响底层路由流程。
      console.error(error)
    } finally {
      activeBeforeAppRouteContext = previousContext
    }
    return context.rewrite
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
    onBeforeAppRoute,
    offBeforeAppRoute,
    rewriteRoute,
    createAppRouteContext,
    dispatchBeforeAppRoute,
    dispatchAppRoute,
  }
}
