jest.mock('@dcloudio/uni-api', () =>
  Object.assign(
    {},
    jest.requireActual('../../../../../uni-api/src/helpers/api'),
    jest.requireActual('../../../../../uni-api/src/protocols/route/route'),
    jest.requireActual('../../../../../uni-api/src/service/route/appRoute')
  )
)

import {
  API_NAVIGATE_TO,
  beforeRoute,
  createNormalizeUrl,
} from '@dcloudio/uni-api'
import {
  dispatchAppRoute,
  dispatchAppRouteNotFound,
  offAppRoute,
  offBeforeAppRoute,
  onAppRoute,
  onBeforeAppRoute,
  resolveAppRoute,
  rewriteRoute,
} from '../../../../src/x/api/route/appRoute'

describe('app x app route', () => {
  const bridge = UniServiceJSBridge as any
  const oldOn = bridge.on
  const oldOff = bridge.off
  const oldInvokeOnCallback = bridge.invokeOnCallback
  const oldGetApp = (global as any).getApp
  const oldPlatform = (global as any).__PLATFORM__
  const oldUniRoutes = global.__uniRoutes
  const oldUniConfig = global.__uniConfig
  const appVm = {
    $: {
      onPageNotFound: [] as Function[],
    },
  }

  beforeAll(() => {
    bridge.on = jest.fn(() => {
      throw new Error('App X 不应使用 UniServiceJSBridge.on')
    })
    bridge.off = jest.fn(() => {
      throw new Error('App X 不应使用 UniServiceJSBridge.off')
    })
    bridge.invokeOnCallback = jest.fn(() => {
      throw new Error('App X 不应使用 UniServiceJSBridge.invokeOnCallback')
    })
    ;(global as any).getApp = () => ({ vm: appVm })
    ;(global as any).__PLATFORM__ = 'app'
    global.__uniConfig = { ready: false } as UniApp.UniConfig
  })

  afterAll(() => {
    offAppRoute()
    offBeforeAppRoute()
    bridge.on = oldOn
    bridge.off = oldOff
    bridge.invokeOnCallback = oldInvokeOnCallback
    ;(global as any).getApp = oldGetApp
    ;(global as any).__PLATFORM__ = oldPlatform
    global.__uniRoutes = oldUniRoutes
    global.__uniConfig = oldUniConfig
  })

  beforeEach(() => {
    beforeRoute()
    global.__uniConfig.ready = false
    global.__uniRoutes = [
      {
        path: '/pages/index/index',
        alias: '/',
        meta: { isEntry: true, isTabBar: false },
      },
      {
        path: '/pages/next/next',
        meta: { isEntry: false, isTabBar: false },
      },
      {
        path: '/pages/tab/tab',
        meta: { isEntry: false, isTabBar: true },
      },
    ] as UniApp.UniRoute[]
    appVm.$.onPageNotFound.length = 0
  })

  afterEach(() => {
    offAppRoute()
    offBeforeAppRoute()
  })

  test('dispatches normalized route data and supports offAppRoute', () => {
    const listener = jest.fn()
    onAppRoute(listener)

    dispatchAppRoute(
      '/pages/index/index',
      { from: 'app%20route' },
      API_NAVIGATE_TO
    )

    expect(listener).toHaveBeenCalledWith({
      path: 'pages/index/index',
      query: { from: 'app route' },
      openType: API_NAVIGATE_TO,
      notFound: false,
      timeStamp: expect.any(Number),
      routeEventId: expect.any(String),
    })

    offAppRoute(listener)
    dispatchAppRoute('/pages/next/next', {}, API_NAVIGATE_TO)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  test('supports multiple listeners and clearing all listeners', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    onAppRoute(listener1)
    onAppRoute(listener2)

    dispatchAppRoute('/pages/index/index', {}, API_NAVIGATE_TO)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)

    offAppRoute(listener1)
    dispatchAppRoute('/pages/next/next', {}, API_NAVIGATE_TO)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(2)

    offAppRoute()
    dispatchAppRoute('/pages/last/last', {}, API_NAVIGATE_TO)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(2)
  })

  test('dispatches onPageNotFound before onAppRoute', () => {
    const calls: string[] = []
    appVm.$.onPageNotFound.push(() => calls.push('onPageNotFound'))
    onAppRoute(() => calls.push('onAppRoute'))

    dispatchAppRouteNotFound('/pages/missing/missing?from=launch')

    expect(calls).toEqual(['onPageNotFound', 'onAppRoute'])
  })

  test('rewrites a route and preserves the original query', () => {
    const beforeEvents: Record<string, any>[] = []
    const routeListener = jest.fn()
    onBeforeAppRoute((event) => {
      beforeEvents.push(event)
      if (event.path === 'pages/index/index') {
        rewriteRoute({
          url: '/pages/next/next?ignored=true',
          preserveQuery: true,
        })
      }
    })
    onAppRoute(routeListener)

    const resolved = resolveAppRoute(
      '/pages/index/index?from=app%20route',
      API_NAVIGATE_TO
    )
    dispatchAppRoute(resolved.context)

    expect(resolved.context.event.query).toEqual({ from: 'app route' })
    expect(beforeEvents).toHaveLength(2)
    expect(beforeEvents[0]).toEqual(
      expect.objectContaining({
        path: 'pages/index/index',
        query: { from: 'app route' },
      })
    )
    expect(beforeEvents[1]).toEqual(
      expect.objectContaining({
        path: 'pages/next/next',
        query: { from: 'app route' },
      })
    )
    expect(routeListener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/next/next',
        routeEventId: beforeEvents[1].routeEventId,
      })
    )
  })

  test('rewrites to the same normalized URL without navigator lock interference', () => {
    global.__uniConfig.ready = true
    const params = {
      url: '/pages/next/next',
      openType: API_NAVIGATE_TO,
    }
    expect(createNormalizeUrl(API_NAVIGATE_TO)(params.url, params)).toBe(
      undefined
    )

    const success = jest.fn()
    const fail = jest.fn()
    const beforeListener = jest.fn()
    let rewritten = false
    onBeforeAppRoute(() => {
      beforeListener()
      if (!rewritten) {
        rewritten = true
        rewriteRoute({ url: params.url, success, fail })
      }
    })

    const resolved = resolveAppRoute(params.url, API_NAVIGATE_TO)

    expect(resolved.url).toBe(params.url)
    expect(beforeListener).toHaveBeenCalledTimes(2)
    expect(success).toHaveBeenCalledWith(
      expect.objectContaining({ errMsg: 'rewriteRoute:ok' })
    )
    expect(fail).not.toHaveBeenCalled()
  })

  test('validates rewritten page type against the original openType', () => {
    const failures: string[] = []
    onBeforeAppRoute((event) => {
      rewriteRoute({
        url:
          event.openType === API_NAVIGATE_TO
            ? '/pages/tab/tab'
            : '/pages/next/next',
        fail: ({ errMsg }) => failures.push(errMsg),
      })
    })

    const navigateToRoute = resolveAppRoute(
      '/pages/index/index',
      API_NAVIGATE_TO
    )
    const switchTabRoute = resolveAppRoute('/pages/tab/tab', 'switchTab')

    expect(navigateToRoute.url).toBe('/pages/index/index')
    expect(switchTabRoute.url).toBe('/pages/tab/tab')
    expect(failures).toEqual([
      'rewriteRoute:fail can not navigateTo a tabbar page',
      'rewriteRoute:fail can not switch to no-tabBar page',
    ])
  })

  test('rewrites a missing entry route before page not found is dispatched', () => {
    const beforeEvents: Record<string, any>[] = []
    const pageNotFoundListener = jest.fn()
    appVm.$.onPageNotFound.push(pageNotFoundListener)
    onBeforeAppRoute((event) => {
      beforeEvents.push(event)
      if (event.notFound) {
        rewriteRoute({ url: '/pages/next/next?from=missing' })
      }
    })

    const resolved = resolveAppRoute(
      '/pages/missing/missing',
      'appLaunch',
      true
    )
    dispatchAppRoute(resolved.context)

    expect(
      beforeEvents.map(({ path, notFound }) => ({ path, notFound }))
    ).toEqual([
      { path: 'pages/missing/missing', notFound: true },
      { path: 'pages/next/next', notFound: false },
    ])
    expect(resolved.context.event).toEqual(
      expect.objectContaining({
        path: 'pages/next/next',
        query: { from: 'missing' },
        notFound: false,
      })
    )
    expect(pageNotFoundListener).not.toHaveBeenCalled()
  })
})
