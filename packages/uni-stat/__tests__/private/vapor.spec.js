import { createPrivateVaporSink } from '../../src/private/vapor.js'

jest.mock('@dcloudio/uni-app', () => ({
  onAppHide: jest.fn(),
  onAppShow: jest.fn(),
  onError: jest.fn(),
}))

jest.mock('../../src/core/stat.js', () => ({
  __esModule: true,
  default: { getInstance: jest.fn() },
}))

jest.mock('../../src/utils/pageInfo.js', () => ({
  get_platform_name: jest.fn(() => 'wx'),
}))

function createStat() {
  return {
    appHide: jest.fn(),
    appShow: jest.fn(),
    error: jest.fn(),
    hide: jest.fn(),
    launch: jest.fn(),
    load: jest.fn(),
    pushEvent: jest.fn(),
    sendEvent: jest.fn(),
    show: jest.fn(),
  }
}

function route(id, path = 'pages/index/index', query = {}) {
  return {
    path,
    query,
    openType: id === 'launch' ? 'appLaunch' : 'navigateTo',
    routeEventId: id,
  }
}

describe('private vapor sink', () => {
  test('冷启动、首路由和手动事件复用私有版核心且只执行一次', () => {
    const stat = createStat()
    const sink = createPrivateVaporSink(stat)
    const options = { path: 'pages/index/index', scene: 1001 }

    sink.launch(options)
    sink.launch(options)
    sink.show(options)
    sink.show(options)
    sink.route(route('launch', undefined, { source: 'cold start' }))
    sink.route(route('launch', undefined, { source: 'cold start' }))

    expect(stat.launch).toHaveBeenCalledTimes(1)
    expect(stat.pushEvent).toHaveBeenCalledTimes(1)
    expect(stat.appShow).toHaveBeenCalledTimes(1)
    expect(stat.load).toHaveBeenCalledTimes(1)
    expect(stat.show).toHaveBeenCalledTimes(1)
    expect(stat.load.mock.calls[0][0]).toEqual({ source: 'cold start' })
    expect(stat.show.mock.calls[0][0].$page.fullPath).toBe(
      '/pages/index/index?source=cold%20start'
    )
  })

  test('切页在新页展示前只关闭一次旧页', () => {
    const stat = createStat()
    const sink = createPrivateVaporSink(stat)
    sink.launch({})
    sink.show({})
    sink.route(route('launch'))

    const next = route('next', 'pages/order/order', { id: 1 })
    sink.beforeRoute(next)
    sink.beforeRoute(next)
    sink.route(next)
    sink.route(next)

    expect(stat.hide).toHaveBeenCalledTimes(1)
    expect(stat.load).toHaveBeenCalledTimes(2)
    expect(stat.show).toHaveBeenCalledTimes(2)
  })

  test('进入后台立即闭合页面和应用，恢复同页不重复处理路由回调', () => {
    const stat = createStat()
    const sink = createPrivateVaporSink(stat)
    const current = route('launch')
    sink.launch({})
    sink.show({})
    sink.route(current)

    sink.hide()
    sink.hide()
    sink.show({ scene: 1001 })
    sink.show({ scene: 1001 })
    sink.route({ ...current, routeEventId: 'resume' })

    expect(stat.hide).toHaveBeenCalledTimes(1)
    expect(stat.appHide).toHaveBeenCalledTimes(1)
    expect(stat.appShow).toHaveBeenCalledTimes(2)
    expect(stat.show).toHaveBeenCalledTimes(2)
  })

  test('后台路由以最终页面恢复，不补发旧页面 hide', () => {
    const stat = createStat()
    const sink = createPrivateVaporSink(stat)
    sink.launch({})
    sink.show({})
    sink.route(route('launch'))
    sink.hide()
    sink.route(route('background', 'pages/order/order'))
    sink.show({})

    expect(stat.hide).toHaveBeenCalledTimes(1)
    expect(stat.show).toHaveBeenCalledTimes(2)
    expect(stat.show.mock.calls[1][0].route).toBe('pages/order/order')
  })

  test('错误交给私有版错误采集且内部异常不向业务抛出', () => {
    const stat = createStat()
    const sink = createPrivateVaporSink(stat)
    sink.launch({})
    sink.show({})
    sink.route(route('launch'))
    stat.error.mockImplementation(() => {
      throw new Error('stat failure')
    })
    const consoleError = jest.spyOn(console, 'error').mockImplementation()

    expect(() => sink.error(new Error('business failure'))).not.toThrow()
    expect(stat.error).toHaveBeenCalledTimes(1)
    expect(stat.error.mock.calls[0][1].route).toBe('pages/index/index')
    expect(consoleError).toHaveBeenCalledTimes(1)
    consoleError.mockRestore()
  })
})
