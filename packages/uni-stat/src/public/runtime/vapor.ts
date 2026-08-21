import { onAppHide, onAppShow, onError } from '@dcloudio/uni-app'

import { getPlatform } from '../adapter/platform'
import { logger } from '../infra/logger'
import { getGlobalObject, resolveUniRuntime } from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'
import {
  handleAppHide,
  handleAppShow,
  handleError,
  handleLaunch,
  handlePageHide,
  handlePageShow,
} from './lifecycleHooks'
import { getStatApp } from './StatApp'

import type { LifecycleOptions } from './lifecycleHooks'
import type { StatApp } from './StatApp'

interface LaunchOptions {
  path?: string
  query?: Record<string, unknown>
  scene?: string | number
}

interface AppRouteEvent {
  path: string
  query?: Record<string, unknown>
  openType: string
  timeStamp?: number
  routeEventId?: string
  notFound?: boolean
}

interface RouteSnapshot {
  path: string
  fullPath: string
  key: string
  timeMs: number
}

type PendingEvent =
  | { type: 'show'; value: LaunchOptions; timeMs: number }
  | { type: 'hide'; timeMs: number }
  | { type: 'error'; value: unknown; timeMs: number }
  | { type: 'route'; value: AppRouteEvent; timeMs: number }

interface VaporSink {
  launch: (value: LaunchOptions, timeMs: number) => void
  show: (value: LaunchOptions, timeMs: number) => void
  hide: (timeMs: number) => void
  error: (value: unknown, timeMs: number) => void
  beforeRoute: (value: AppRouteEvent) => void
  route: (value: AppRouteEvent) => void
}

interface SharedVaporState {
  sink?: VaporSink
  beforeRouteBound: boolean
  beforeRouteCallback?: (event: AppRouteEvent) => void
  routeBound: boolean
  routeCallback?: (event: AppRouteEvent) => void
  beforeRouteWarningShown: boolean
  routeWarningShown: boolean
  lifecycleWarningShown: boolean
  lifecycleStarted: boolean
}

interface VaporUniApi {
  onBeforeAppRoute?: (callback: (event: AppRouteEvent) => void) => void
  offBeforeAppRoute?: (callback: (event: AppRouteEvent) => void) => void
  onAppRoute?: (callback: (event: AppRouteEvent) => void) => void
  offAppRoute?: (callback: (event: AppRouteEvent) => void) => void
  getLaunchOptionsSync?: () => LaunchOptions
}

const SHARED_KEY = '__UNI_STAT_VAPOR_BRIDGE__'
const MAX_ROUTE_EVENT_IDS = 100
const MAX_PRE_LAUNCH_EVENTS = 100
const ROUTE_OPEN_TYPES = new Set([
  'appLaunch',
  'navigateTo',
  'navigateBack',
  'redirectTo',
  'reLaunch',
  'switchTab',
])

let fallbackSharedState: SharedVaporState | undefined

function createSharedState(): SharedVaporState {
  return {
    beforeRouteBound: false,
    routeBound: false,
    beforeRouteWarningShown: false,
    routeWarningShown: false,
    lifecycleWarningShown: false,
    lifecycleStarted: false,
  }
}

function getSharedState(): SharedVaporState {
  const globalObject = getGlobalObject()
  const current = globalObject[SHARED_KEY] as SharedVaporState | undefined
  if (current) return current
  if (fallbackSharedState) return fallbackSharedState
  const created = createSharedState()
  fallbackSharedState = created
  try {
    Object.defineProperty(globalObject, SHARED_KEY, {
      configurable: true,
      value: created,
    })
    return created
  } catch (_error) {
    return created
  }
}

function eventTimeSec(timeMs: number): number {
  return Math.floor(timeMs / 1000)
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path
}

function queryEntries(query: Record<string, unknown>): [string, string][] {
  return Object.keys(query).map((key) => [key, String(query[key] ?? '')])
}

function encodeRouteQuery(value: string, isH5: boolean): string {
  const encoded = encodeURIComponent(value)
  return isH5 ? encodeURIComponent(encoded) : encoded
}

