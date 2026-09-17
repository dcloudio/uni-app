const mockGetRouteOptions = jest.fn()
const mockNavigateTo = jest.fn()
const mockSwitchTab = jest.fn()
const mockDispatchAppRouteNotFound = jest.fn()
const mockResolveAppRoute = jest.fn()
const mockReLaunch = jest.fn()

jest.mock('@dcloudio/uni-api', () => ({
  API_NAVIGATE_BACK: 'navigateBack',
}))

jest.mock('@dcloudio/uni-core', () => ({
  getRouteOptions: (...args: unknown[]) => mockGetRouteOptions(...args),
}))

jest.mock('@dcloudio/uni-shared', () => ({
  addLeadingSlash: (path: string) => (path.startsWith('/') ? path : `/${path}`),
  parseUrl: (url: string) => {
    const [path, queryString = ''] = url.split('?')
    return {
      path,
      query: Object.fromEntries(new URLSearchParams(queryString)),
    }
  },
}))

jest.mock('../../../../src/x/api/route/navigateTo', () => ({
  $navigateTo: (...args: unknown[]) => mockNavigateTo(...args),
}))

jest.mock('../../../../src/x/api/route/switchTab', () => ({
  $switchTab: (...args: unknown[]) => mockSwitchTab(...args),
}))

jest.mock('../../../../src/x/api/route/appRoute', () => ({
  dispatchAppRouteNotFound: (...args: unknown[]) =>
    mockDispatchAppRouteNotFound(...args),
  resolveAppRoute: (...args: unknown[]) => mockResolveAppRoute(...args),
}))

jest.mock('../../../../src/x/api/route/reLaunch', () => ({
  _reLaunch: (...args: unknown[]) => mockReLaunch(...args),
}))

jest.mock('../../../../src/service/framework/page', () => ({
  getCurrentPages: jest.fn(),
}))

import {
  clearWebviewReady,
  subscribeWebviewReady,
} from '../../../../src/x/framework/app/subscriber/webviewReady'
import { reLaunchEntryPage } from '../../../../src/x/api/route/direct'

describe('app x entry appRoute', () => {
  const oldUniConfig = global.__uniConfig
  const oldUniRoutes = global.__uniRoutes

  beforeEach(() => {
    clearWebviewReady()
    mockGetRouteOptions.mockReset()
    mockNavigateTo.mockReset()
    mockSwitchTab.mockReset()
    mockDispatchAppRouteNotFound.mockReset()
    mockResolveAppRoute.mockImplementation(
      (url: string, _openType: string, notFound: boolean) => ({
        url,
        context: {
          event: { notFound },
        },
      })
    )
    mockReLaunch.mockReset()
    global.__uniConfig = {
      entryPagePath: 'pages/missing/missing',
      entryPageQuery: '?from=launch',
    } as UniApp.UniConfig
    global.__uniRoutes = [{ path: '/pages/index/index' } as UniApp.UniRoute]
  })

  afterAll(() => {
    global.__uniConfig = oldUniConfig
    global.__uniRoutes = oldUniRoutes
  })

  test('入口缺页只派发缺页事件，首页回退不再派发', () => {
    mockGetRouteOptions
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce({ meta: { isTabBar: false } })

    subscribeWebviewReady(undefined, '1')

    expect(mockDispatchAppRouteNotFound).toHaveBeenCalledWith(
      '/pages/missing/missing?from=launch',
      expect.any(Object)
    )
    expect(mockNavigateTo).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/pages/index/index?from=launch' }),
      expect.any(Object),
      'appLaunch',
      false,
      undefined
    )
  })

  test('入口缺页回退到 Tab 时同样不再派发', () => {
    mockGetRouteOptions
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce({ meta: { isTabBar: true } })

    subscribeWebviewReady(undefined, '1')

    expect(mockSwitchTab).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/pages/index/index?from=launch' }),
      expect.any(Object),
      'appLaunch',
      false,
      undefined
    )
  })

  test('直达页面返回使用 navigateBack', () => {
    global.__uniConfig.realEntryPagePath = 'pages/index/index'

    reLaunchEntryPage()

    expect(mockReLaunch).toHaveBeenCalledWith(
      {
        url: '/pages/index/index',
        path: '/pages/index/index',
        query: {},
      },
      'navigateBack'
    )
  })
})
