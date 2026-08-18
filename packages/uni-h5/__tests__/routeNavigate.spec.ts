const mockCreatePageState = jest.fn()
const mockGetCurrentBasePages = jest.fn()
const mockGetCurrentPagesMap = jest.fn()
const mockGetPage$BasePage = jest.fn((page) => page.$basePage)
const mockResolveAppRoute = jest.fn()
const mockCreateWebAppRouteTransaction = jest.fn()
const mockQueueWebAppRouteTransaction = jest.fn()
const mockDiscardWebAppRouteTransaction = jest.fn()

jest.mock('../src/framework/setup/page', () => ({
  createPageState: (...args: unknown[]) => mockCreatePageState(...args),
  entryPageState: { handledBeforeEntryPageRoutes: true },
  getCurrentBasePages: () => mockGetCurrentBasePages(),
  getCurrentPagesMap: () => mockGetCurrentPagesMap(),
  getPage$BasePage: (page: unknown) => mockGetPage$BasePage(page),
  navigateToPagesBeforeEntryPages: [],
  reLaunchPagesBeforeEntryPages: [],
  redirectToPagesBeforeEntryPages: [],
  switchTabPagesBeforeEntryPages: [],
}))

jest.mock('../src/service/api/route/switchTab', () => ({
  getTabBarPageId: jest.fn(),
  removeNonTabBarPages: jest.fn(),
}))

jest.mock('../src/service/api/route/redirectTo', () => ({
  removeLastPage: jest.fn(),
}))

jest.mock('../src/service/api/route/reLaunch', () => ({
  removeAllPages: jest.fn(),
}))

jest.mock('../src/service/api/route/appRoute', () => ({
  createWebAppRouteTransaction: (...args: unknown[]) =>
    mockCreateWebAppRouteTransaction(...args),
  discardWebAppRouteTransaction: (...args: unknown[]) =>
    mockDiscardWebAppRouteTransaction(...args),
  queueWebAppRouteTransaction: (...args: unknown[]) =>
    mockQueueWebAppRouteTransaction(...args),
  resolveAppRoute: (...args: unknown[]) => mockResolveAppRoute(...args),
}))

import { navigate } from '../src/service/api/route/utils'

function createTabBarPage(id: number, path: string, active: boolean) {
  return {
    $: {
      __isActive: active,
      __isTabBar: true,
    },
    $basePage: {
      id,
      path,
      meta: { isEntry: false },
    },
  }
}

describe('web x route navigate', () => {
  const oldX = global.__X__
  const oldGetApp = (global as any).getApp
  const router = {
    currentRoute: {
      value: { meta: {} as Record<string, unknown> },
    },
    push: jest.fn(),
    replace: jest.fn(),
    resolve: jest.fn(
      ({ path, query }: { path: string; query?: Record<string, any> }) => {
        const search = new URLSearchParams(query).toString()
        return {
          fullPath: path + (search ? `?${search}` : ''),
          meta: { tabBarText: path },
        }
      }
    ),
  }
  let nextPageId = 100

  beforeAll(() => {
    global.__X__ = true
    ;(global as any).getApp = () => ({ vm: { $router: router } })
  })

  afterAll(() => {
    global.__X__ = oldX
    ;(global as any).getApp = oldGetApp
  })

  beforeEach(() => {
    nextPageId = 100
    router.currentRoute.value.meta = {}
    router.push.mockReset().mockResolvedValue(undefined)
    router.replace.mockReset().mockResolvedValue(undefined)
    router.resolve.mockClear()
    mockCreatePageState.mockReset().mockImplementation((type, id) => ({
      __id__: id || ++nextPageId,
      __type__: type,
    }))
    mockResolveAppRoute.mockReset().mockImplementation((url, openType) => ({
      url,
      context: { event: { openType } },
    }))
    mockCreateWebAppRouteTransaction
      .mockReset()
      .mockImplementation((finalFullPath, openType, context) => ({
        finalFullPath,
        openType,
        context,
      }))
    mockQueueWebAppRouteTransaction.mockReset()
    mockDiscardWebAppRouteTransaction.mockReset()
  })

  test('切换当前 Tab 不创建 Context，但仍完成 Router 导航', async () => {
    const currentPage = createTabBarPage(1, '/pages/tab/tab', true)
    mockGetCurrentBasePages.mockReturnValue([currentPage])
    mockGetCurrentPagesMap.mockReturnValue(new Map([['current', currentPage]]))

    await navigate({ type: 'switchTab', url: '/pages/tab/tab' })

    expect(mockResolveAppRoute).not.toHaveBeenCalled()
    expect(router.replace).toHaveBeenCalledWith(
      expect.objectContaining({ state: { __id__: 1, __type__: 'switchTab' } })
    )
    expect(mockQueueWebAppRouteTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ context: undefined, pageId: 1 })
    )
    expect(currentPage.$.__isActive).toBe(true)
  })

  test('切换缓存 Tab 复用 pageId，导航确认前不改变 active 状态', async () => {
    const currentPage = createTabBarPage(1, '/pages/tab/tab', true)
    const targetPage = createTabBarPage(2, '/pages/final/final', false)
    mockGetCurrentBasePages.mockReturnValue([currentPage])
    mockGetCurrentPagesMap.mockReturnValue(
      new Map([
        ['current', currentPage],
        ['target', targetPage],
      ])
    )

    await navigate({ type: 'switchTab', url: '/pages/final/final' })

    expect(mockResolveAppRoute).toHaveBeenCalledWith(
      '/pages/final/final',
      'switchTab'
    )
    expect(router.replace).toHaveBeenCalledWith(
      expect.objectContaining({ state: { __id__: 2, __type__: 'switchTab' } })
    )
    expect(mockQueueWebAppRouteTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ context: expect.any(Object), pageId: 2 })
    )
    expect(currentPage.$.__isActive).toBe(true)
    expect(targetPage.$.__isActive).toBe(false)
  })

  test('切换未创建的 Tab 使用新 pageId', async () => {
    const currentPage = createTabBarPage(1, '/pages/tab/tab', true)
    mockGetCurrentBasePages.mockReturnValue([currentPage])
    mockGetCurrentPagesMap.mockReturnValue(new Map([['current', currentPage]]))

    await navigate({ type: 'switchTab', url: '/pages/final/final' })

    expect(router.replace).toHaveBeenCalledWith(
      expect.objectContaining({ state: { __id__: 101, __type__: 'switchTab' } })
    )
    expect(mockQueueWebAppRouteTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ pageId: 101 })
    )
  })

  test('Router 异常时回收 X 路由事务', async () => {
    const currentPage = createTabBarPage(1, '/pages/tab/tab', true)
    mockGetCurrentBasePages.mockReturnValue([currentPage])
    mockGetCurrentPagesMap.mockReturnValue(new Map([['current', currentPage]]))
    router.push.mockRejectedValue(new Error('guard error'))

    await expect(
      navigate({ type: 'navigateTo', url: '/pages/final/final' })
    ).rejects.toBe('guard error')

    const transaction = mockQueueWebAppRouteTransaction.mock.calls[0][0]
    expect(mockDiscardWebAppRouteTransaction).toHaveBeenCalledWith(transaction)
  })
})
