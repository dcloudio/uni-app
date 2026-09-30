import { parse } from '../src/runtime/parseAppOptions'

const testGlobal = global as any

describe('mp-weixin restart', () => {
  const originalWx = testGlobal.wx

  afterEach(() => {
    testGlobal.wx = originalWx
  })

  test('getApp().restart 映射到 restartMiniProgram 并将 url 转换为 path', () => {
    testGlobal.wx = {
      restartMiniProgram: jest.fn(),
    }
    const appOptions = {} as any
    parse(appOptions)

    appOptions.restart({
      url: '/pages/detail/index?key=value&key2=value2',
    })

    expect(testGlobal.wx.restartMiniProgram).toHaveBeenCalledWith({
      path: '/pages/detail/index?key=value&key2=value2',
    })
  })

  test('无 url 时使用启动页面路径', () => {
    testGlobal.wx = {
      restartMiniProgram: jest.fn(),
      getLaunchOptionsSync: jest.fn(() => ({
        path: 'pages/index/index',
        query: { from: 'launch' },
      })),
    }
    const appOptions = {} as any
    parse(appOptions)

    appOptions.restart()

    expect(testGlobal.wx.restartMiniProgram).toHaveBeenCalledWith({
      path: '/pages/index/index',
    })
  })
})
