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
})
