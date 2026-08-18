const mockRemoveLastPage = jest.fn()
const mockRemoveAllPages = jest.fn()
const mockRemoveNonTabBarPages = jest.fn()
const mockRemovePage = jest.fn()
const mockGetCurrentBasePages = jest.fn()

jest.mock('@dcloudio/uni-api', () => ({
  API_NAVIGATE_BACK: 'navigateBack',
  API_REDIRECT_TO: 'redirectTo',
  API_RE_LAUNCH: 'reLaunch',
  API_SWITCH_TAB: 'switchTab',
}))

jest.mock('../src/service/api/route/redirectTo', () => ({
  removeLastPage: () => mockRemoveLastPage(),
}))

jest.mock('../src/service/api/route/reLaunch', () => ({
  removeAllPages: () => mockRemoveAllPages(),
}))

jest.mock('../src/service/api/route/switchTab', () => ({
  removeNonTabBarPages: (pageId?: number) => mockRemoveNonTabBarPages(pageId),
}))

jest.mock('../src/framework/setup/page', () => ({
  getCurrentBasePages: () => mockGetCurrentBasePages(),
  getPage$BasePage: (page: any) => page.$basePage,
  normalizeRouteKey: (path: string, id: number) => `${path}:${id}`,
  removePage: (...args: unknown[]) => mockRemovePage(...args),
}))

jest.mock('../src/service/api/route/appRoute', () => ({
  initWebAppRouteListener: jest.fn(),
  setWebAppRouteHistoryDirection: jest.fn(),
}))

jest.mock('../src/service/api/route/utils', () => ({
  handleBeforeEntryPageRoutes: jest.fn(),
}))

jest.mock('../src/service/api/ui/popup/showActionSheet', () => ({
  hideActionSheet: jest.fn(),
}))

jest.mock('../src/service/api/ui/popup/showModal', () => ({
  hideModal: jest.fn(),
}))

import { cleanupWebAppRoute } from '../src/framework/plugin/router'

function createPage(id: number) {
  return {
    $basePage: {
      id,
      path: `/pages/page-${id}/page-${id}`,
    },
  }
}

function createTransaction(
  openType:
    | 'navigateTo'
    | 'navigateBack'
    | 'redirectTo'
    | 'reLaunch'
    | 'switchTab'
) {
  return {
    finalFullPath: '/pages/target/target',
    openType,
  }
}

describe('web x route cleanup', () => {
  beforeEach(() => {
    mockRemoveLastPage.mockReset()
    mockRemoveAllPages.mockReset()
    mockRemoveNonTabBarPages.mockReset()
    mockRemovePage.mockReset()
    mockGetCurrentBasePages.mockReset().mockReturnValue([])
  })

  test('按 openType 执行对应页面栈清理', () => {
    cleanupWebAppRoute(createTransaction('redirectTo'))
    cleanupWebAppRoute(createTransaction('reLaunch'))
    cleanupWebAppRoute({
      ...createTransaction('switchTab'),
      pageId: 9,
    })
    cleanupWebAppRoute(createTransaction('navigateTo'))

    expect(mockRemoveLastPage).toHaveBeenCalledTimes(1)
    expect(mockRemoveAllPages).toHaveBeenCalledTimes(1)
    expect(mockRemoveNonTabBarPages).toHaveBeenCalledWith(9)
    expect(mockRemovePage).not.toHaveBeenCalled()
  })

  test('navigateBack 按 delta 从栈顶清理页面', () => {
    mockGetCurrentBasePages.mockReturnValue([
      createPage(1),
      createPage(2),
      createPage(3),
    ])

    cleanupWebAppRoute({
      ...createTransaction('navigateBack'),
      delta: 2,
    })

    expect(mockRemovePage.mock.calls).toEqual([
      ['/pages/page-3/page-3:3', false],
      ['/pages/page-2/page-2:2', false],
    ])
  })
})
