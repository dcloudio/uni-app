import { onAppHide, onAppShow, onError } from '@dcloudio/uni-app'

import {
  handleAppHide,
  handleAppShow,
  handleError,
  handleLaunch,
  handlePageHide,
  handlePageShow,
} from '../../../src/public/runtime/lifecycleHooks'
import {
  __resetVaporStat,
  createVaporSink,
  vaporStat,
} from '../../../src/public/runtime/vapor'
import { logger } from '../../../src/public/infra/logger'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

import type { StatApp } from '../../../src/public/runtime/StatApp'

jest.mock('../../../src/public/runtime/lifecycleHooks', () => ({
  handleAppHide: jest.fn(),
  handleAppShow: jest.fn(),
  handleError: jest.fn(),
  handleLaunch: jest.fn(),
  handlePageHide: jest.fn(),
  handlePageShow: jest.fn(),
}))

jest.mock('@dcloudio/uni-app', () => ({
  onAppHide: jest.fn(),
  onAppShow: jest.fn(),
  onError: jest.fn(),
}))

const mockedLaunch = handleLaunch as jest.MockedFunction<typeof handleLaunch>
const mockedShow = handleAppShow as jest.MockedFunction<typeof handleAppShow>
const mockedHide = handleAppHide as jest.MockedFunction<typeof handleAppHide>
const mockedError = handleError as jest.MockedFunction<typeof handleError>
const mockedPageShow = handlePageShow as jest.MockedFunction<
  typeof handlePageShow
>
const mockedPageHide = handlePageHide as jest.MockedFunction<
  typeof handlePageHide
>
const mockedOnAppShow = onAppShow as jest.MockedFunction<typeof onAppShow>
const mockedOnAppHide = onAppHide as jest.MockedFunction<typeof onAppHide>
const mockedOnError = onError as jest.MockedFunction<typeof onError>

function createApp(): StatApp {
  return {
    getConfig: () => ({ enablePush: true, enablePageLog: true }),
    releaseDeferredReports: jest.fn(),
  } as unknown as StatApp
}

function route(
  id: string,
  timeStamp: number,
  query: Record<string, unknown> = {},
  path = 'pages/index/index'
) {
  return {
    path,
    query,
    openType: 'navigateTo',
    timeStamp,
    routeEventId: id,
    notFound: false,
  }
}

