const mockRegisterPage = jest.fn()
const mockShowWebview = jest.fn(
  (_page, _animationType, _animationDuration, callback) => callback?.()
)
const mockEntryPageState = {
  isReady: true,
  handledBeforeEntryPageRoutes: false,
}

jest.mock('@dcloudio/uni-api', () => ({
  API_NAVIGATE_TO: 'navigateTo',
  NavigateToOptions: {},
  NavigateToProtocol: {},
  defineAsyncApi: (_name: string, fn: Function) => fn,
}))

jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPage: () => undefined,
  getRouteMeta: jest.fn(),
  invokeHook: jest.fn(),
  invokeLastDialogPageHookByUniPage: jest.fn(),
}))

jest.mock('../../../../src/x/api/route/webview', () => ({
  showWebview: (
    page: unknown,
    animationType: unknown,
    animationDuration: unknown,
    callback: Function
  ) => mockShowWebview(page, animationType, animationDuration, callback),
}))

jest.mock('../../../../src/x/framework/page', () => ({
  registerPage: (...args: unknown[]) => mockRegisterPage(...args),
}))

jest.mock('../../../../src/service/framework/webview/utils', () => ({
  getWebviewId: () => 1,
}))

jest.mock('../../../../src/x/statusBar', () => ({
  setStatusBarStyle: jest.fn(),
}))

jest.mock('../../../../src/x/api/route/performance', () => ({
  invokeAfterRouteHooks: jest.fn(),
  invokeBeforeRouteHooks: jest.fn(),
}))

jest.mock('../../../../src/x/framework/app', () => ({
  entryPageState: mockEntryPageState,
  navigateToPagesBeforeEntryPages: [],
}))

jest.mock('../../../../src/x/api/route/utils', () => ({
  handleBeforeEntryPageRoutes: jest.fn(),
  updateEntryPageIsReady: jest.fn(),
}))

import { $navigateTo } from '../../../../src/x/api/route/navigateTo'

describe('app x navigateTo appRoute openType', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockEntryPageState.isReady = true
    mockRegisterPage.mockReset()
    mockShowWebview.mockClear()
    mockRegisterPage.mockImplementation((options) => {
      const page = {}
      options.onRegistered?.(page)
      return page
    })
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test('没有当前页面时，普通调用仍使用 navigateTo', () => {
    $navigateTo({ url: '/pages/next/next', events: {} } as any, {
      resolve: jest.fn(),
      reject: jest.fn(),
    })

    jest.runAllTimers()

    expect(mockRegisterPage.mock.calls[0][0].appRouteOpenType).toBe(
      'navigateTo'
    )
  })

  test('入口缺页回退不派发第二个 appRoute', () => {
    $navigateTo(
      { url: '/pages/index/index', events: {} } as any,
      { resolve: jest.fn(), reject: jest.fn() },
      'appLaunch',
      false
    )

    jest.runAllTimers()

    expect(mockRegisterPage.mock.calls[0][0].appRouteOpenType).toBeUndefined()
  })
})
