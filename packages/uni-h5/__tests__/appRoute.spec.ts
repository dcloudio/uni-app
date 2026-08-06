const mockEntryPageState = { handledBeforeEntryPageRoutes: true }
let mockPageId = 0

jest.mock('../src/framework/setup/page', () => ({
  createPageState: (type: string, id?: number) => ({
    __id__: id || ++mockPageId,
    __type__: type,
  }),
  entryPageState: mockEntryPageState,
  getCurrentBasePages: () => [],
  getCurrentPagesMap: () => new Map(),
  getPage$BasePage: (page: any) => page.$basePage,
  navigateToPagesBeforeEntryPages: [],
  reLaunchPagesBeforeEntryPages: [],
  redirectToPagesBeforeEntryPages: [],
  switchTabPagesBeforeEntryPages: [],
}))

jest.mock('@dcloudio/uni-api', () =>
  Object.assign(
    {},
    jest.requireActual('../../uni-api/src/helpers/api'),
    jest.requireActual('../../uni-api/src/protocols/route/route'),
    jest.requireActual('../../uni-api/src/service/route/appRoute')
  )
)

import { API_NAVIGATE_TO } from '@dcloudio/uni-api'
import * as appRoute from '../src/service/api/route/appRoute'
import { navigateTo } from '../src/service/api/route/navigateTo'

function stringifyQuery(query: Record<string, any>) {
  const search = new URLSearchParams(query).toString()
  return search ? `?${search}` : ''
}

function createRoute(
  path: string,
  query: Record<string, any> = {},
  extra: Record<string, unknown> = {}
) {
  const routePath = path.startsWith('/') ? path : `/${path}`
  const routeOptions = global.__uniRoutes.find(
    (route) => route.path === routePath || route.alias === routePath
  )
  return {
    path: routePath,
    fullPath: routePath + stringifyQuery(query),
    query,
    meta: routeOptions?.meta || {},
    matched: routeOptions ? [{}] : [],
    ...extra,
  }
}