describe('runtime/vapor', () => {
  beforeEach(() => jest.clearAllMocks())

  test('install 仅通过运行时 onBeforeAppRoute 完成应用生命周期绕过注册', () => {
    let beforeRoute: ((event: ReturnType<typeof route>) => void) | undefined
    let appRoute: ((event: ReturnType<typeof route>) => void) | undefined
    let appShow: Parameters<typeof onAppShow>[0] | undefined
    let appHide: Parameters<typeof onAppHide>[0] | undefined
    let appError: Parameters<typeof onError>[0] | undefined
    installMockUni({
      platform: 'app',
      patch: {
        onBeforeAppRoute: (callback: typeof beforeRoute) => {
          beforeRoute = callback
        },
        offBeforeAppRoute: jest.fn(),
        onAppRoute: (callback: typeof appRoute) => {
          appRoute = callback
        },
        offAppRoute: jest.fn(),
        getLaunchOptionsSync: () => ({
          path: 'pages/index/index',
          scene: 1001,
        }),
      },
    })
    mockedOnAppShow.mockImplementation((callback) => {
      appShow = callback
    })
    mockedOnAppHide.mockImplementation((callback) => {
      appHide = callback
    })
    mockedOnError.mockImplementation((callback) => {
      appError = callback
    })

    try {
      vaporStat.install()
      expect(beforeRoute).toBeDefined()
      expect(appRoute).toBeDefined()
      expect(mockedLaunch).not.toHaveBeenCalled()

      beforeRoute!(route('launch', 1_000))
      expect(mockedLaunch).toHaveBeenCalledTimes(1)
      expect(mockedShow).toHaveBeenCalledTimes(1)
      expect(appShow).toBeDefined()
      expect(appHide).toBeDefined()
      expect(appError).toBeDefined()

      appHide!()
      appShow!({
        path: 'pages/index/index',
        query: {},
        scene: 1001,
        shareTicket: '',
      })
      appError!('expected')
      expect(mockedShow).toHaveBeenCalledTimes(2)
      expect(mockedHide).toHaveBeenCalledTimes(1)
      expect(mockedError).toHaveBeenCalledTimes(1)
    } finally {
      __resetVaporStat()
      restoreMockUni()
    }
  })

  test('生命周期 API 不可用时只提示一次且不抛错', () => {
    const warn = jest.spyOn(logger, 'warn').mockImplementation(() => {})
    installMockUni({
      platform: 'app',
      patch: { onBeforeAppRoute: undefined, onAppRoute: undefined },
    })

    try {
      expect(() => vaporStat.install()).not.toThrow()
      expect(() => vaporStat.install()).not.toThrow()
      expect(warn).toHaveBeenCalledTimes(2)
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('uni.onBeforeAppRoute 不可用')
      )
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('uni.onAppRoute 不可用')
      )
    } finally {
      __resetVaporStat()
      restoreMockUni()
      warn.mockRestore()
    }
  })

  test('生命周期 API 注册抛错时提示且不标记为已绑定', () => {
    const warn = jest.spyOn(logger, 'warn').mockImplementation(() => {})
    installMockUni({
      platform: 'app',
      patch: {
        onBeforeAppRoute: () => {
          throw new Error('before expected')
        },
        onAppRoute: () => {
          throw new Error('route expected')
        },
      },
    })

    try {
      expect(() => vaporStat.install()).not.toThrow()
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('uni.onBeforeAppRoute 注册失败'),
        expect.any(Error)
      )
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('uni.onAppRoute 注册失败'),
        expect.any(Error)
      )
    } finally {
      __resetVaporStat()
      restoreMockUni()
      warn.mockRestore()
    }
  })

  test('生命周期初始化失败时提示且不影响框架路由回调', () => {
    let beforeRoute: ((event: ReturnType<typeof route>) => void) | undefined
    const warn = jest.spyOn(logger, 'warn').mockImplementation(() => {})
    installMockUni({
      platform: 'app',
      patch: {
        onBeforeAppRoute: (callback: typeof beforeRoute) => {
          beforeRoute = callback
        },
        onAppRoute: jest.fn(),
        getLaunchOptionsSync: () => ({ path: 'pages/index/index' }),
      },
    })
    mockedOnAppShow.mockImplementation(() => {
      throw new Error('expected')
    })

    try {
      vaporStat.install()
      expect(() => beforeRoute!(route('launch', 1_000))).not.toThrow()
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('应用生命周期初始化失败'),
        expect.any(Error)
      )
    } finally {
      __resetVaporStat()
      restoreMockUni()
      warn.mockRestore()
    }
  })

  test('onLaunch 前乱序事件按 launch -> show -> route 接入核心', () => {
    const app = createApp()
    const sink = createVaporSink(app)
    sink.route(route('r1', 1_000))
    sink.show({ path: 'pages/index/index' }, 1_100)

    expect(mockedShow).not.toHaveBeenCalled()
    expect(mockedPageShow).not.toHaveBeenCalled()

    sink.launch({ path: 'pages/index/index' }, 900)

    expect(mockedLaunch).toHaveBeenCalledWith(
      app,
      { path: 'pages/index/index' },
      expect.any(Object),
      0
    )
    expect(mockedShow).toHaveBeenCalledWith(
      app,
      expect.objectContaining({ path: 'pages/index/index' }),
      expect.any(Object),
      1,
      true
    )
    expect(mockedPageShow).toHaveBeenCalledWith(
      app,
      expect.objectContaining({ route: 'pages/index/index' }),
      expect.any(Object),
      1
    )
    expect(mockedLaunch.mock.invocationCallOrder[0]).toBeLessThan(
      mockedShow.mock.invocationCallOrder[0]
    )
    expect(mockedShow.mock.invocationCallOrder[0]).toBeLessThan(
      mockedPageShow.mock.invocationCallOrder[0]
    )
    expect(app.releaseDeferredReports).toHaveBeenCalledTimes(1)
  })

  test('普通路由先收尾旧页，再按 route timeStamp 开始新页', () => {
    const sink = createVaporSink(createApp())
    sink.launch({}, 1_000)
    sink.show({}, 1_100)
    sink.route(route('r1', 1_200))
    jest.clearAllMocks()

    sink.route(route('r2', 8_900, { id: 2 }, 'pages/detail/detail'))

    expect(mockedPageHide).toHaveBeenCalledTimes(1)
    expect(mockedPageShow).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        route: 'pages/detail/detail',
        $page: expect.objectContaining({
          fullPath: 'pages/detail/detail?id=2',
        }),
      }),
      expect.any(Object),
      8
    )
    expect(mockedPageHide.mock.invocationCallOrder[0]).toBeLessThan(
      mockedPageShow.mock.invocationCallOrder[0]
    )
  })

  test('H5 fullPath 对齐公有版的前导斜杠与 query 编码', () => {
    installMockUni({ platform: 'h5' })
    const sink = createVaporSink(createApp())

    try {
      sink.launch({}, 1_000)
      sink.show({}, 1_100)
      sink.route(
        route(
          'r1',
          1_200,
          { name: '订单 A', symbol: '&=' },
          'pages/detail/detail'
        )
      )

      expect(mockedPageShow).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          route: 'pages/detail/detail',
          $page: expect.objectContaining({
            route: 'pages/detail/detail',
            fullPath:
              '/pages/detail/detail?name=%25E8%25AE%25A2%25E5%258D%2595%2520A&symbol=%2526%253D',
          }),
        }),
        expect.any(Object),
        1
      )
    } finally {
      restoreMockUni()
    }
  })

  test('微信小程序 fullPath 对齐公有版的前导斜杠', () => {
    installMockUni({ platform: 'mp-weixin' })
    const sink = createVaporSink(createApp())

    try {
      sink.launch({}, 1_000)
      sink.show({}, 1_100)
      sink.route(route('r1', 1_200, { space: 'a b' }, 'pages/detail/detail'))

      expect(mockedPageShow).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          route: 'pages/detail/detail',
          $page: expect.objectContaining({
            fullPath: '/pages/detail/detail?space=a%20b',
          }),
        }),
        expect.any(Object),
        1
      )
    } finally {
      restoreMockUni()
    }
  })

  test('App fullPath 保持无前导斜杠', () => {
    installMockUni({ platform: 'app' })
    const sink = createVaporSink(createApp())

    try {
      sink.launch({}, 1_000)
      sink.show({}, 1_100)
      sink.route(route('r1', 1_200, {}, 'pages/detail/detail'))

      expect(mockedPageShow).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          $page: expect.objectContaining({
            fullPath: 'pages/detail/detail',
          }),
        }),
        expect.any(Object),
        1
      )
    } finally {
      restoreMockUni()
    }
  })

  test('onBeforeAppRoute 提前收尾旧页，onAppRoute 不重复收尾', () => {
    const sink = createVaporSink(createApp())
    sink.launch({}, 1_000)
    sink.show({}, 1_100)
    sink.route(route('r1', 1_200))
    jest.clearAllMocks()

    const nextRoute = route('r2', 8_900, { id: 2 }, 'pages/detail/detail')
    sink.beforeRoute(nextRoute)
    expect(mockedPageHide).toHaveBeenCalledTimes(1)
    expect(mockedPageShow).not.toHaveBeenCalled()

    sink.beforeRoute(nextRoute)
    sink.route(nextRoute)
    expect(mockedPageHide).toHaveBeenCalledTimes(1)
    expect(mockedPageShow).toHaveBeenCalledTimes(1)
    expect(mockedPageHide.mock.invocationCallOrder[0]).toBeLessThan(
      mockedPageShow.mock.invocationCallOrder[0]
    )
  })

  test('进入后台立即闭合页面，恢复同页重新开始且按 before/route 顺序去重', () => {
    const sink = createVaporSink(createApp())
    sink.launch({}, 1_000)
    sink.show({}, 1_100)
    sink.route(route('r1', 1_200, { from: 'a&next=b' }))
    jest.clearAllMocks()

    sink.hide(5_500)
    expect(mockedPageHide).toHaveBeenCalledTimes(1)
    expect(mockedHide).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Object),
      5
    )

    sink.show({ path: 'pages/index/index' }, 6_000)
    expect(mockedShow).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.any(Object),
      6,
      true
    )
    expect(mockedPageShow).toHaveBeenCalledTimes(1)
    expect(mockedPageHide).toHaveBeenCalledTimes(1)

    // 即使 route 很晚才到，只要没有对应 before，仍视为恢复回声而非新页面。
    sink.route(route('r2', 60_000, { from: 'a&next=b' }))
    expect(mockedPageShow).toHaveBeenCalledTimes(1)

    // 同路径真实导航会先收到 before，不能被恢复去重吞掉。
    const next = route('r3', 60_100, { from: 'a&next=b' })
    sink.beforeRoute(next)
    sink.route(next)
    expect(mockedPageShow).toHaveBeenCalledTimes(2)
  })

  test('后台多个路由只在 show 时开始最终有效页', () => {
    const sink = createVaporSink(createApp())
    sink.launch({}, 1_000)
    sink.show({}, 1_100)
    sink.route(route('r1', 1_200))
    sink.hide(2_000)
    jest.clearAllMocks()

    sink.route(route('r2', 3_000, {}, 'pages/middle/middle'))
    sink.route(route('r3', 4_000, { id: 3 }, 'pages/detail/detail'))
    expect(mockedPageShow).not.toHaveBeenCalled()

    sink.show({}, 5_000)
    expect(mockedPageShow).toHaveBeenCalledTimes(1)
    expect(mockedPageHide).not.toHaveBeenCalled()
    expect(mockedPageShow).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        route: 'pages/detail/detail',
        $page: expect.objectContaining({
          fullPath: 'pages/detail/detail?id=3',
        }),
      }),
      expect.any(Object),
      5
    )
  })

  test('routeEventId 去重、notFound 忽略，重复应用事件不进入核心', () => {
    const sink = createVaporSink(createApp())
    sink.launch({}, 1_000)
    sink.launch({}, 1_100)
    sink.show({}, 1_200)
    sink.show({}, 1_300)

    sink.route(route('same', 1_400))
    sink.route(route('same', 1_500, {}, 'pages/detail/detail'))
    sink.route({ ...route('missing', 1_600), notFound: true })
    sink.hide(2_000)
    sink.hide(2_100)

    expect(mockedLaunch).toHaveBeenCalledTimes(1)
    expect(mockedShow).toHaveBeenCalledTimes(1)
    expect(mockedPageShow).toHaveBeenCalledTimes(1)
    expect(mockedHide).toHaveBeenCalledTimes(1)
  })

  test('onLaunch 前错误保留原时间并在 launch 后处理', () => {
    const sink = createVaporSink(createApp())
    const error = new Error('expected')
    sink.error(error, 2_900)
    expect(mockedError).not.toHaveBeenCalled()

    sink.launch({}, 5_000)
    expect(mockedError).toHaveBeenCalledWith(expect.anything(), error, 2, false)
  })
})
