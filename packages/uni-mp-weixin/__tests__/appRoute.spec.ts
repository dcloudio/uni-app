import { initUni } from '@dcloudio/uni-mp-core'

import * as protocols from '../src/api/protocols'

const testGlobal = global as any

describe('mp-weixin app route', () => {
  const originalGlobal = testGlobal.__GLOBAL__
  const originalPlatform = testGlobal.__PLATFORM__
  const originalX = global.__X__
  const originalMy = testGlobal.my

  afterEach(() => {
    testGlobal.__GLOBAL__ = originalGlobal
    testGlobal.__PLATFORM__ = originalPlatform
    global.__X__ = originalX
    testGlobal.my = originalMy
  })

  test('直接透传微信路由前置事件并保持 on/off 回调引用一致', () => {
    const platform = {
      onBeforeAppRoute: jest.fn(),
      offBeforeAppRoute: jest.fn(),
    }
    testGlobal.__GLOBAL__ = platform
    testGlobal.__PLATFORM__ = 'mp-weixin'
    global.__X__ = true
    testGlobal.my = { canIUse: () => false }

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
    testGlobal.__GLOBAL__ = platform
    testGlobal.__PLATFORM__ = 'mp-weixin'
    global.__X__ = true
    testGlobal.my = { canIUse: () => false }

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
    testGlobal.__GLOBAL__ = platform
    testGlobal.__PLATFORM__ = 'mp-weixin'
    global.__X__ = true
    testGlobal.my = { canIUse: () => false }

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
