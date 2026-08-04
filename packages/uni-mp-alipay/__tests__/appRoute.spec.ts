;(global as any).my = {
  canIUse: () => false,
}

const { createAlipayAppRouteApi } =
  require('../src/x/api/appRoute') as typeof import('../src/x/api/appRoute')

type ObserverCallback = (payload: {
  openType?: string
  path?: string
  query?: Record<string, string>
  routeEventId?: string
}) => void

function createObserver() {
  const callbacks: Record<string, ObserverCallback> = {}
  const observer = {
    beforeRoute: jest.fn((callback: ObserverCallback) => {
      callbacks.beforeRoute = callback
      return observer
    }),
    afterShow: jest.fn((callback: ObserverCallback) => {
      callbacks.afterShow = callback
      return observer
    }),
    afterRoute: jest.fn((callback: ObserverCallback) => {
      callbacks.afterRoute = callback
      return observer
    }),
    onPageNotFound: jest.fn((callback: ObserverCallback) => {
      callbacks.onPageNotFound = callback
      return observer
    }),
    observe: jest.fn(),
  }
  return { callbacks, observer }
}

function createPlatform(canIUse = true) {
  const observers: ReturnType<typeof createObserver>[] = []
  return {
    canIUse: jest.fn(() => canIUse),
    createRouteObserver: jest.fn(() => {
      const observer = createObserver()
      observers.push(observer)
      return observer.observer
    }),
    observers,
  }
}

describe('mp-alipay app route', () => {
  test('dispatches a successful route after the target page is shown', () => {
    const platform = createPlatform()
    const api = createAlipayAppRouteApi(platform)
    const listener = jest.fn()

    api.onAppRoute(listener)
    expect(platform.canIUse).toHaveBeenCalledWith('createRouteObserver')
    expect(platform.createRouteObserver).toHaveBeenCalledWith({
      pages: ['app://*'],
    })
    const { callbacks, observer } = platform.observers[0]
    expect(observer.observe).toHaveBeenCalledTimes(1)

    callbacks.beforeRoute({
      openType: 'navigateTo',
      path: 'pages/detail/index',
      routeEventId: 'route-1',
    })
    callbacks.afterShow({
      path: 'app://pages/detail/index',
      query: { from: 'test' },
      routeEventId: 'route-1',
    })

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith({
      path: 'pages/detail/index',
      query: { from: 'test' },
      openType: 'navigateTo',
      notFound: false,
      timeStamp: expect.any(Number),
      routeEventId: 'route-1',
    })
    api.offAppRoute()
  })

  test.each([
    ['appLaunch', 'appLaunch'],
    ['redirectTo', 'redirectTo'],
    ['switchTab', 'switchTab'],
    ['reLaunch', 'reLaunch'],
    ['navigateBack', 'navigateBack'],
    ['back', 'navigateBack'],
    ['tabClick', 'switchTab'],
  ])('maps Alipay openType %s to %s', (alipayOpenType, openType) => {
    const platform = createPlatform()
    const api = createAlipayAppRouteApi(platform)
    const listener = jest.fn()
    api.onAppRoute(listener)
    const { callbacks } = platform.observers[0]

    callbacks.beforeRoute({
      openType: alipayOpenType,
      routeEventId: 'route-1',
    })
    callbacks.afterShow({
      path: 'pages/index/index',
      routeEventId: 'route-1',
    })

    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ openType }))
    api.offAppRoute()
  })

  test('ignores routes that do not show a page or only resume the app', () => {
    const platform = createPlatform()
    const api = createAlipayAppRouteApi(platform)
    const listener = jest.fn()
    api.onAppRoute(listener)
    const { callbacks } = platform.observers[0]

    callbacks.beforeRoute({
      openType: 'switchTab',
      routeEventId: 'same-tab',
    })
    callbacks.afterRoute({ routeEventId: 'same-tab' })
    callbacks.afterShow({
      path: 'pages/index/index',
      routeEventId: 'same-tab',
    })

    callbacks.beforeRoute({
      openType: 'autoReLaunch',
      routeEventId: 'resume',
    })
    callbacks.afterShow({
      path: 'pages/index/index',
      routeEventId: 'resume',
    })

    callbacks.beforeRoute({
      openType: 'navigateTo',
      routeEventId: 'not-found',
    })
    callbacks.onPageNotFound({ routeEventId: 'not-found' })
    callbacks.afterShow({
      path: 'pages/index/index',
      routeEventId: 'not-found',
    })

    expect(listener).not.toHaveBeenCalled()
    api.offAppRoute()
  })

  test('does not create an observer when the host does not support it', () => {
    const platform = createPlatform(false)
    const api = createAlipayAppRouteApi(platform)
    const listener = jest.fn()

    expect(() => api.onAppRoute(listener)).not.toThrow()
    expect(platform.createRouteObserver).not.toHaveBeenCalled()
    api.offAppRoute(listener)
  })

  test('captures the launch route before the listener is registered', () => {
    const platform = createPlatform()
    const api = createAlipayAppRouteApi(platform)
    const listener = jest.fn()
    const { callbacks } = platform.observers[0]

    callbacks.beforeRoute({
      openType: 'appLaunch',
      routeEventId: 'launch',
    })
    api.onAppRoute(listener)
    callbacks.afterShow({
      path: 'pages/index/index',
      routeEventId: 'launch',
    })

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ openType: 'appLaunch' })
    )
    api.offAppRoute()
  })
})
