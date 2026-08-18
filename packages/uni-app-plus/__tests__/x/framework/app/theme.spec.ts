const setPageStyle = jest.fn()

jest.mock('../../../../src/service/framework/page/getCurrentPages', () => ({
  UniBasePageImpl: class {
    route: string = ''
    options: Map<string, string | null> = new Map()
    constructor() {
      this.route = ''
      this.options = new Map()
    }
    getParentPage() {
      return null
    }
    getDialogPages() {
      return []
    }
  },
  getAllPages: jest.fn(() => {
    return [
      {
        $page: {
          path: '/pages/tabBar/component',
        },
        setPageStyle: setPageStyle,
      },
    ]
  }),
}))

jest.mock('../../../../src/x/framework/app/tabBar', () => ({
  getTabBar: jest.fn(() => ({})),
}))

jest.mock('../../../../src/service/framework/page', () => ({
  definePage: jest.fn(),
}))

const mockInitRouteOptions = jest.fn()

jest.mock('../../../../src/service/framework/page/routeOptions', () => ({
  initRouteOptions: mockInitRouteOptions,
}))

jest.mock('../../../../src/x/framework/app/app', () => ({
  getNativeApp: jest.fn(() => ({ id: 0 })),
}))

import {
  createThemeSnapshots,
  getAppThemeFallbackOS,
  normalizePageStyles,
  normalizeTabBarStyles,
} from '../../../../src/x/framework/theme'

describe('test: getAppThemeFallbackOS', () => {
  it('test: getAppThemeFallbackOS1', () => {
    uni.getAppBaseInfo = jest.fn(() => {
      return { appTheme: 'auto' } as any
    })
    uni.getDeviceInfo = jest.fn(() => {
      return { osTheme: 'dark' } as any
    })

    expect(getAppThemeFallbackOS()).toBe('dark')
  })
  it('test: getAppThemeFallbackOS2', () => {
    uni.getAppBaseInfo = jest.fn(() => {
      return { appTheme: 'light' } as any
    })
    uni.getDeviceInfo = jest.fn(() => {
      return { osTheme: 'dark' } as any
    })

    expect(getAppThemeFallbackOS()).toBe('light')
  })

  it('test: getAppThemeFallbackOS2', () => {
    uni.getAppBaseInfo = jest.fn(() => {
      return { appTheme: 'dark' } as any
    })
    uni.getDeviceInfo = jest.fn(() => {
      return { osTheme: 'light' } as any
    })

    expect(getAppThemeFallbackOS()).toBe('dark')
  })
})

describe('test: normalizePageStyles', () => {
  it('should normalize page styles', () => {
    const pageStyle = {
      backgroundColor: '@bgColor',
      textColor: '@textColor',
      buttonColor: '@buttonColor',
    }
    const themeConfig = {
      dark: {
        bgColor: '#000',
        textColor: '#fff',
        buttonColor: '#f00',
      },
      light: {
        bgColor: '#fff',
        textColor: '#000',
        buttonColor: '#00f',
      },
    }
    const themeMode = 'dark'

    normalizePageStyles(pageStyle, themeConfig, themeMode)

    expect(pageStyle).toEqual({
      backgroundColor: '#000',
      textColor: '#fff',
      buttonColor: '#f00',
    })
  })
})

describe('test: normalizeTabBarStyles', () => {
  it('should normalize tab bar styles', () => {
    const tabBar = {
      backgroundColor: '@bgColor',
      textColor: '@textColor',
      buttonColor: '@buttonColor',
    }
    const themeConfig = {
      dark: {
        bgColor: '#000',
        textColor: '#fff',
        buttonColor: '#f00',
      },
      light: {
        bgColor: '#fff',
        textColor: '#000',
        buttonColor: '#00f',
      },
    }
    const themeMode = 'light'

    normalizeTabBarStyles(tabBar, themeConfig, themeMode)

    expect(tabBar).toEqual({
      backgroundColor: '#fff',
      textColor: '#000',
      buttonColor: '#00f',
    })
  })
})