function toRouteSnapshot(event: AppRouteEvent): RouteSnapshot | undefined {
  if (
    event.notFound === true ||
    !ROUTE_OPEN_TYPES.has(event.openType) ||
    typeof event.path !== 'string' ||
    event.path.length === 0
  ) {
    return
  }
  const path = normalizePath(event.path)
  const platform = getPlatform()
  const isH5 = platform === 'h5'
  // 公有版 Web / 微信小程序的页面路径均以 `/` 开头；App 保持无前导斜杠。
  const pathPrefix = isH5 || platform === 'wx' ? '/' : ''
  const entries = queryEntries(event.query ?? {})
  const query = entries
    .map(
      ([key, value]) =>
        `${encodeRouteQuery(key, isH5)}=${encodeRouteQuery(value, isH5)}`
    )
    .join('&')
  const sortedEntries = entries
    .slice()
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  const key = `${path}?${JSON.stringify(sortedEntries)}`
  return {
    path,
    fullPath: `${pathPrefix}${path}${query ? `?${query}` : ''}`,
    key,
    timeMs:
      typeof event.timeStamp === 'number' && Number.isFinite(event.timeStamp)
        ? event.timeStamp
        : Date.now(),
  }
}

function pageVm(route: RouteSnapshot) {
  return {
    mpType: 'page',
    route: route.path,
    $page: { route: route.path, fullPath: route.fullPath },
  }
}

function lifecycleOptions(app: StatApp): LifecycleOptions {
  const config = app.getConfig()
  return {
    enablePush: config?.enablePush ?? false,
    enablePageLog: config?.enablePageLog ?? true,
  }
}

export function createVaporSink(app: StatApp): VaporSink {
  const opts = lifecycleOptions(app)
  const pending: PendingEvent[] = []
  const seenRouteIds = new Set<string>()
  const routeIdOrder: string[] = []
  let launched = false
  let foreground = false
  let backgrounded = false
  let activeRoute: RouteSnapshot | undefined
  let routePrepared = false
  let pendingRoute: RouteSnapshot | undefined
  let resumeRouteKey: string | undefined

  const rememberRouteId = (id?: string): boolean => {
    if (!id) return true
    if (seenRouteIds.has(id)) return false
    seenRouteIds.add(id)
    routeIdOrder.push(id)
    if (routeIdOrder.length > MAX_ROUTE_EVENT_IDS) {
      seenRouteIds.delete(routeIdOrder.shift()!)
    }
    return true
  }

  const startPage = (route: RouteSnapshot, timeMs: number): void => {
    if (activeRoute && !routePrepared) handlePageHide(app, pageVm(activeRoute))
    handlePageShow(app, pageVm(route), opts, eventTimeSec(timeMs))
    activeRoute = route
    routePrepared = false
  }

  const prepareRoute = (event: AppRouteEvent): void => {
    if (
      routePrepared ||
      !foreground ||
      !activeRoute ||
      !toRouteSnapshot(event)
    ) {
      return
    }
    handlePageHide(app, pageVm(activeRoute))
    routePrepared = true
  }

  const processRoute = (event: AppRouteEvent, fallbackTimeMs: number): void => {
    if (!rememberRouteId(event.routeEventId)) return
    const route = toRouteSnapshot(event)
    if (!route) return
    if (!foreground) {
      pendingRoute = route
      return
    }
    if (resumeRouteKey) {
      const isSameResume = !routePrepared && resumeRouteKey === route.key
      resumeRouteKey = undefined
      if (isSameResume) {
        activeRoute = route
        routePrepared = false
        return
      }
    }
    startPage(route, route.timeMs || fallbackTimeMs)
  }

  const processShow = (value: LaunchOptions, timeMs: number): void => {
    if (foreground) return
    const resumed = backgrounded
    const route = pendingRoute ?? activeRoute
    handleAppShow(
      app,
      { scene: value.scene, path: route?.path ?? value.path },
      opts,
      eventTimeSec(timeMs),
      true
    )
    foreground = true
    backgrounded = false
    if (route && (resumed || pendingRoute)) {
      startPage(route, timeMs)
    }
    if (resumed && route) {
      resumeRouteKey = route.key
    }
    pendingRoute = undefined
  }

  const processHide = (timeMs: number): void => {
    if (!foreground) return
    if (activeRoute && !routePrepared) handlePageHide(app, pageVm(activeRoute))
    handleAppHide(app, opts, eventTimeSec(timeMs))
    foreground = false
    backgrounded = true
    resumeRouteKey = undefined
    // 后台前旧页已经收尾；恢复同页或采用后台最终路由时只需重新 show。
    routePrepared = !!activeRoute
  }

  const process = (event: PendingEvent): void => {
    if (event.type === 'show') processShow(event.value, event.timeMs)
    else if (event.type === 'hide') processHide(event.timeMs)
    else if (event.type === 'error') {
      // uni-app x 会先把原始异常送入原生异常通路；SDK 再异步重抛会被
      // onError 包装成新对象反复回调，造成 lt=31 上报死循环。
      handleError(app, event.value, eventTimeSec(event.timeMs), false)
    } else processRoute(event.value, event.timeMs)
  }

  const enqueueOrProcess = (event: PendingEvent): void => {
    if (!launched) {
      if (pending.length < MAX_PRE_LAUNCH_EVENTS) pending.push(event)
      return
    }
    process(event)
  }

  return {
    launch(value, timeMs): void {
      if (launched) return
      handleLaunch(app, value, opts, eventTimeSec(timeMs))
      app.releaseDeferredReports()
      launched = true
      pending.splice(0).forEach(process)
    },
    show(value, timeMs): void {
      enqueueOrProcess({ type: 'show', value, timeMs })
    },
    hide(timeMs): void {
      enqueueOrProcess({ type: 'hide', timeMs })
    },
    error(value, timeMs): void {
      enqueueOrProcess({ type: 'error', value, timeMs })
    },
    beforeRoute(value): void {
      if (launched) prepareRoute(value)
    },
    route(value): void {
      enqueueOrProcess({
        type: 'route',
        value,
        timeMs:
          typeof value.timeStamp === 'number' ? value.timeStamp : Date.now(),
      })
    },
  }
}

