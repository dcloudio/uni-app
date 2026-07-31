import { START_LOCATION } from 'vue-router'

jest.mock('@dcloudio/uni-api', () =>
  Object.assign(
    {},
    jest.requireActual('../../uni-api/src/helpers/api'),
    jest.requireActual('../../uni-api/src/protocols/route/route'),
    jest.requireActual('../../uni-api/src/service/route/appRoute')
  )
)

import * as appRoute from '../src/service/api/route/appRoute'

function createRoute(
  path: string,
  query: Record<string, any> = {},
  extra: Record<string, unknown> = {}
) {
  return {
    path: `/${path}`,
    fullPath: `/${path}`,
    query,
    meta: { route: path },
    matched: [{}],
    ...extra,
  }
}

describe('web app route', () => {
  const oldNodeJs = (global as any).__NODE_JS__
  const oldPlatform = (global as any).__PLATFORM__
  const oldHistory = (global as any).history
  const oldGetApp = (global as any).getApp
  const bridge = UniServiceJSBridge as any
  const oldOn = bridge.on
  const oldOff = bridge.off
  const oldInvokeOnCallback = bridge.invokeOnCallback
  const bridgeListeners: Record<string, Function> = {}
  const appVm = {
    $: {
      onPageNotFound: [] as Function[],
    },
  }
  let routerBeforeEach: Function
  let routerAfterEach: Function
  let routerOnError: Function

  function finishRouterRoute(to: object, from: object, failure?: Error) {
    routerBeforeEach(to, from)
    routerAfterEach(to, from, failure)
  }

  function setHistoryOpenType(openType?: string, stateId = 1) {
    ;(global as any).history.state = {
      __id__: stateId,
      ...(openType ? { __type__: openType } : {}),
    }
  }

  beforeAll(() => {
    ;(global as any).__NODE_JS__ = false
    ;(global as any).__PLATFORM__ = 'h5'
    ;(global as any).history = { state: {} }
    ;(global as any).getApp = () => ({ vm: appVm })
    bridge.on = (name: string, callback: Function) => {
      bridgeListeners[name] = callback
    }
    bridge.off = (name: string) => {
      delete bridgeListeners[name]
    }
    bridge.invokeOnCallback = (name: string, event: unknown) => {
      bridgeListeners[`api.${name}`]?.(event)
    }
    appRoute.initWebAppRouteListener({
      beforeEach(callback: Function) {
        routerBeforeEach = callback
      },
      afterEach(callback: Function) {
        routerAfterEach = callback
      },
      onError(callback: Function) {
        routerOnError = callback
      },
    } as any)
  })

  afterAll(() => {
    appRoute.offAppRoute()
    ;(global as any).__NODE_JS__ = oldNodeJs
    if (oldPlatform === undefined) {
      delete (global as any).__PLATFORM__
    } else {
      ;(global as any).__PLATFORM__ = oldPlatform
    }
    if (oldHistory === undefined) {
      delete (global as any).history
    } else {
      ;(global as any).history = oldHistory
    }
    bridge.on = oldOn
    bridge.off = oldOff
    bridge.invokeOnCallback = oldInvokeOnCallback
    if (oldGetApp === undefined) {
      delete (global as any).getApp
    } else {
      ;(global as any).getApp = oldGetApp
    }
  })

  beforeEach(() => {
    appRoute.setWebAppRouteReady()
    appVm.$.onPageNotFound.length = 0
    setHistoryOpenType()
  })

  afterEach(() => {
    appRoute.offAppRoute()
    jest.restoreAllMocks()
  })

  test('buffers routes until app is ready', () => {
    jest.isolateModules(() => {
      const isolatedAppRoute = jest.requireActual(
        '../src/service/api/route/appRoute'
      ) as typeof appRoute
      const isolatedStartLocation =
        jest.requireActual('vue-router').START_LOCATION
      let isolatedRouterAfterEach: Function = () => {}
      isolatedAppRoute.initWebAppRouteListener({
        beforeEach() {},
        afterEach(callback: Function) {
          isolatedRouterAfterEach = callback
        },
        onError() {},
      } as any)

      const pageNotFoundListener = jest.fn()
      const listener = jest.fn()
      appVm.$.onPageNotFound.push(pageNotFoundListener)
      isolatedAppRoute.onAppRoute(listener)
      const launchRoute = createRoute(
        'pages/missing/missing',
        { from: 'launch' },
        { matched: [] }
      )
      isolatedRouterAfterEach(launchRoute, isolatedStartLocation)
      expect(listener).not.toHaveBeenCalled()
      expect(pageNotFoundListener).not.toHaveBeenCalled()

      isolatedAppRoute.setWebAppRouteReady()
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          path: 'pages/missing/missing',
          query: { from: 'launch' },
          openType: 'appLaunch',
          routeEventId: expect.any(String),
          timeStamp: expect.any(Number),
          notFound: true,
        })
      )
      expect(pageNotFoundListener).toHaveBeenCalledWith({
        path: 'pages/missing/missing',
        query: { from: 'launch' },
        isEntryPage: true,
      })
      isolatedAppRoute.offAppRoute()
    })
  })

  test('isolates listener errors while flushing buffered routes', () => {
    jest.isolateModules(() => {
      const isolatedAppRoute = jest.requireActual(
        '../src/service/api/route/appRoute'
      ) as typeof appRoute
      const isolatedStartLocation =
        jest.requireActual('vue-router').START_LOCATION
      let isolatedRouterAfterEach: Function = () => {}
      isolatedAppRoute.initWebAppRouteListener({
        beforeEach() {},
        afterEach(callback: Function) {
          isolatedRouterAfterEach = callback
        },
        onError() {},
      } as any)

      const error = new Error('listener failed')
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      isolatedAppRoute.onAppRoute(() => {
        throw error
      })
      const launchRoute = createRoute('pages/index/index')
      isolatedRouterAfterEach(launchRoute, isolatedStartLocation)
      isolatedAppRoute.dispatchWebAppRoute(launchRoute)

      expect(() => isolatedAppRoute.setWebAppRouteReady()).not.toThrow()
      expect(consoleError).toHaveBeenCalledWith(error)
      isolatedAppRoute.offAppRoute()
    })
  })

  test('dispatches committed routes synchronously and supports offAppRoute', () => {
    const listener = jest.fn()
    appRoute.onAppRoute(listener)

    const launchRoute = createRoute('pages/index/index', { from: 'launch' })
    finishRouterRoute(launchRoute, START_LOCATION)
    expect(listener).not.toHaveBeenCalled()
    appRoute.dispatchWebAppRoute(launchRoute)

    const detailRoute = createRoute('pages/detail/detail', { id: '1' })
    setHistoryOpenType('redirectTo')
    finishRouterRoute(detailRoute, launchRoute)
    appRoute.dispatchWebAppRoute(detailRoute)

    const indexRoute = createRoute('pages/index/index')
    appRoute.setWebAppRouteHistoryDirection(indexRoute.fullPath, 'back')
    finishRouterRoute(indexRoute, detailRoute)
    appRoute.dispatchWebAppRoute(indexRoute)

    expect(listener).toHaveBeenCalledTimes(3)
    expect(listener.mock.calls[1][0]).toMatchObject({
      path: 'pages/detail/detail',
      openType: 'redirectTo',
    })
    expect(listener.mock.calls[2][0]).toMatchObject({
      path: 'pages/index/index',
      openType: 'navigateBack',
    })

    appRoute.offAppRoute(listener)
    const otherRoute = createRoute('pages/other/other')
    finishRouterRoute(otherRoute, indexRoute)
    appRoute.dispatchWebAppRoute(otherRoute)
    expect(listener).toHaveBeenCalledTimes(3)
  })

  test('does not dispatch switchTab to the current tab', () => {
    const listener = jest.fn()
    const from = createRoute(
      'pages/tab/tab',
      { from: 'launch' },
      { fullPath: '/pages/tab/tab?from=launch' }
    )
    const to = createRoute('pages/tab/tab')
    appRoute.onAppRoute(listener)

    setHistoryOpenType('switchTab')
    finishRouterRoute(to, from)

    expect(listener).not.toHaveBeenCalled()
  })

  test('isolates listener errors from the router dispatch', () => {
    const error = new Error('listener failed')
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const failedListener = jest.fn(() => {
      throw error
    })
    const skippedListener = jest.fn()
    appRoute.onAppRoute(failedListener)
    appRoute.onAppRoute(skippedListener)

    const detailRoute = createRoute('pages/detail/detail')
    finishRouterRoute(detailRoute, createRoute('pages/index/index'))
    expect(() => appRoute.dispatchWebAppRoute(detailRoute)).not.toThrow()

    expect(failedListener).toHaveBeenCalledTimes(1)
    expect(skippedListener).not.toHaveBeenCalled()
    expect(consoleError).toHaveBeenCalledWith(error)
  })

  test('does not dispatch failed routes and clears their openType', () => {
    const listener = jest.fn()
    appRoute.onAppRoute(listener)
    const from = createRoute('pages/index/index')
    const failed = createRoute('pages/failed/failed')

    setHistoryOpenType('reLaunch')
    finishRouterRoute(failed, from, new Error('navigation failed'))

    const next = createRoute('pages/next/next')
    setHistoryOpenType()
    finishRouterRoute(next, from)
    appRoute.dispatchWebAppRoute(next)

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/next/next',
        openType: 'navigateTo',
      })
    )
    appRoute.offAppRoute(listener)
  })

  test('does not dispatch a not-found route after app launch', () => {
    const calls: string[] = []
    const pageNotFoundListener = jest.fn(() => calls.push('onPageNotFound'))
    const listener = jest.fn(() => calls.push('onAppRoute'))
    const from = createRoute('pages/index/index')
    const notFoundRoute = createRoute(
      'pages/missing/missing',
      {},
      { matched: [] }
    )
    appVm.$.onPageNotFound.push(pageNotFoundListener)
    appRoute.onAppRoute(listener)

    routerAfterEach(notFoundRoute, from)

    expect(listener).not.toHaveBeenCalled()
    expect(pageNotFoundListener).not.toHaveBeenCalled()
    expect(calls).toEqual([])
  })

  test('dispatches only the final route after a guard redirect', () => {
    const dateNow = jest.spyOn(Date, 'now').mockReturnValue(100)
    const listener = jest.fn()
    appRoute.onAppRoute(listener)
    const from = createRoute('pages/index/index')
    const original = createRoute('pages/original/original')

    setHistoryOpenType('navigateTo')

    const redirected = createRoute(
      'pages/redirected/redirected',
      {},
      {
        redirectedFrom: original,
      }
    )
    finishRouterRoute(redirected, from)
    expect(listener).not.toHaveBeenCalled()
    appRoute.dispatchWebAppRoute(redirected)

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/redirected/redirected',
        openType: 'navigateTo',
        timeStamp: 100,
      })
    )
    expect(dateNow).toHaveBeenCalledTimes(1)
    appRoute.offAppRoute(listener)
  })

  test('offAppRoute with null removes all listeners', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    appRoute.onAppRoute(listener1)
    appRoute.onAppRoute(listener2)
    appRoute.offAppRoute(null)
    appRoute.dispatchWebAppRoute(createRoute('pages/final/final'))
    expect(listener1).not.toHaveBeenCalled()
    expect(listener2).not.toHaveBeenCalled()
  })

  test('keeps successful navigation openType after another navigation fails', () => {
    const listener = jest.fn()
    appRoute.onAppRoute(listener)
    const from = createRoute('pages/index/index')
    const failed = createRoute('pages/failed/failed')
    const succeeded = createRoute('pages/succeeded/succeeded')

    setHistoryOpenType('switchTab')
    finishRouterRoute(failed, from, new Error('navigation cancelled'))
    finishRouterRoute(succeeded, from)
    appRoute.dispatchWebAppRoute(succeeded)

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/succeeded/succeeded',
        openType: 'switchTab',
      })
    )
  })

  test('does not apply browser history direction to a same-path navigation', () => {
    const listener = jest.fn()
    appRoute.onAppRoute(listener)
    const from = createRoute('pages/index/index')
    const backRoute = createRoute('pages/tab/tab')
    const switchTabRoute = createRoute('pages/tab/tab')

    setHistoryOpenType(undefined, 2)
    appRoute.setWebAppRouteHistoryDirection(backRoute.fullPath, 'back')
    routerBeforeEach(backRoute, from)
    setHistoryOpenType('switchTab', 2)
    finishRouterRoute(switchTabRoute, from)
    appRoute.dispatchWebAppRoute(switchTabRoute)
    finishRouterRoute(backRoute, from, new Error('navigation cancelled'))

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/tab/tab',
        openType: 'switchTab',
      })
    )
  })

  test('keeps browser history direction after a guard redirect', () => {
    const listener = jest.fn()
    appRoute.onAppRoute(listener)
    const from = createRoute('pages/index/index')
    const backRoute = createRoute('pages/back/back')
    const redirected = createRoute(
      'pages/redirected/redirected',
      {},
      { redirectedFrom: backRoute }
    )

    appRoute.setWebAppRouteHistoryDirection(backRoute.fullPath, 'back')
    routerBeforeEach(backRoute, from)
    setHistoryOpenType('navigateTo')
    finishRouterRoute(redirected, from)
    appRoute.dispatchWebAppRoute(redirected)

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'pages/redirected/redirected',
        openType: 'navigateBack',
      })
    )
  })

  test('clears pending history direction when router reports an error', () => {
    const listener = jest.fn()
    appRoute.onAppRoute(listener)
    const failed = createRoute('pages/failed/failed')
    appRoute.setWebAppRouteHistoryDirection(failed.fullPath, 'back')
    routerBeforeEach(failed)
    routerOnError(new Error('guard failed'), failed)

    const from = createRoute('pages/index/index')
    const to = createRoute('pages/next/next')
    setHistoryOpenType('redirectTo')
    finishRouterRoute(to, from)
    appRoute.dispatchWebAppRoute(to)

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ openType: 'redirectTo' })
    )
  })
})
