import { initUni } from '@dcloudio/uni-mp-core'

import * as protocols from '../src/api/protocols'

declare global {
  // eslint-disable-next-line no-var
  var my: any
}

describe('mp-weixin app route', () => {
  const originalGlobal = (global as any).__GLOBAL__
  const originalPlatform = (global as any).__PLATFORM__
  const originalX = global.__X__
  const originalMy = global.my

  afterEach(() => {
    ;(global as any).__GLOBAL__ = originalGlobal
    ;(global as any).__PLATFORM__ = originalPlatform
    global.__X__ = originalX
    global.my = originalMy
  })

  test('直接透传微信路由前置事件并保持 on/off 回调引用一致', () => {
    const platform = {
      onBeforeAppRoute: jest.fn(),
      offBeforeAppRoute: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = platform
    ;(global as any).__PLATFORM__ = 'mp-weixin'
    global.__X__ = true
    global.my = { canIUse: () => false }

    const uniApi = initUni({}, protocols, platform)
    const listener = jest.fn()
    uniApi.onBeforeAppRoute(listener)
    uniApi.offBeforeAppRoute(listener)

    const onCallback = platform.onBeforeAppRoute.mock.calls[0][0]
    const offCallback = platform.offBeforeAppRoute.mock.calls[0][0]
    expect(onCallback).not.toBe(listener)
    expect(offCallback).toBe(onCallback)

    const event = {
      path: 'pages/detail/index',
      query: { from: 'test' },
      openType: 'navigateTo',
      notFound: false,
      routeEventId: 'route-1',
    }
    onCallback(event)
    expect(listener).toHaveBeenCalledWith(event)
  })

  test('无参 offBeforeAppRoute 保持微信原始清空语义', () => {
    const platform = {
      onBeforeAppRoute: jest.fn(),
      offBeforeAppRoute: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = platform
    ;(global as any).__PLATFORM__ = 'mp-weixin'
    global.__X__ = true
    global.my = { canIUse: () => false }

    const uniApi = initUni({}, protocols, platform)
    uniApi.offBeforeAppRoute()

    expect(platform.offBeforeAppRoute).toHaveBeenCalledWith(undefined)
  })

  test('直接透传 rewriteRoute 参数及结果', () => {
    const platform = {
      rewriteRoute: jest.fn((options) => {
        options.success({ errMsg: 'rewriteRoute:ok' })
      }),
    }
    ;(global as any).__GLOBAL__ = platform
    ;(global as any).__PLATFORM__ = 'mp-weixin'
    global.__X__ = true
    global.my = { canIUse: () => false }

    const uniApi = initUni({}, protocols, platform)
    const success = jest.fn()
    uniApi.rewriteRoute({
      url: '/pages/detail/index?from=rewrite',
      preserveQuery: true,
      success,
    })

    expect(platform.rewriteRoute).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/pages/detail/index?from=rewrite',
        preserveQuery: true,
        success: expect.any(Function),
      })
    )
    expect(success).toHaveBeenCalledWith({ errMsg: 'rewriteRoute:ok' })
  })
})