function bindRoute(shared: SharedVaporState): void {
  const runtime = resolveUniRuntime() as VaporUniApi | undefined
  if (!shared.beforeRouteBound) {
    if (typeof runtime?.onBeforeAppRoute !== 'function') {
      if (!shared.beforeRouteWarningShown) {
        shared.beforeRouteWarningShown = true
        logger.warn('[vapor] uni.onBeforeAppRoute 不可用，应用启动统计未启用')
      }
    } else {
      shared.beforeRouteCallback = (event): void => {
        const current = getSharedState()
        current.sink?.beforeRoute(event)
        if (current.lifecycleStarted) return
        current.lifecycleStarted = true
        try {
          const options = runtime.getLaunchOptionsSync?.() ?? {}
          current.sink?.launch(options, Date.now())
          current.sink?.show(options, Date.now())
          onAppShow((value) =>
            getSharedState().sink?.show(value ?? {}, Date.now())
          )
          onAppHide(() => getSharedState().sink?.hide(Date.now()))
          onError((value) => getSharedState().sink?.error(value, Date.now()))
        } catch (error) {
          if (!current.lifecycleWarningShown) {
            current.lifecycleWarningShown = true
            logger.warn(
              '[vapor] 应用生命周期初始化失败，部分统计可能缺失',
              error
            )
          }
        }
      }
      try {
        runtime.onBeforeAppRoute(shared.beforeRouteCallback)
        shared.beforeRouteBound = true
      } catch (error) {
        shared.beforeRouteCallback = undefined
        if (!shared.beforeRouteWarningShown) {
          shared.beforeRouteWarningShown = true
          logger.warn(
            '[vapor] uni.onBeforeAppRoute 注册失败，应用启动统计未启用',
            error
          )
        }
      }
    }
  }
  if (shared.routeBound) return
  if (!runtime || typeof runtime.onAppRoute !== 'function') {
    if (!shared.routeWarningShown) {
      shared.routeWarningShown = true
      logger.warn('[vapor] uni.onAppRoute 不可用，页面统计已停用')
    }
    return
  }
  shared.routeCallback = (event): void => getSharedState().sink?.route(event)
  try {
    runtime.onAppRoute(shared.routeCallback)
    shared.routeBound = true
  } catch (error) {
    shared.routeCallback = undefined
    if (!shared.routeWarningShown) {
      shared.routeWarningShown = true
      logger.warn('[vapor] uni.onAppRoute 注册失败，页面统计已停用', error)
    }
  }
}

export const vaporStat = {
  install(): void {
    const shared = getSharedState()
    shared.sink = shared.sink ?? createVaporSink(getStatApp())
    bindRoute(shared)
  },
}

/** 单测用：解绑 route 并清空进程级桥接。 */
export function __resetVaporStat(): void {
  const shared = getSharedState()
  const runtime = resolveUniRuntime() as VaporUniApi | undefined
  if (
    shared.beforeRouteCallback &&
    typeof runtime?.offBeforeAppRoute === 'function'
  ) {
    tryRun(
      () => runtime.offBeforeAppRoute!(shared.beforeRouteCallback!),
      undefined
    )
  }
  if (shared.routeCallback && typeof runtime?.offAppRoute === 'function') {
    tryRun(() => runtime.offAppRoute!(shared.routeCallback!), undefined)
  }
  const globalObject = getGlobalObject()
  tryRun(() => Reflect.deleteProperty(globalObject, SHARED_KEY), false)
  fallbackSharedState = undefined
}