describe('web app route', () => {
  const oldNodeJs = global.__NODE_JS__
  const oldPlatform = global.__PLATFORM__
  const oldX = global.__X__
  const oldUniRoutes = global.__uniRoutes
  const oldUniConfig = global.__uniConfig
  const oldGetApp = (global as any).getApp
  const appVm = {
    $: {
      onPageNotFound: [] as Function[],
    },
    $router: undefined as any,
  }
  const onRouteConfirmed = jest.fn()
  const onMissingRoute = jest.fn()
  let routerBeforeEach: Function
  let routerAfterEach: Function
  let routerOnError: Function

  async function completeNavigation(location: {
    path: string
    query?: Record<string, any>
  }) {
    const from = router.currentRoute.value
    let to = createRoute(location.path, location.query)
    let redirect = await routerBeforeEach(to)
    while (redirect) {
      const redirectedFrom = to
      to = createRoute(redirect.path, redirect.query, { redirectedFrom })
      redirect = await routerBeforeEach(to)
    }
    router.currentRoute.value = to
    routerAfterEach(to, from)
  }

  const router = {
    currentRoute: {
      value: {} as ReturnType<typeof createRoute>,
    },
    resolve(location: { path: string; query?: Record<string, any> }) {
      return createRoute(location.path, location.query)
    },
    beforeEach(callback: Function) {
      routerBeforeEach = callback
    },
    afterEach(callback: Function) {
      routerAfterEach = callback
    },
    onError(callback: Function) {
      routerOnError = callback
    },
    push: completeNavigation,
    replace: completeNavigation,
  }

  beforeAll(() => {
    global.__NODE_JS__ = false
    global.__PLATFORM__ = 'h5'
    global.__X__ = true
    global.__uniConfig = { ready: false } as UniApp.UniConfig
    global.__uniRoutes = [
      {
        path: '/pages/index/index',
        alias: '/',
        meta: {
          route: 'pages/index/index',
          isEntry: true,
          isTabBar: false,
        },
      },
      {
        path: '/pages/next/next',
        meta: {
          route: 'pages/next/next',
          isEntry: false,
          isTabBar: false,
        },
      },
      {
        path: '/pages/final/final',
        meta: {
          route: 'pages/final/final',
          isEntry: false,
          isTabBar: false,
        },
      },
      {
        path: '/pages/tab/tab',
        meta: {
          route: 'pages/tab/tab',
          isEntry: false,
          isTabBar: true,
        },
      },
    ] as UniApp.UniRoute[]
    router.currentRoute.value = createRoute('/')
    appVm.$router = router
    ;(global as any).getApp = () => ({ vm: appVm })
    appRoute.initWebAppRouteListener(router as any, {
      onRouteConfirmed,
      onMissingRoute,
    })
  })

  afterAll(() => {
    appRoute.offAppRoute()
    appRoute.offBeforeAppRoute()
    global.__NODE_JS__ = oldNodeJs
    global.__PLATFORM__ = oldPlatform
    global.__X__ = oldX
    global.__uniRoutes = oldUniRoutes
    global.__uniConfig = oldUniConfig
    ;(global as any).getApp = oldGetApp
  })

  beforeEach(() => {
    onRouteConfirmed.mockClear()
    onMissingRoute.mockClear()
    appVm.$.onPageNotFound.length = 0
  })

  afterEach(() => {
    appRoute.offAppRoute()
    appRoute.offBeforeAppRoute()
    jest.restoreAllMocks()
  })

  test('启动时等待 App 注册监听器并重写缺失页面', async () => {
    const beforeEvents: Record<string, any>[] = []
    const routeListener = jest.fn()
    const pageNotFoundListener = jest.fn()
    appVm.$.onPageNotFound.push(pageNotFoundListener)
    const missingRoute = createRoute('/pages/missing/missing', {
      from: 'launch',
    })

    const navigation = routerBeforeEach(missingRoute)
    appRoute.registerWebAppRouteLaunchExecutor(async (route) => {
      await Promise.resolve()
      appRoute.onBeforeAppRoute((event) => {
        beforeEvents.push(event)
        if (event.notFound) {
          appRoute.rewriteRoute({ url: '/pages/next/next?from=rewrite' })
        }
      })
      appRoute.onAppRoute(routeListener)
      return appRoute.resolveAppRoute(route.fullPath, 'appLaunch', true)
    })

    expect(await navigation).toEqual({
      path: '/pages/next/next',
      query: { from: 'rewrite' },
    })

    const finalRoute = createRoute(
      '/pages/next/next',
      { from: 'rewrite' },
      {
        redirectedFrom: missingRoute,
      }
    )
    expect(await routerBeforeEach(finalRoute)).toBeUndefined()
    routerAfterEach(finalRoute, missingRoute)
    appRoute.dispatchWebAppRoute(finalRoute)

    expect(
      beforeEvents.map(({ path, notFound }) => ({ path, notFound }))
    ).toEqual([
      { path: 'pages/missing/missing', notFound: true },
      { path: 'pages/next/next', notFound: false },
    ])
    expect(routeListener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/next/next',
        query: { from: 'rewrite' },
        routeEventId: beforeEvents[1].routeEventId,
      })
    )
    expect(pageNotFoundListener).not.toHaveBeenCalled()
    expect(onRouteConfirmed).toHaveBeenCalledTimes(1)
  })

  test('程序化路由使用最终 Context 且只派发一次', async () => {
    const beforeListener = jest.fn()
    const routeListener = jest.fn()
    appRoute.onBeforeAppRoute(beforeListener)
    appRoute.onAppRoute(routeListener)
    const resolved = appRoute.resolveAppRoute(
      '/pages/next/next?id=1',
      API_NAVIGATE_TO
    )
    const transaction = appRoute.createWebAppRouteTransaction(
      '/pages/next/next?id=1',
      API_NAVIGATE_TO,
      resolved.context
    )
    appRoute.queueWebAppRouteTransaction(transaction)
    const to = createRoute('/pages/next/next', { id: '1' })

    expect(await routerBeforeEach(to)).toBeUndefined()
    routerAfterEach(to, createRoute('/'))
    appRoute.dispatchWebAppRoute(to)
    appRoute.dispatchWebAppRoute(to)

    expect(beforeListener).toHaveBeenCalledTimes(1)
    expect(routeListener).toHaveBeenCalledTimes(1)
    expect(routeListener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/next/next',
        routeEventId: resolved.context.event.routeEventId,
      })
    )
  })

  test('navigateTo 重写后使用最终 URL 和 Context 完成路由', async () => {
    const beforeEvents: Record<string, any>[] = []
    const routeListener = jest.fn()
    appRoute.onBeforeAppRoute((event) => {
      beforeEvents.push(event)
      if (event.path === 'pages/next/next') {
        appRoute.rewriteRoute({
          url: '/pages/final/final?from=rewrite',
        })
      }
    })
    appRoute.onAppRoute(routeListener)

    await new Promise<void>((resolve, reject) => {
      navigateTo({
        url: '/pages/next/next?from=source',
        success: () => resolve(),
        fail: reject,
      })
    })
    const finalRoute = router.currentRoute.value
    appRoute.dispatchWebAppRoute(finalRoute)

    expect(finalRoute.fullPath).toBe('/pages/final/final?from=rewrite')
    expect(beforeEvents.map(({ path }) => path)).toEqual([
      'pages/next/next',
      'pages/final/final',
    ])
    expect(onRouteConfirmed).toHaveBeenCalledTimes(1)
    expect(routeListener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/final/final',
        query: { from: 'rewrite' },
        routeEventId: beforeEvents[1].routeEventId,
      })
    )
  })

  test('Router 二次重定向产生新的 before 事件', async () => {
    const beforeEvents: Record<string, any>[] = []
    const routeListener = jest.fn()
    appRoute.onBeforeAppRoute((event) => beforeEvents.push(event))
    appRoute.onAppRoute(routeListener)
    const original = createRoute('/pages/next/next')
    const resolved = appRoute.resolveAppRoute(
      original.fullPath,
      API_NAVIGATE_TO
    )
    appRoute.queueWebAppRouteTransaction(
      appRoute.createWebAppRouteTransaction(
        original.fullPath,
        API_NAVIGATE_TO,
        resolved.context
      )
    )
    const redirected = createRoute(
      '/pages/final/final',
      {},
      {
        redirectedFrom: original,
      }
    )

    expect(await routerBeforeEach(redirected)).toBeUndefined()
    routerAfterEach(redirected, createRoute('/'))
    appRoute.dispatchWebAppRoute(redirected)

    expect(beforeEvents.map(({ path }) => path)).toEqual([
      'pages/next/next',
      'pages/final/final',
    ])
    expect(routeListener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/final/final',
        routeEventId: beforeEvents[1].routeEventId,
      })
    )
  })

  test('单页面启动支持 query 重写并只派发一次', () => {
    const oldLocation = (global as any).location
    const oldHistory = (global as any).history
    const replaceState = jest.fn()
    ;(global as any).location = {
      pathname: '/app/',
      hash: '#/',
    }
    ;(global as any).history = {
      state: { key: 'value' },
      replaceState,
    }
    try {
      const routeListener = jest.fn()
      appRoute.onBeforeAppRoute((event) => {
        if (event.query.from === 'source') {
          appRoute.rewriteRoute({ url: '/?from=rewrite' })
        }
      })
      appRoute.onAppRoute(routeListener)

      const resolved = appRoute.resolveAppRoute('/?from=source', 'appLaunch')
      appRoute.setSinglePageAppRoute(resolved, '/?from=source')
      appRoute.dispatchWebAppRoute()
      appRoute.dispatchWebAppRoute()

      expect(replaceState).toHaveBeenCalledWith(
        { key: 'value' },
        '',
        '/app/?from=rewrite#/'
      )
      expect(routeListener).toHaveBeenCalledTimes(1)
      expect(routeListener).toHaveBeenCalledWith(
        expect.objectContaining({
          path: 'pages/index/index',
          query: { from: 'rewrite' },
          openType: 'appLaunch',
        })
      )
    } finally {
      ;(global as any).location = oldLocation
      ;(global as any).history = oldHistory
    }
  })

  test('重写保留原 query，并校验目标页面类型', () => {
    const rewriteSuccess = jest.fn()
    appRoute.onBeforeAppRoute((event) => {
      if (event.path === 'pages/next/next') {
        appRoute.rewriteRoute({
          url: '/pages/final/final?ignored=1',
          preserveQuery: true,
          success: rewriteSuccess,
        })
      }
    })

    const preserved = appRoute.resolveAppRoute(
      '/pages/next/next?from=source',
      'navigateTo'
    )

    expect(preserved.url).toBe('/pages/final/final?from=source')
    expect(preserved.context.event.query).toEqual({ from: 'source' })
    expect(rewriteSuccess).toHaveBeenCalledWith(
      expect.objectContaining({ errMsg: 'rewriteRoute:ok' })
    )

    appRoute.offBeforeAppRoute()
    const navigateToFail = jest.fn()
    const switchTabFail = jest.fn()
    appRoute.onBeforeAppRoute((event) => {
      appRoute.rewriteRoute({
        url:
          event.openType === 'navigateTo'
            ? '/pages/tab/tab'
            : '/pages/next/next',
        fail: event.openType === 'navigateTo' ? navigateToFail : switchTabFail,
      })
    })

    const navigateToResult = appRoute.resolveAppRoute(
      '/pages/next/next',
      'navigateTo'
    )
    const switchTabResult = appRoute.resolveAppRoute(
      '/pages/tab/tab',
      'switchTab'
    )

    expect(navigateToResult.url).toBe('/pages/next/next')
    expect(switchTabResult.url).toBe('/pages/tab/tab')
    expect(navigateToFail).toHaveBeenCalledWith(
      expect.objectContaining({
        errMsg: 'rewriteRoute:fail can not navigateTo a tabbar page',
      })
    )
    expect(switchTabFail).toHaveBeenCalledWith(
      expect.objectContaining({
        errMsg: 'rewriteRoute:fail can not switch to no-tabBar page',
      })
    )
  })

  test('浏览器返回透传 delta，navigateBack 不允许重写', async () => {
    const rewriteFail = jest.fn()
    appRoute.onBeforeAppRoute(() => {
      appRoute.rewriteRoute({ url: '/pages/final/final', fail: rewriteFail })
    })
    const to = createRoute('/pages/index/index')
    appRoute.setWebAppRouteHistoryDirection(to.fullPath, 'back', -2)

    expect(await routerBeforeEach(to)).toBeUndefined()
    routerAfterEach(to, createRoute('/pages/next/next'))
    appRoute.dispatchWebAppRoute(to)

    expect(rewriteFail).toHaveBeenCalledWith(
      expect.objectContaining({
        errMsg:
          'rewriteRoute:fail a "navigateBack" event is not allowed to be rewritten',
      })
    )
    expect(onRouteConfirmed).toHaveBeenCalledWith(
      expect.objectContaining({ openType: 'navigateBack', delta: 2 })
    )
  })

  test('失败和异常导航只回收事务，不确认路由', async () => {
    const first = createRoute('/pages/next/next')
    const firstResolved = appRoute.resolveAppRoute(
      first.fullPath,
      API_NAVIGATE_TO
    )
    appRoute.queueWebAppRouteTransaction(
      appRoute.createWebAppRouteTransaction(
        first.fullPath,
        API_NAVIGATE_TO,
        firstResolved.context
      )
    )
    await routerBeforeEach(first)
    routerAfterEach(first, createRoute('/'), new Error('cancelled'))

    const second = createRoute('/pages/final/final')
    const secondResolved = appRoute.resolveAppRoute(
      second.fullPath,
      API_NAVIGATE_TO
    )
    appRoute.queueWebAppRouteTransaction(
      appRoute.createWebAppRouteTransaction(
        second.fullPath,
        API_NAVIGATE_TO,
        secondResolved.context
      )
    )
    await routerBeforeEach(second)
    routerOnError(new Error('guard error'), second)

    expect(onRouteConfirmed).not.toHaveBeenCalled()
  })
})