describe('test: createThemeSnapshots', () => {
  const oldUniConfig = global.__uniConfig

  beforeAll(() => {
    global.__uniConfig = {
      realEntryPagePath: 'pages/index/index',
      getTabBarConfig: () => undefined,
    } as unknown as UniApp.UniConfig
  })

  afterAll(() => {
    global.__uniConfig = oldUniConfig
  })

  beforeEach(() => {
    mockInitRouteOptions.mockReset()
  })

  it('only registers page and tabBar styles that differ between themes', () => {
    mockInitRouteOptions.mockImplementation((path: string) => ({
      path,
      meta:
        path === '/pages/index/index'
          ? {
              route: path,
              isQuit: true,
              backgroundColorContent: '@contentColor',
              navigationBarBackgroundColor: '@navigationColor',
              navigationBarTitleText: 'Theme test',
              navigationStyle: 'default',
              navigationBar: {
                titleText: 'Internal navigation metadata',
              },
            }
          : path === '/pages/detail/detail'
          ? {
              route: path,
              isQuit: false,
              navigationBarBackgroundColor: '@navigationColor',
              navigationBarTextStyle: 'black',
              navigationStyle: 'default',
            }
          : {
              route: path,
              backgroundColorContent: '#ffffff',
              navigationBarBackgroundColor: '#ffffff',
            },
    }))

    const snapshots = createThemeSnapshots(
      [
        {
          path: '/pages/index/index',
          meta: { route: 'pages/index/index' } as UniApp.PageRouteMeta,
        },
        {
          path: '/pages/detail/detail',
          meta: { route: 'pages/detail/detail' } as UniApp.PageRouteMeta,
        },
        {
          path: '/pages/static/static',
          meta: { route: 'pages/static/static' } as UniApp.PageRouteMeta,
        },
      ],
      {
        light: {
          contentColor: '#ffffff',
          navigationColor: '#eeeeee',
          iconPath: '/static/light.png',
        },
        dark: {
          contentColor: '#000000',
          navigationColor: '#111111',
          iconPath: '/static/dark.png',
        },
      },
      {
        color: '#999999',
        list: [
          {
            text: 'Home',
            iconPath: '@iconPath',
          },
        ],
      }
    )

    expect(snapshots).toEqual({
      pages: {
        'pages/index/index': {
          light: {
            backgroundColorContent: '#ffffff',
            navigationBarBackgroundColor: '#eeeeee',
            navigationBarTitleText: 'Theme test',
          },
          dark: {
            backgroundColorContent: '#000000',
            navigationBarBackgroundColor: '#111111',
            navigationBarTitleText: 'Theme test',
          },
          preserveDialogBackgroundColorContent: true,
        },
        'pages/detail/detail': {
          light: {
            navigationBarBackgroundColor: '#eeeeee',
            navigationBarTextStyle: 'black',
            navigationBarAutoBackButton: true,
          },
          dark: {
            navigationBarBackgroundColor: '#111111',
            navigationBarTextStyle: 'black',
            navigationBarAutoBackButton: true,
          },
        },
      },
      tabBar: {
        light: {
          list: [
            {
              text: 'Home',
              iconPath: '/static/light.png',
            },
          ],
        },
        dark: {
          list: [
            {
              text: 'Home',
              iconPath: '/static/dark.png',
            },
          ],
        },
      },
    })
    expect(mockInitRouteOptions).toHaveBeenCalledTimes(3)
    expect(mockInitRouteOptions).toHaveBeenNthCalledWith(
      1,
      '/pages/index/index',
      ''
    )
    expect(snapshots?.pages['pages/index/index'].light).not.toHaveProperty(
      'navigationBar'
    )
  })

  it('skips styles with identical resolved values', () => {
    mockInitRouteOptions.mockImplementation((path: string) => ({
      path,
      meta: {
        route: path,
        backgroundColorContent: '@contentColor',
      },
    }))

    expect(
      createThemeSnapshots(
        [{ path: 'pages/index/index', meta: {} as UniApp.PageRouteMeta }],
        {
          light: { contentColor: '#ffffff' },
          dark: { contentColor: '#ffffff' },
        },
        undefined
      )
    ).toBeUndefined()
  })

  it('does not register dynamic navigationStyle changes', () => {
    mockInitRouteOptions.mockImplementation((path: string) => ({
      path,
      meta: {
        route: path,
        navigationStyle: '@navigationStyle',
      },
    }))

    expect(
      createThemeSnapshots(
        [{ path: 'pages/index/index', meta: {} as UniApp.PageRouteMeta }],
        {
          light: { navigationStyle: 'default' },
          dark: { navigationStyle: 'custom' },
        },
        undefined
      )
    ).toBeUndefined()
  })

  it('supports page-only theme snapshots', () => {
    mockInitRouteOptions.mockImplementation((path: string) => ({
      path,
      meta: {
        route: path,
        backgroundColorContent: '@contentColor',
      },
    }))

    expect(
      createThemeSnapshots(
        [{ path: 'pages/index/index', meta: {} as UniApp.PageRouteMeta }],
        {
          light: { contentColor: '#ffffff' },
          dark: { contentColor: '#000000' },
        },
        undefined
      )
    ).toEqual({
      pages: {
        'pages/index/index': {
          light: { backgroundColorContent: '#ffffff' },
          dark: { backgroundColorContent: '#000000' },
          preserveDialogBackgroundColorContent: true,
        },
      },
    })
  })

  it('allows an explicit dialog page background to follow the theme', () => {
    mockInitRouteOptions.mockImplementation((path: string) => ({
      path,
      meta: {
        route: path,
        backgroundColorContent: '@contentColor',
      },
    }))

    expect(
      createThemeSnapshots(
        [
          {
            path: 'pages/index/index',
            meta: {
              backgroundColorContent: '@contentColor',
            } as UniApp.PageRouteMeta,
          },
        ],
        {
          light: { contentColor: '#ffffff' },
          dark: { contentColor: '#000000' },
        },
        undefined
      )
    ).toEqual({
      pages: {
        'pages/index/index': {
          light: { backgroundColorContent: '#ffffff' },
          dark: { backgroundColorContent: '#000000' },
        },
      },
    })
  })

  it('supports tabBar-only theme snapshots', () => {
    mockInitRouteOptions.mockImplementation((path: string) => ({
      path,
      meta: { route: path, backgroundColorContent: '#ffffff' },
    }))

    expect(
      createThemeSnapshots(
        [{ path: 'pages/index/index', meta: {} as UniApp.PageRouteMeta }],
        {
          light: { tabBarColor: '#ffffff' },
          dark: { tabBarColor: '#000000' },
        },
        { backgroundColor: '@tabBarColor' }
      )
    ).toEqual({
      pages: {},
      tabBar: {
        light: { backgroundColor: '#ffffff' },
        dark: { backgroundColor: '#000000' },
      },
    })
  })
})
