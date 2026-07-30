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
  API_REDIRECT_TO,
  API_RE_LAUNCH,
  API_SWITCH_TAB,
  type AppRouteOpenType,
  NavigateToOptions,
  ReLaunchOptions,
  RedirectToOptions,
  SwitchTabOptions,
} from '@dcloudio/uni-api'
import {
  createAppRouteOptions,
  dispatchAppRoute,
  dispatchAppRouteNotFound,
  offAppRoute,
  onAppRoute,
} from '../../../../src/x/api/route/appRoute'

type UrlFormatter = (url: string, params: Record<string, any>) => string | void
type RouteApiOptions = ApiOptions<any, any>

const routeApiOptions: [AppRouteOpenType, RouteApiOptions][] = [
  [API_NAVIGATE_TO, NavigateToOptions],
  [API_REDIRECT_TO, RedirectToOptions],
  [API_RE_LAUNCH, ReLaunchOptions],
  [API_SWITCH_TAB, SwitchTabOptions],
]

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
    bridge.on = oldOn
    bridge.off = oldOff
    bridge.invokeOnCallback = oldInvokeOnCallback
    ;(global as any).getApp = oldGetApp
    ;(global as any).__PLATFORM__ = oldPlatform
    global.__uniRoutes = oldUniRoutes
    global.__uniConfig = oldUniConfig
  })

  beforeEach(() => {
    global.__uniRoutes = []
    appVm.$.onPageNotFound.length = 0
  })

  afterEach(() => {
    offAppRoute()
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

    dispatchAppRouteNotFound('/pages/missing/missing?from=api', API_REDIRECT_TO)

    expect(calls).toEqual(['onPageNotFound', 'onAppRoute'])
  })

  test.each(routeApiOptions)(
    '%s dispatches a missing route once',
    (type, options) => {
      const listener = jest.fn()
      onAppRoute(listener)
      const routeOptions = createAppRouteOptions(type, options)
      const normalizeUrl = (routeOptions.formatArgs as Record<string, unknown>)
        .url as UrlFormatter
      const url = '/pages/missing/missing?from=api'

      expect(normalizeUrl(url, { url })).toBe(`page \`${url}\` is not found`)
      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          path: 'pages/missing/missing',
          query: { from: 'api' },
          openType: type,
          notFound: true,
        })
      )
    }
  )
})
