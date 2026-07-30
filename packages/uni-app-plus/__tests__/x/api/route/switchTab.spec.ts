const mockSwitchSelect = jest.fn()
const mockEntryPageState = {
  isReady: true,
  handledBeforeEntryPageRoutes: false,
}

jest.mock('@dcloudio/uni-api', () => ({
  API_SWITCH_TAB: 'switchTab',
  SwitchTabOptions: {},
  SwitchTabProtocol: {},
  defineAsyncApi: (_name: string, fn: Function) => fn,
}))

jest.mock('@dcloudio/uni-shared', () => ({
  parseUrl: (url: string) => ({ path: url, query: {} }),
}))

jest.mock('../../../../src/x/framework/app/tabBar', () => ({
  getTabIndex: () => 0,
  isTabPage: jest.fn(),
  switchSelect: (...args: unknown[]) => mockSwitchSelect(...args),
}))

jest.mock('../../../../src/x/api/route/appRoute', () => ({
  createAppRouteOptions: (_type: string, options: unknown) => options,
}))

jest.mock('../../../../src/x/api/route/utils', () => ({
  closePage: jest.fn(),
  handleBeforeEntryPageRoutes: jest.fn(),
  updateEntryPageIsReady: jest.fn(),
}))

jest.mock('../../../../src/x/framework/app', () => ({
  entryPageState: mockEntryPageState,
  switchTabPagesBeforeEntryPages: [],
}))

jest.mock('../../../../src/service/framework/page/getCurrentPages', () => ({
  getCurrentBasePages: () => [],
}))

import { $switchTab } from '../../../../src/x/api/route/switchTab'

describe('app x switchTab appRoute openType', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockEntryPageState.isReady = true
    mockSwitchSelect.mockReset()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test('普通调用显式使用 switchTab', () => {
    $switchTab({ url: '/pages/tab/tab' } as any, {
      resolve: jest.fn(),
      reject: jest.fn(),
    })

    jest.runAllTimers()

    expect(mockSwitchSelect).toHaveBeenCalledWith(
      0,
      '/pages/tab/tab',
      {},
      false,
      undefined,
      'switchTab',
      true
    )
  })

  test('入口缺页回退到 Tab 时禁止派发', () => {
    $switchTab(
      { url: '/pages/tab/tab' } as any,
      { resolve: jest.fn(), reject: jest.fn() },
      'appLaunch',
      false
    )

    jest.runAllTimers()

    expect(mockSwitchSelect.mock.calls[0].slice(-2)).toEqual([
      'appLaunch',
      false,
    ])
  })
})
