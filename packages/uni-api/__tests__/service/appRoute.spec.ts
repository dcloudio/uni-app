import {
  type AppRouteEvent,
  createAppRouteRuntime,
} from '../../src/service/route/appRoute'

function createRouteEvent(
  openType: AppRouteEvent['openType'] = 'navigateTo'
): AppRouteEvent {
  return {
    path: 'pages/index/index',
    query: { from: 'test' },
    openType,
    timeStamp: 1,
    routeEventId: '1',
    notFound: false,
  }
}

describe('app route runtime', () => {
  const bridge = UniServiceJSBridge as any
  const oldOn = bridge.on
  const oldOff = bridge.off
  const oldInvokeOnCallback = bridge.invokeOnCallback
  const bridgeListeners: Record<string, Function> = {}

  beforeAll(() => {
    bridge.on = (name: string, callback: Function) => {
      bridgeListeners[name] = callback
    }
    bridge.off = (name: string) => {
      delete bridgeListeners[name]
    }
    bridge.invokeOnCallback = (name: string, event: unknown) => {
      bridgeListeners[`api.${name}`]?.(event)
    }
  })

  afterAll(() => {
    bridge.on = oldOn
    bridge.off = oldOff
    bridge.invokeOnCallback = oldInvokeOnCallback
  })

  afterEach(() => {
    const runtime = createAppRouteRuntime()
    runtime.offAppRoute()
    runtime.offBeforeAppRoute()
  })

  test('registers and removes route listeners', () => {
    const runtime = createAppRouteRuntime()
    const event = createRouteEvent('switchTab')
    const listener = jest.fn()

    runtime.onAppRoute(listener)
    runtime.onAppRoute(listener)
    runtime.dispatchAppRoute(runtime.createAppRouteContext(event))
    expect(listener).toHaveBeenCalledWith(event)
    expect(listener).toHaveBeenCalledTimes(2)

    runtime.offAppRoute(listener)
    runtime.dispatchAppRoute(runtime.createAppRouteContext(event))
    expect(listener).toHaveBeenCalledTimes(2)
  })

  test('shares the event transport between runtimes', () => {
    const runtime1 = createAppRouteRuntime()
    const runtime2 = createAppRouteRuntime()
    const listener1 = jest.fn()
    const listener2 = jest.fn()

    runtime1.onAppRoute(listener1)
    runtime2.onAppRoute(listener2)
    runtime2.dispatchAppRoute(
      runtime2.createAppRouteContext(createRouteEvent())
    )

    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
    runtime1.offAppRoute(listener1)
    runtime2.offAppRoute(listener2)
  })

  test('removes all listeners when callback is omitted or null', () => {
    const runtime = createAppRouteRuntime()
    const listener1 = jest.fn()
    const listener2 = jest.fn()

    runtime.onAppRoute(listener1)
    runtime.onAppRoute(listener2)
    runtime.offAppRoute()
    runtime.dispatchAppRoute(runtime.createAppRouteContext(createRouteEvent()))
    expect(listener1).not.toHaveBeenCalled()
    expect(listener2).not.toHaveBeenCalled()

    runtime.onAppRoute(listener1)
    runtime.onAppRoute(listener2)
    runtime.offAppRoute(null)
    runtime.dispatchAppRoute(runtime.createAppRouteContext(createRouteEvent()))
    expect(listener1).not.toHaveBeenCalled()
    expect(listener2).not.toHaveBeenCalled()
  })

  test('isolates the route context from event mutations', () => {
    const runtime = createAppRouteRuntime()
    const context = runtime.createAppRouteContext(createRouteEvent())

    runtime.onAppRoute((event) => {
      event.path = 'pages/changed/index'
      event.query.from = 'changed'
    })
    runtime.dispatchAppRoute(context)

    expect(context.event).toEqual(createRouteEvent())
    runtime.offAppRoute()
  })

  test('isolates listener errors from the route flow', () => {
    const runtime = createAppRouteRuntime()
    const error = new Error('listener failed')
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const skippedListener = jest.fn()

    runtime.onAppRoute(() => {
      throw error
    })
    runtime.onAppRoute(skippedListener)

    expect(() =>
      runtime.dispatchAppRoute(
        runtime.createAppRouteContext(createRouteEvent())
      )
    ).not.toThrow()
    expect(skippedListener).not.toHaveBeenCalled()
    expect(consoleError).toHaveBeenCalledWith(error)
    runtime.offAppRoute()
    consoleError.mockRestore()
  })

  test('dispatches before route without timeStamp and reuses event identity', () => {
    const runtime = createAppRouteRuntime()
    const beforeListener = jest.fn()
    const routeListener = jest.fn()
    const context = runtime.createAppRouteContext(createRouteEvent())

    runtime.onBeforeAppRoute(beforeListener)
    runtime.onAppRoute(routeListener)
    runtime.dispatchBeforeAppRoute(context)
    runtime.dispatchAppRoute(context)

    expect(beforeListener).toHaveBeenCalledWith({
      path: context.event.path,
      query: context.event.query,
      openType: context.event.openType,
      routeEventId: context.event.routeEventId,
      notFound: false,
    })
    expect(beforeListener.mock.calls[0][0]).not.toHaveProperty('timeStamp')
    expect(routeListener.mock.calls[0][0]).toEqual(context.event)
  })

  test('removes one or all before route listeners', () => {
    const runtime = createAppRouteRuntime()
    const listener1 = jest.fn()
    const listener2 = jest.fn()

    runtime.onBeforeAppRoute(listener1)
    runtime.onBeforeAppRoute(listener2)
    runtime.offBeforeAppRoute(listener1)
    runtime.dispatchBeforeAppRoute(
      runtime.createAppRouteContext(createRouteEvent())
    )
    expect(listener1).not.toHaveBeenCalled()
    expect(listener2).toHaveBeenCalledTimes(1)

    runtime.offBeforeAppRoute()
    runtime.dispatchBeforeAppRoute(
      runtime.createAppRouteContext(createRouteEvent())
    )
    expect(listener2).toHaveBeenCalledTimes(1)
  })

  test('allows one synchronous rewrite per route event', () => {
    const normalizeRewriteRoute = jest.fn(({ url }) => ({
      url,
      path: url.slice(1),
      query: {},
      notFound: false,
    }))
    const runtime = createAppRouteRuntime({ normalizeRewriteRoute })
    const secondFail = jest.fn()

    runtime.onBeforeAppRoute(() => {
      runtime.rewriteRoute({ url: '/pages/first/first' })
      runtime.rewriteRoute({
        url: '/pages/second/second',
        fail: secondFail,
      })
    })
    const context = runtime.createAppRouteContext(createRouteEvent())

    expect(runtime.dispatchBeforeAppRoute(context)).toEqual({
      url: '/pages/first/first',
      path: 'pages/first/first',
      query: {},
      notFound: false,
    })
    expect(normalizeRewriteRoute).toHaveBeenCalledTimes(1)
    expect(secondFail).toHaveBeenCalledWith(
      expect.objectContaining({
        errMsg:
          'rewriteRoute:fail rewriteRoute can only be called once in a route event, this page has been rewritten to "pages/first/first"',
      })
    )
  })

  test('rejects rewrite outside the synchronous before route callback', async () => {
    const runtime = createAppRouteRuntime({
      normalizeRewriteRoute: jest.fn(),
    })
    let asyncRewrite: Promise<unknown> | undefined

    runtime.onBeforeAppRoute(() => {
      asyncRewrite = Promise.resolve().then(
        () => runtime.rewriteRoute({ url: '/pages/next/next' }) as any
      )
    })
    runtime.dispatchBeforeAppRoute(
      runtime.createAppRouteContext(createRouteEvent())
    )

    await expect(asyncRewrite).rejects.toEqual(
      expect.objectContaining({
        errMsg:
          'rewriteRoute:fail rewriteRoute is only allowed in a onBeforeAppRoute callback',
      })
    )
    await expect(
      runtime.rewriteRoute({ url: '/pages/next/next' }) as any
    ).rejects.toEqual(
      expect.objectContaining({
        errMsg:
          'rewriteRoute:fail rewriteRoute is only allowed in a onBeforeAppRoute callback',
      })
    )
  })

  test('rejects rewriting navigateBack', () => {
    const runtime = createAppRouteRuntime({
      normalizeRewriteRoute: jest.fn(),
    })
    const fail = jest.fn()

    runtime.onBeforeAppRoute(() => {
      runtime.rewriteRoute({ url: '/pages/next/next', fail })
    })
    const context = runtime.createAppRouteContext(
      createRouteEvent('navigateBack')
    )

    expect(runtime.dispatchBeforeAppRoute(context)).toBeUndefined()
    expect(fail).toHaveBeenCalledWith(
      expect.objectContaining({
        errMsg:
          'rewriteRoute:fail a "navigateBack" event is not allowed to be rewritten',
      })
    )
  })

  test('rejects an excessive synchronous rewrite chain', () => {
    const runtime = createAppRouteRuntime({
      normalizeRewriteRoute: ({ url }) => ({
        url,
        path: url.slice(1),
        query: {},
        notFound: false,
      }),
    })
    const fail = jest.fn()
    runtime.onBeforeAppRoute(() => {
      runtime.rewriteRoute({ url: '/pages/next/next', fail })
    })
    const context = runtime.createAppRouteContext(createRouteEvent())
    context.rewriteCount = 100

    expect(runtime.dispatchBeforeAppRoute(context)).toBeUndefined()
    expect(fail).toHaveBeenCalledWith(
      expect.objectContaining({
        errMsg:
          'rewriteRoute:fail rewriteRoute exceeded the maximum rewrite count of 100',
      })
    )
  })

  test('restores the outer context after nested before route dispatch', () => {
    const runtime = createAppRouteRuntime({
      normalizeRewriteRoute: ({ url }) => ({
        url,
        path: url.slice(1),
        query: {},
        notFound: false,
      }),
    })
    const innerContext = runtime.createAppRouteContext({
      ...createRouteEvent(),
      path: 'pages/inner/inner',
    })

    runtime.onBeforeAppRoute((event) => {
      if (event.path === 'pages/index/index') {
        runtime.dispatchBeforeAppRoute(innerContext)
        runtime.rewriteRoute({ url: '/pages/outer/outer' })
      } else {
        runtime.rewriteRoute({ url: '/pages/inner-rewrite/inner-rewrite' })
      }
    })
    const outerContext = runtime.createAppRouteContext(createRouteEvent())

    expect(runtime.dispatchBeforeAppRoute(outerContext)?.path).toBe(
      'pages/outer/outer'
    )
    expect(innerContext.rewrite?.path).toBe('pages/inner-rewrite/inner-rewrite')
  })
})
