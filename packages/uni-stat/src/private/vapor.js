import { onAppHide, onAppShow, onError } from '@dcloudio/uni-app'

import Stat from '../core/stat.js'
import { logger } from '../public/infra/logger.ts'
import {
  getGlobalObject,
  resolveUniRuntime,
} from '../public/infra/uniRuntime.ts'
import { get_platform_name } from '../utils/pageInfo.js'

const SHARED_KEY = '__UNI_STAT_PRIVATE_VAPOR_BRIDGE__'
const ROUTE_OPEN_TYPES = new Set([
  'appLaunch',
  'navigateTo',
  'navigateBack',
  'redirectTo',
  'reLaunch',
  'switchTab',
])
const MAX_ROUTE_EVENT_IDS = 100

function encodeRouteValue(value, platform) {
  const encoded = encodeURIComponent(value)
  return platform === 'h5' ? encodeURIComponent(encoded) : encoded
}

function normalizeRoute(event) {
  if (
    !event ||
    event.notFound === true ||
    !ROUTE_OPEN_TYPES.has(event.openType) ||
    typeof event.path !== 'string' ||
    !event.path
  ) {
    return
  }
  const path = event.path.charAt(0) === '/' ? event.path.slice(1) : event.path
  const query = event.query && typeof event.query === 'object' ? event.query : {}
  const platform = get_platform_name()
  const prefix = platform === 'h5' || platform === 'wx' ? '/' : ''
  const queryString = Object.keys(query)
    .map(
      (key) =>
        `${encodeRouteValue(key, platform)}=${encodeRouteValue(
          query[key] == null ? '' : query[key],
          platform
        )}`
    )
    .join('&')
  const fullPath = `${prefix}${path}${queryString ? `?${queryString}` : ''}`
  return {
    key: `${path}?${JSON.stringify(
      Object.keys(query)
        .sort()
        .map((key) => [key, String(query[key] == null ? '' : query[key])])
    )}`,
    path,
    query,
    page: {
      mpType: 'page',
      route: path,
      $page: { route: path, fullPath },
    },
  }
}

export function createPrivateVaporSink(stat) {
  const seenRouteIds = new Set()
  const routeIdOrder = []
  let launched = false
  let foreground = false
  let backgrounded = false
  let activeRoute
  let pendingRoute
  let routePrepared = false
  let resumeRouteKey

  const rememberRouteId = (id) => {
    if (!id) return true
    if (seenRouteIds.has(id)) return false
    seenRouteIds.add(id)
    routeIdOrder.push(id)
    if (routeIdOrder.length > MAX_ROUTE_EVENT_IDS) {
      seenRouteIds.delete(routeIdOrder.shift())
    }
    return true
  }

  const hidePage = () => {
    if (!activeRoute || routePrepared) return
    stat.hide(activeRoute.page)
    routePrepared = true
  }

  const showPage = (route) => {
    stat.load(route.query, route.page)
    stat.show(route.page)
    activeRoute = route
    routePrepared = false
  }

  return {
    launch(options) {
      if (launched) return
      launched = true
      stat.launch(options || {}, null)
      stat.pushEvent(options || {})
    },
    show(options) {
      if (foreground) return
      const resumed = backgrounded
      stat.appShow(activeRoute && activeRoute.page, options || {})
      foreground = true
      backgrounded = false
      const route = pendingRoute || activeRoute
      if (route && (resumed || pendingRoute)) showPage(route)
      resumeRouteKey = resumed && route ? route.key : undefined
      pendingRoute = undefined
    },
    hide() {
      if (!foreground) return
      hidePage()
      stat.appHide(activeRoute && activeRoute.page)
      foreground = false
      backgrounded = true
      resumeRouteKey = undefined
      routePrepared = !!activeRoute
    },
    error(value) {
      try {
        stat.error(value, activeRoute && activeRoute.page)
      } catch (error) {
        console.error('uni-stat error:', error)
      }
    },
    beforeRoute(event) {
      if (launched && foreground && normalizeRoute(event)) hidePage()
    },
    route(event) {
      if (!rememberRouteId(event && event.routeEventId)) return
      const route = normalizeRoute(event)
      if (!route) return
      if (!foreground) {
        pendingRoute = route
        return
      }
      if (!routePrepared && resumeRouteKey === route.key) {
        resumeRouteKey = undefined
        activeRoute = route
        return
      }
      resumeRouteKey = undefined
      hidePage()
      showPage(route)
    },
  }
}

function mountUniReport(stat) {
  const report = (type, options) => stat.sendEvent(type, options)
  try {
    if (typeof uni === 'object' && uni) uni.report = report
  } catch (_error) {}
  const runtime = resolveUniRuntime()
  if (runtime && typeof runtime === 'object') runtime.report = report
}

function bindLifecycle(shared) {
  const bind = (key, register, callback) => {
    if (shared[key]) return
    try {
      register(callback)
      shared[key] = true
    } catch (error) {
      if (!shared.lifecycleWarningShown) {
        shared.lifecycleWarningShown = true
        logger.warn('[vapor] 私有版应用生命周期初始化失败，部分统计可能缺失', error)
      }
    }
  }
  bind('showBound', onAppShow, (options) => shared.sink.show(options))
  bind('hideBound', onAppHide, () => shared.sink.hide())
  bind('errorBound', onError, (value) => shared.sink.error(value))
}

function install() {
  const runtime = resolveUniRuntime()
  if (!runtime || typeof runtime !== 'object') {
    logger.warn('[vapor] uni 运行时不可用，私有版统计未启用')
    return
  }
  const globalObject = getGlobalObject()
  let shared = globalObject[SHARED_KEY]
  if (!shared) {
    const stat = Stat.getInstance()
    shared = {
      sink: createPrivateVaporSink(stat),
      beforeRouteBound: false,
      routeBound: false,
      showBound: false,
      hideBound: false,
      errorBound: false,
      lifecycleWarningShown: false,
    }
    globalObject[SHARED_KEY] = shared
    mountUniReport(stat)
  }
  if (!shared.beforeRouteBound) {
    if (typeof runtime.onBeforeAppRoute !== 'function') {
      logger.warn('[vapor] uni.onBeforeAppRoute 不可用，私有版统计未启用')
    } else {
      try {
        runtime.onBeforeAppRoute((event) => {
          shared.sink.beforeRoute(event)
          if (!shared.launched) {
            shared.launched = true
            try {
              const options = runtime.getLaunchOptionsSync?.() || {}
              shared.sink.launch(options)
              shared.sink.show(options)
            } catch (error) {
              logger.warn('[vapor] 私有版应用启动统计初始化失败', error)
            }
          }
          bindLifecycle(shared)
        })
        shared.beforeRouteBound = true
      } catch (error) {
        logger.warn('[vapor] uni.onBeforeAppRoute 注册失败，私有版统计未启用', error)
      }
    }
  }
  if (!shared.routeBound) {
    if (typeof runtime.onAppRoute !== 'function') {
      logger.warn('[vapor] uni.onAppRoute 不可用，私有版页面统计未启用')
    } else {
      try {
        runtime.onAppRoute((event) => shared.sink.route(event))
        shared.routeBound = true
      } catch (error) {
        logger.warn('[vapor] uni.onAppRoute 注册失败，私有版页面统计未启用', error)
      }
    }
  }
}

export const privateVaporStat = { install }

if (
  process.env.NODE_ENV !== 'development' ||
  process.env.UNI_STAT_DEBUG === 'true' ||
  process.env.UNI_STAT_DEBUG === true
) {
  privateVaporStat.install()
}
