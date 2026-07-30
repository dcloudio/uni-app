jest.mock('@dcloudio/uni-api', () =>
  Object.assign(
    {},
    jest.requireActual('../../uni-api/src/helpers/api'),
    jest.requireActual('../../uni-api/src/protocols/route/route')
  )
)

import {
  API_NAVIGATE_TO,
  API_REDIRECT_TO,
  API_RE_LAUNCH,
  API_SWITCH_TAB,
  NavigateToOptions,
  ReLaunchOptions,
  RedirectToOptions,
  SwitchTabOptions,
} from '@dcloudio/uni-api'

jest.mock('../src/service/api/route/appRoute', () => ({
  dispatchWebAppRouteNotFound: jest.fn(),
}))
jest.mock('../src/framework/setup/page', () => ({}))
jest.mock('../src/service/api/route/switchTab', () => ({}))
jest.mock('../src/service/api/route/redirectTo', () => ({}))
jest.mock('../src/service/api/route/reLaunch', () => ({}))

import { dispatchWebAppRouteNotFound } from '../src/service/api/route/appRoute'
import {
  type NavigateType,
  createWebRouteOptions,
} from '../src/service/api/route/utils'

type UrlFormatter = (url: string, params: Record<string, any>) => string | void

type RouteApiOptions = ApiOptions<any, any>

const routeApiOptions: [NavigateType, RouteApiOptions][] = [
  [API_NAVIGATE_TO, NavigateToOptions],
  [API_REDIRECT_TO, RedirectToOptions],
  [API_RE_LAUNCH, ReLaunchOptions],
  [API_SWITCH_TAB, SwitchTabOptions],
]

const otherValidationCases: [NavigateType, RouteApiOptions, string, string][] =
  [
    [
      API_NAVIGATE_TO,
      NavigateToOptions,
      '/pages/tab/tab',
      'can not navigateTo a tabbar page',
    ],
    [
      API_REDIRECT_TO,
      RedirectToOptions,
      '/pages/tab/tab',
      'can not redirectTo a tabbar page',
    ],
    [
      API_SWITCH_TAB,
      SwitchTabOptions,
      '/pages/index/index',
      'can not switch to no-tabBar page',
    ],
  ]

function getUrlFormatter(type: NavigateType, options: RouteApiOptions) {
  const routeOptions = createWebRouteOptions(type, options)
  return (routeOptions.formatArgs as Record<string, unknown>)
    .url as UrlFormatter
}

describe('web app route options', () => {
  const oldX = global.__X__
  const oldUniRoutes = global.__uniRoutes
  const oldUniConfig = global.__uniConfig
  const dispatchNotFound = jest.mocked(dispatchWebAppRouteNotFound)

  beforeAll(() => {
    global.__X__ = true
    global.__uniConfig = { ready: false } as UniApp.UniConfig
  })

  afterAll(() => {
    global.__X__ = oldX
    global.__uniRoutes = oldUniRoutes
    global.__uniConfig = oldUniConfig
  })

  beforeEach(() => {
    global.__uniRoutes = []
    dispatchNotFound.mockClear()
  })

  test.each(routeApiOptions)(
    '%s dispatches a missing route once',
    (type, options) => {
      const normalizeUrl = getUrlFormatter(type, options)
      const url = '/pages/missing/missing?from=api'

      expect(normalizeUrl(url, { url })).toBe(`page \`${url}\` is not found`)
      expect(dispatchNotFound).toHaveBeenCalledTimes(1)
      expect(dispatchNotFound).toHaveBeenCalledWith(url, type)
    }
  )

  test.each(otherValidationCases)(
    '%s does not dispatch other validation failures',
    (type, options, url, expectedError) => {
      global.__uniRoutes = [
        {
          path: '/pages/index/index',
          meta: { isTabBar: false },
        },
        {
          path: '/pages/tab/tab',
          meta: { isTabBar: true },
        },
      ] as UniApp.UniRoutes
      const normalizeUrl = getUrlFormatter(type, options)

      expect(normalizeUrl(url, { url })).toBe(expectedError)
      expect(dispatchNotFound).not.toHaveBeenCalled()
    }
  )
})
