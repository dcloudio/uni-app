jest.mock('@dcloudio/uni-api', () =>
  Object.assign(
    {},
    jest.requireActual('../../uni-api/src/helpers/api'),
    jest.requireActual('../../uni-api/src/protocols/route/route'),
    jest.requireActual('../../uni-api/src/service/route/appRoute')
  )
)

const mockNavigate = jest.fn()

jest.mock('../src/service/api/route/utils', () => ({
  navigate: (...args: unknown[]) => mockNavigate(...args),
}))

jest.mock('../src/framework/setup/page', () => ({
  entryPageState: { handledBeforeEntryPageRoutes: true },
  getCurrentPagesMap: () => new Map(),
  getPage$BasePage: jest.fn(),
  navigateToPagesBeforeEntryPages: [],
  normalizeRouteKey: jest.fn(),
  reLaunchPagesBeforeEntryPages: [],
  redirectToPagesBeforeEntryPages: [],
  removePage: jest.fn(),
  switchTabPagesBeforeEntryPages: [],
}))

import { navigateTo } from '../src/service/api/route/navigateTo'
import { reLaunch } from '../src/service/api/route/reLaunch'
import { redirectTo } from '../src/service/api/route/redirectTo'
import { switchTab } from '../src/service/api/route/switchTab'
import { offAppRoute, onAppRoute } from '../src/service/api/route/appRoute'

const routeApis = [
  ['navigateTo', navigateTo],
  ['redirectTo', redirectTo],
  ['reLaunch', reLaunch],
  ['switchTab', switchTab],
] as const

describe('web missing route api', () => {
  const oldNodeJs = global.__NODE_JS__
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
    global.__NODE_JS__ = false
    global.__PLATFORM__ = 'h5'
    global.__uniConfig = { ready: true } as UniApp.UniConfig
    ;(global as any).getApp = () => ({ vm: appVm })
  })

  afterAll(() => {
    offAppRoute()
    global.__NODE_JS__ = oldNodeJs
    global.__PLATFORM__ = oldPlatform
    global.__uniRoutes = oldUniRoutes
    global.__uniConfig = oldUniConfig
    ;(global as any).getApp = oldGetApp
  })

  beforeEach(() => {
    global.__uniRoutes = []
    appVm.$.onPageNotFound.length = 0
    mockNavigate.mockReset()
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
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(pageNotFoundListener).not.toHaveBeenCalled()
    expect(routeListener).not.toHaveBeenCalled()
  })
})
