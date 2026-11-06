jest.mock('@dcloudio/uni-api', () => ({
  ...jest.requireActual('../../uni-api/src/protocols/route/route'),
  defineAsyncApi: (_name: string, implementation: Function) => implementation,
}))

const mockNavigate = jest.fn()
const mockPage = { $: { __isTabBar: false }, $page: { id: 1, path: '/old' } }
const mockPages = new Map([['old', mockPage]])
jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPage: () => mockPage,
  getCurrentPageVm: () => mockPage,
  invokeHook: jest.fn(),
}))
jest.mock('../src/framework/setup/page', () => ({
  entryPageState: { handledBeforeEntryPageRoutes: false },
  getCurrentPagesMap: () => mockPages,
  getPage$BasePage: (page: typeof mockPage) => page.$page,
  normalizeRouteKey: () => 'old',
  removePage: jest.fn(),
  navigateToPagesBeforeEntryPages: [],
  switchTabPagesBeforeEntryPages: [],
  redirectToPagesBeforeEntryPages: [],
  reLaunchPagesBeforeEntryPages: [],
}))
jest.mock('../src/service/api/route/appRoute', () => ({}))
jest.mock('../src/service/api/route/utils', () => ({
  ...jest.requireActual('../src/service/api/route/utils'),
  navigate: (...args: unknown[]) => mockNavigate(...args),
}))

import { navigateTo } from '../src/service/api/route/navigateTo'
import { switchTab } from '../src/service/api/route/switchTab'
import { redirectTo } from '../src/service/api/route/redirectTo'
import { reLaunch } from '../src/service/api/route/reLaunch'
import { handleBeforeEntryPageRoutes } from '../src/service/api/route/utils'
import {
  entryPageState,
  navigateToPagesBeforeEntryPages,
  reLaunchPagesBeforeEntryPages,
  redirectToPagesBeforeEntryPages,
  removePage,
  switchTabPagesBeforeEntryPages,
} from '../src/framework/setup/page'

const queues = [
  navigateToPagesBeforeEntryPages,
  switchTabPagesBeforeEntryPages,
  redirectToPagesBeforeEntryPages,
  reLaunchPagesBeforeEntryPages,
]
const apis = [navigateTo, switchTab, redirectTo, reLaunch]

describe('首页就绪前的跳转队列', () => {
  const oldX = global.__X__
  beforeEach(() => {
    entryPageState.handledBeforeEntryPageRoutes = false
    queues.forEach((queue) => (queue.length = 0))
    mockNavigate.mockReset().mockResolvedValue(undefined)
    ;(removePage as jest.Mock).mockClear()
  })
  afterEach(() => {
    global.__X__ = oldX
  })

  test.each([false, true])('保留分组顺序、回调和页面清理：X=%s', async (x) => {
    global.__X__ = x
    const callbacks = apis.map(() => ({
      resolve: jest.fn(),
      reject: jest.fn(),
    }))
    const events = { ready: jest.fn() }
    // 故意反向调用，仍须按 navigateTo、switchTab、redirectTo、reLaunch 的原顺序执行。
    for (let index = apis.length - 1; index >= 0; index--) {
      ;(apis[index] as Function)(
        { url: '/target', events, isAutomatedTesting: true },
        callbacks[index]
      )
    }
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(removePage).not.toHaveBeenCalled()
    handleBeforeEntryPageRoutes()
    expect(mockNavigate.mock.calls.map(([args]) => args.type)).toEqual([
      'navigateTo',
      'switchTab',
      'redirectTo',
      'reLaunch',
    ])
    expect(mockNavigate.mock.calls[0][0]).toMatchObject({
      events,
      isAutomatedTesting: true,
    })
    expect(queues.every((queue) => queue.length === 0)).toBe(true)
    expect(removePage).toHaveBeenCalledTimes(x ? 0 : 3)
    await Promise.resolve()
    callbacks.forEach(({ resolve, reject }) => {
      expect(resolve).toHaveBeenCalledTimes(1)
      expect(reject).not.toHaveBeenCalled()
    })
    handleBeforeEntryPageRoutes()
    expect(mockNavigate).toHaveBeenCalledTimes(4)
    ;(navigateTo as Function)({ url: '/next' }, callbacks[0])
    expect(mockNavigate).toHaveBeenCalledTimes(5)
  })

  test('延迟执行的失败仍交给各 API 的 reject', async () => {
    global.__X__ = true
    mockNavigate.mockRejectedValue('跳转失败')
    const callbacks = apis.map(() => ({
      resolve: jest.fn(),
      reject: jest.fn(),
    }))
    apis.forEach((api, index) =>
      (api as Function)({ url: '/target' }, callbacks[index])
    )
    handleBeforeEntryPageRoutes()
    await Promise.resolve()
    await Promise.resolve()
    callbacks.forEach(({ resolve, reject }) => {
      expect(resolve).not.toHaveBeenCalled()
      expect(reject).toHaveBeenCalledWith('跳转失败')
    })
  })
})
