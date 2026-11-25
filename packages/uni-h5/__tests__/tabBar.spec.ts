const mockGetTheme = jest.fn(() => 'dark')
const mockOnThemeChange = jest.fn()

jest.mock('../src/service/api/base/getBrowserInfo', () => ({
  getTheme: () => mockGetTheme(),
}))

jest.mock('@dcloudio/uni-platform', () => ({
  getRealPath: (path: string) => path,
}))

jest.mock('@dcloudio/uni-api', () => ({
  ...jest.requireActual('../../uni-api/src/helpers/api'),
  ...jest.requireActual('../../uni-api/src/protocols/ui/tabBar'),
}))

jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPageMeta: () => ({ isTabBar: true }),
  initTabBarI18n: (tabBar: UniApp.TabBarOptions) => tabBar,
  normalizeTabBarRoute: jest.fn(),
}))

jest.mock('../src/framework/setup/page', () => ({
  getCurrentBasePages: () => [{ $basePage: { meta: { isTabBar: true } } }],
  getPage$BasePage: (page: { $basePage: unknown }) => page.$basePage,
}))

describe('web tabBar state', () => {
  const oldUniConfig = global.__uniConfig
  const oldUniServiceJSBridge = global.UniServiceJSBridge
  const oldPlatform = (global as any).__PLATFORM__
  let useTabBar: typeof import('../src/framework/setup/state').useTabBar
  let setTabBarItem: typeof import('../src/service/api/ui/tabBar').setTabBarItem
  let setTabBarStyle: typeof import('../src/service/api/ui/tabBar').setTabBarStyle

  beforeEach(async () => {
    jest.resetModules()
    ;(global as any).__PLATFORM__ = 'h5'
    mockGetTheme.mockReturnValue('dark')
    mockOnThemeChange.mockReset()
    global.__uniConfig = {
      darkmode: true,
      themeConfig: {
        dark: {
          tabBarBackgroundColor: '#222222',
          tabBarColor: '#ffffff',
          tabBarIconPath: '/static/dark.png',
          tabBarBorderColor: 'rgba(255, 255, 255, 0.33)',
        },
        light: {
          tabBarBackgroundColor: '#f8f8f8',
          tabBarColor: '#000000',
          tabBarIconPath: '/static/light.png',
          tabBarBorderColor: 'rgba(0, 0, 0, 0.33)',
        },
      },
      tabBar: {
        backgroundColor: '@tabBarBackgroundColor',
        color: '@tabBarColor',
        borderStyle: '@tabBarBorderColor',
        list: [
          {
            pagePath: 'pages/index/index',
            text: 'Index',
            iconPath: '@tabBarIconPath',
          },
        ],
      },
    } as unknown as UniApp.UniConfig
    global.UniServiceJSBridge = {
      on: mockOnThemeChange,
      off: jest.fn(),
    } as unknown as typeof UniServiceJSBridge
    useTabBar = (await import('../src/framework/setup/state')).useTabBar
    setTabBarItem = (await import('../src/service/api/ui/tabBar')).setTabBarItem
    setTabBarStyle = (await import('../src/service/api/ui/tabBar'))
      .setTabBarStyle
  })

  afterEach(() => {
    global.__uniConfig = oldUniConfig
    global.UniServiceJSBridge = oldUniServiceJSBridge
    if (oldPlatform === undefined) {
      delete (global as any).__PLATFORM__
    } else {
      ;(global as any).__PLATFORM__ = oldPlatform
    }
  })

  test('reuses one themed tabBar instance for api and rendering', async () => {
    const tabBar = useTabBar()!
    const sameTabBar = useTabBar()!

    expect(sameTabBar).toBe(tabBar)
    expect(tabBar).toMatchObject({
      backgroundColor: '#222222',
      color: '#ffffff',
      borderStyle: 'rgba(255, 255, 255, 0.33)',
    })
    expect(tabBar.list[0]).toMatchObject({ iconPath: '/static/dark.png' })

    await new Promise<void>((resolve) => {
      setTabBarItem({ index: 0, text: 'Changed', success: resolve })
    })
    expect(tabBar.list[0].text).toBe('Changed')
  })

  test('registers one theme listener and updates the shared instance', () => {
    const tabBar = useTabBar()!
    const sameTabBar = useTabBar()!

    expect(mockOnThemeChange).toHaveBeenCalledTimes(1)
    expect(sameTabBar).toBe(tabBar)

    mockGetTheme.mockReturnValue('light')
    const onThemeChange = mockOnThemeChange.mock.calls[0][1]
    onThemeChange({ theme: 'light' })

    expect(tabBar).toMatchObject({
      backgroundColor: '#f8f8f8',
      color: '#000000',
      borderStyle: 'rgba(0, 0, 0, 0.33)',
    })
    expect(tabBar.list[0].iconPath).toBe('/static/light.png')
    expect(useTabBar()).toBe(tabBar)
    expect(mockOnThemeChange).toHaveBeenCalledTimes(1)
  })

  test('does not register a theme listener without tabBar config', () => {
    global.__uniConfig = {} as UniApp.UniConfig

    expect(useTabBar()).toBeUndefined()
    expect(useTabBar()).toBeUndefined()
    expect(mockOnThemeChange).not.toHaveBeenCalled()
  })

  test('allows setTabBarStyle to override the default themed border', async () => {
    const tabBar = useTabBar()!
    expect(tabBar.borderStyle).toBe('rgba(255, 255, 255, 0.33)')

    await new Promise<void>((resolve) => {
      setTabBarStyle({ borderStyle: 'black', success: resolve })
    })
    expect(tabBar.borderStyle).toBe('black')
    expect(tabBar.borderColor).toBeUndefined()
  })
})
