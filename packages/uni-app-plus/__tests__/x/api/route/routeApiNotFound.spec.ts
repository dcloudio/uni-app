jest.mock('@dcloudio/uni-api', () =>
  Object.assign(
    {},
    jest.requireActual('../../../../../uni-api/src/helpers/api'),
    jest.requireActual('../../../../../uni-api/src/protocols/route/route'),
    jest.requireActual('../../../../../uni-api/src/service/route/appRoute')
  )
)

const mockRegisterPage = jest.fn()
const mockSwitchSelect = jest.fn()

jest.mock('../../../../src/x/framework/app', () => ({
  entryPageState: { isReady: true },
  navigateToPagesBeforeEntryPages: [],
  reLaunchPagesBeforeEntryPages: [],
  redirectToPagesBeforeEntryPages: [],
  switchTabPagesBeforeEntryPages: [],
}))

jest.mock('../../../../src/x/framework/app/tabBar', () => ({
  getTabIndex: jest.fn(),
  isTabPage: jest.fn(),
  switchSelect: (...args: unknown[]) => mockSwitchSelect(...args),
}))

jest.mock('../../../../src/x/framework/page', () => ({
  registerPage: (...args: unknown[]) => mockRegisterPage(...args),
}))

jest.mock('../../../../src/x/framework/page/register', () => ({
  registerPage: (...args: unknown[]) => mockRegisterPage(...args),
}))

jest.mock('../../../../src/x/api/route/webview', () => ({
  showWebview: jest.fn(),
}))

jest.mock('../../../../src/x/api/route/utils', () => ({
  closePage: jest.fn(),
  handleBeforeEntryPageRoutes: jest.fn(),
  updateEntryPageIsReady: jest.fn(),
}))

jest.mock('../../../../src/x/api/route/performance', () => ({
  invokeAfterRouteHooks: jest.fn(),
  invokeBeforeRouteHooks: jest.fn(),
}))

jest.mock('../../../../src/x/statusBar', () => ({
  setStatusBarStyle: jest.fn(),
}))

jest.mock('../../../../src/service/framework/page/getCurrentPages', () => ({
  getAllPages: jest.fn(() => []),
  getCurrentBasePages: jest.fn(() => []),
}))

jest.mock('../../../../src/service/framework/webview/utils', () => ({
  getWebviewId: jest.fn(() => 1),
}))

import { navigateTo } from '../../../../src/x/api/route/navigateTo'
import { reLaunch } from '../../../../src/x/api/route/reLaunch'
import { redirectTo } from '../../../../src/x/api/route/redirectTo'
import { switchTab } from '../../../../src/x/api/route/switchTab'
import { offAppRoute, onAppRoute } from '../../../../src/x/api/route/appRoute'

const routeApis = [
  ['navigateTo', navigateTo],
  ['redirectTo', redirectTo],
  ['reLaunch', reLaunch],
  ['switchTab', switchTab],
] as const

describe('app x missing route api', () => {
  const oldPlatform = global.__PLATFORM__
  const oldUniRoutes = global.__uniRoutes
  const oldUniConfig = global.__uniConfig
  const oldGetApp = (global as any).getApp
  const appVm = {
    $: {
      onPageNotFound: [] as Function[],
    },
  }

  beforeAll(() => {
    global.__PLATFORM__ = 'app'
    global.__uniConfig = { ready: true } as UniApp.UniConfig
    ;(global as any).getApp = () => ({ vm: appVm })
  })

  afterAll(() => {
    offAppRoute()
    global.__PLATFORM__ = oldPlatform
    global.__uniRoutes = oldUniRoutes
    global.__uniConfig = oldUniConfig
    ;(global as any).getApp = oldGetApp
  })

  beforeEach(() => {
    global.__uniRoutes = []
    appVm.$.onPageNotFound.length = 0
    mockRegisterPage.mockReset()
    mockSwitchSelect.mockReset()
  })

  afterEach(() => {
    offAppRoute()
  })

  test.each(routeApis)('%s 缺页只触发 API fail', (name, routeApi) => {
    const routeListener = jest.fn()
    const pageNotFoundListener = jest.fn()
    const fail = jest.fn()
    appVm.$.onPageNotFound.push(pageNotFoundListener)
    onAppRoute(routeListener)
    ;(routeApi as Function)({
      url: '/pages/missing/missing',
      fail,
    })

    expect(fail).toHaveBeenCalledTimes(1)
    expect(fail.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        errMsg: `${name}:fail page \`/pages/missing/missing\` is not found`,
      })
    )
    expect(mockRegisterPage).not.toHaveBeenCalled()
    expect(mockSwitchSelect).not.toHaveBeenCalled()
    expect(pageNotFoundListener).not.toHaveBeenCalled()
    expect(routeListener).not.toHaveBeenCalled()
  })
})
