import { normalizeStyles } from '@dcloudio/uni-shared'
import { normalizePagesJson } from '../src/json/pages'
import { normalizeUniAppXAppPagesJson } from '../src/json/uni-x'
import {
  initDefaultTheme,
  normalizeThemeConfig,
  normalizeThemeConfigOnce,
} from '../src/json/theme'

let mockManifest: Record<string, any> = { darkmode: true }

jest.mock('../src/json/manifest', () => ({
  ...jest.requireActual('../src/json/manifest'),
  getPlatformManifestJsonOnce: () => mockManifest,
}))

describe('默认主题', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    mockManifest = { darkmode: true }
    process.env.UNI_PLATFORM = 'h5'
    Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
    delete process.env.UNI_APP_X
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  const createPages = () => ({
    pages: [{ path: 'pages/index/index', style: {} }],
    globalStyle: { navigationBar: {} },
    tabBar: { list: [{ pagePath: 'pages/index/index', text: '首页' }] },
  })

  test('没有 theme.json 时读取完整的默认明暗主题', () => {
    const theme = normalizeThemeConfigOnce()
    expect(theme).toEqual({
      light: {
        navigationBarBackgroundColor: '#FFFFFF',
        navigationBarTextStyle: 'black',
        tabBarBackgroundColor: '#FFFFFF',
        tabBarBorderColor: 'rgba(0, 0, 0, 0.33)',
      },
      dark: {
        navigationBarBackgroundColor: '#1C1C1E',
        navigationBarTextStyle: 'white',
        tabBarBackgroundColor: '#1C1C1E',
        tabBarBorderColor: 'rgba(255, 255, 255, 0.33)',
      },
    })
  })

  test('按主题补齐部分配置，保留用户变量且不修改输入', () => {
    const userTheme = {
      dark: { navigationBarBackgroundColor: '#123456', customColor: '#654321' },
    }
    const theme = normalizeThemeConfig(userTheme)
    expect(theme.light?.navigationBarBackgroundColor).toBe('#FFFFFF')
    expect(theme.dark).toMatchObject({
      navigationBarBackgroundColor: '#123456',
      navigationBarTextStyle: 'white',
      customColor: '#654321',
    })
    expect(userTheme.dark).toEqual({
      navigationBarBackgroundColor: '#123456',
      customColor: '#654321',
    })
  })

  test.each([
    ['black', '#000000'],
    ['white', '#ffffff'],
    ['@missing', '#ffffff'],
  ])('导航栏前景色 %s 解析为 %s', (value, expected) => {
    expect(
      normalizeStyles(
        { titleColor: '@foreground' },
        { dark: { foreground: value } },
        'dark'
      ).titleColor
    ).toBe(expected)
  })

  test.each([undefined, false])('darkmode 为 %s 时不注入默认值', (darkmode) => {
    mockManifest = { darkmode }
    const pages = createPages() as UniApp.PagesJson
    const originalPages = JSON.parse(JSON.stringify(pages))
    initDefaultTheme(pages)
    expect(pages).toEqual(originalPages)
    expect(normalizeThemeConfig({})).toEqual({})
  })

  test.each(['mp-weixin', 'mp-alipay', 'mp-harmony'] as const)(
    '%s 不受默认主题影响',
    (platform) => {
      process.env.UNI_PLATFORM = platform
      const pages = createPages() as UniApp.PagesJson
      const originalPages = JSON.parse(JSON.stringify(pages))
      initDefaultTheme(pages)
      expect(pages).toEqual(originalPages)
      expect(normalizeThemeConfig({})).toEqual({})
    }
  )

  test.each(['h5', 'app', 'app-harmony'] as const)(
    '%s 编译后默认颜色可按主题解析，选中颜色保持原值',
    (platform) => {
      process.env.UNI_PLATFORM = platform
      const pages = normalizePagesJson(JSON.stringify(createPages()), platform)
      const theme = normalizeThemeConfig({})
      for (const [mode, backgroundColor, titleColor, borderColor] of [
        ['light', '#FFFFFF', '#000000', 'rgba(0, 0, 0, 0.33)'],
        ['dark', '#1C1C1E', '#ffffff', 'rgba(255, 255, 255, 0.33)'],
      ] as const) {
        const style = normalizeStyles(pages, theme, mode)
        expect(style.globalStyle.navigationBar).toMatchObject({
          backgroundColor,
          titleColor,
        })
        expect(style.tabBar).toMatchObject({
          backgroundColor,
          selectedColor: '#007aff',
          borderStyle: borderColor,
        })
        expect(style.globalStyle.backgroundColor).toBeUndefined()
      }
    }
  )

  test('保留全局固定色、页面覆盖和平台专属配置', () => {
    const pages = normalizePagesJson(
      JSON.stringify({
        pages: [
          { path: 'pages/index/index', style: {} },
          {
            path: 'pages/about/about',
            style: { navigationBarBackgroundColor: '#345678' },
          },
        ],
        globalStyle: {
          navigationBarBackgroundColor: '#123456',
          web: { navigationBarTextStyle: 'black' },
          backgroundColor: '#abcdef',
        },
        tabBar: {
          backgroundColor: '#234567',
          borderStyle: 'white',
          selectedColor: '#456789',
          list: [{ pagePath: 'pages/index/index', text: '首页' }],
        },
      }),
      'h5'
    )
    const dark = normalizeStyles(pages, normalizeThemeConfig({}), 'dark')
    expect(dark.globalStyle.navigationBar).toMatchObject({
      backgroundColor: '#123456',
      titleColor: '#000000',
    })
    expect(dark.globalStyle.backgroundColor).toBe('#abcdef')
    expect(dark.pages[0].style.navigationBar.backgroundColor).toBeUndefined()
    expect(dark.pages[1].style.navigationBar.backgroundColor).toBe('#345678')
    expect(dark.tabBar).toMatchObject({
      backgroundColor: '#234567',
      borderStyle: 'white',
      selectedColor: '#456789',
    })
    expect(dark.tabBar?.borderColor).toBeUndefined()
  })

  test('保留自定义主题变量与 titleNView 的显式配色', () => {
    process.env.UNI_PLATFORM = 'app'
    const pages = normalizePagesJson(
      JSON.stringify({
        ...createPages(),
        globalStyle: {
          navigationBarBackgroundColor: '@customColor',
          'app-plus': { titleNView: { titleColor: '#000000' } },
        },
      }),
      'app'
    )
    const dark = normalizeStyles(
      pages,
      normalizeThemeConfig({ dark: { customColor: '#123456' } }),
      'dark'
    )
    expect(dark.globalStyle.navigationBar).toMatchObject({
      backgroundColor: '#123456',
      titleColor: '#000000',
    })
  })

  test.each(['h5', 'app'] as const)(
    '%s 默认导航栏按钮不固定为浅色前景，显式颜色保持不变',
    (platform) => {
      process.env.UNI_PLATFORM = platform
      const pages = normalizePagesJson(
        JSON.stringify({
          ...createPages(),
          globalStyle: {
            'app-plus': {
              titleNView: {
                buttons: [{ text: '菜单' }, { text: '关闭', color: '#123456' }],
              },
            },
          },
          pages: [
            {
              path: 'pages/index/index',
              style: {
                'app-plus': { titleNView: { buttons: [{ text: '页面菜单' }] } },
              },
            },
          ],
        }),
        platform
      )
      const expected = platform === 'h5' ? 'currentColor' : undefined
      expect(pages.globalStyle.navigationBar.buttons?.[0].color).toBe(expected)
      expect(pages.globalStyle.navigationBar.buttons?.[1].color).toBe('#123456')
      expect(pages.pages[0].style.navigationBar.buttons?.[0].color).toBe(
        expected
      )
    }
  )

  test('配置 blurEffect 时保留原有背景计算，显式背景色保持不变', () => {
    const pages = createPages() as UniApp.PagesJson
    pages.tabBar!.blurEffect = 'dark'
    initDefaultTheme(pages)
    expect(pages.tabBar!.backgroundColor).toBeUndefined()

    pages.tabBar!.backgroundColor = '#123456'
    initDefaultTheme(pages)
    expect(pages.tabBar!.backgroundColor).toBe('#123456')
  })

  test.each(['h5', 'app'] as const)(
    '%s 自定义前景色主题 key 的按钮继承颜色，固定前景色仍保持固定',
    (platform) => {
      process.env.UNI_PLATFORM = platform
      const source = {
        ...createPages(),
        globalStyle: {
          navigationBarTextStyle: '@myNavigationText',
          'app-plus': { titleNView: { buttons: [{ text: '菜单' }] } },
        },
      }
      const pages = normalizePagesJson(JSON.stringify(source), platform)
      const theme = normalizeThemeConfig({
        light: { myNavigationText: 'black' },
        dark: { myNavigationText: 'white' },
      })
      for (const mode of ['light', 'dark'] as const) {
        const navigationBar = normalizeStyles(
          pages.globalStyle.navigationBar,
          theme,
          mode
        )
        expect(navigationBar.titleColor).toBe(
          mode === 'light' ? '#000000' : '#ffffff'
        )
        expect(navigationBar.buttons?.[0].color).toBe(
          platform === 'h5' ? 'currentColor' : undefined
        )
      }

      source.globalStyle.navigationBarTextStyle = 'black'
      const fixed = normalizePagesJson(JSON.stringify(source), platform)
      expect(fixed.globalStyle.navigationBar.buttons?.[0].color).toBe('#000000')
    }
  )

  test.each(['app-android', 'app-ios', 'app-harmony'] as const)(
    'App X %s 使用原生页面配置和 borderColor',
    (platform) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_PLATFORM = platform === 'app-harmony' ? platform : 'app'
      process.env.UNI_UTS_PLATFORM = platform
      const pages = normalizeUniAppXAppPagesJson(JSON.stringify(createPages()))
      const dark = normalizeStyles(pages, normalizeThemeConfig({}), 'dark')
      expect(dark.globalStyle).toMatchObject({
        navigationBarBackgroundColor: '#1C1C1E',
        navigationBarTextStyle: 'white',
      })
      expect(dark.tabBar).toMatchObject({
        backgroundColor: '#1C1C1E',
        borderColor: 'rgba(255, 255, 255, 0.33)',
      })
      expect(dark.tabBar?.selectedColor).toBeUndefined()
    }
  )
})
