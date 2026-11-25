import fs from 'fs'
import os from 'os'
import path from 'path'

describe('App X 默认主题产物', () => {
  const originalEnv = { ...process.env }
  let inputDir: string

  beforeEach(() => {
    jest.resetModules()
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-pages-theme-'))
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_APP_X = 'true'
    process.env.UNI_COMPILE_EXT_API_PAGE_PATHS = JSON.stringify([
      'pages/index/index',
    ])
    fs.mkdirSync(path.join(inputDir, 'pages/index'), { recursive: true })
    fs.writeFileSync(
      path.join(inputDir, 'pages/index/index.uvue'),
      '<template><view /></template>'
    )
  })

  afterEach(() => {
    fs.rmSync(inputDir, { recursive: true, force: true })
    process.env = { ...originalEnv }
  })

  test.each(
    (
      [
        ['app-ios', 'js', false],
        ['app-ios', 'js', true],
        ['app-harmony', 'js', false],
        ['app-harmony', 'js', true],
        ['app-android', 'android', false],
        ['app-android', 'android', true],
        ['app-android', 'js', false],
      ] as const
    ).flatMap(([platform, engine, hasTheme]) =>
      [false, true].map((vapor) => [platform, engine, hasTheme, vapor] as const)
    )
  )(
    '%s %s 编译入口，theme.json 存在：%s，Vapor：%s',
    (platform, engine, hasTheme, vapor) => {
      // 两种渲染模式都必须写入默认主题，不能只补齐页面中的变量引用。
      if (vapor) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        delete process.env.UNI_APP_X_DOM2
      }
      process.env.UNI_PLATFORM = platform === 'app-harmony' ? platform : 'app'
      process.env.UNI_UTS_PLATFORM = platform
      fs.writeFileSync(
        path.join(inputDir, 'manifest.json'),
        JSON.stringify({
          [platform === 'app-harmony' ? platform : 'app']: { darkmode: true },
        })
      )
      if (hasTheme) {
        fs.writeFileSync(
          path.join(inputDir, 'theme.json'),
          JSON.stringify({ dark: { navigationBarBackgroundColor: '#123456' } })
        )
      }
      const { APP_CONFIG, PAGES_JSON_UTS } = require('@dcloudio/uni-cli-shared')
      const {
        uniAppPagesPlugin,
      } = require(`../src/plugins/${engine}/pagesJson`)
      const plugin = uniAppPagesPlugin()
      const assets: any[] = []
      plugin.transform.call(
        {
          addWatchFile: jest.fn(),
          emitFile: (asset: any) => assets.push(asset),
        },
        JSON.stringify({
          pages: [{ path: 'pages/index/index' }],
          tabBar: { list: [{ pagePath: 'pages/index/index', text: '首页' }] },
        }),
        path.join(inputDir, PAGES_JSON_UTS)
      )

      if (engine === 'js') {
        const source = assets.find(
          (asset) => asset.fileName === APP_CONFIG
        ).source
        const config = new Function(
          'globalThis',
          `${source};return __uniConfig`
        )({})
        expect(config.globalStyle).toMatchObject({
          navigationBarBackgroundColor: '@navigationBarBackgroundColor',
          navigationBarTextStyle: '@navigationBarTextStyle',
        })
        expect(config.tabBar.borderColor).toBe('@tabBarBorderColor')
        expect(config.themeConfig.light.navigationBarBackgroundColor).toBe(
          '#FFFFFF'
        )
        expect(config.themeConfig.dark.navigationBarBackgroundColor).toBe(
          hasTheme ? '#123456' : '#1C1C1E'
        )
        expect(config.themeConfig.dark.navigationBarTextStyle).toBe('white')
      } else {
        const { ENTRY_FILENAME } = require('../src/plugins/android/utils')
        const bundle = { [ENTRY_FILENAME()]: { source: '' } }
        plugin.generateBundle({}, bundle)
        const source = bundle[ENTRY_FILENAME()].source
        expect(source).toContain(
          '["navigationBarTextStyle","@navigationBarTextStyle"]'
        )
        expect(source).toContain('["borderColor","@tabBarBorderColor"]')
        const themeExpression = source.match(
          /__uniConfig.themeConfig = (.+)/
        )![1]
        const theme = new Function('_uM', `return ${themeExpression}`)(
          (entries: [string, unknown][]) => new Map(entries)
        )
        expect(theme.get('light').get('navigationBarBackgroundColor')).toBe(
          '#FFFFFF'
        )
        expect(theme.get('dark').get('navigationBarBackgroundColor')).toBe(
          hasTheme ? '#123456' : '#1C1C1E'
        )
        expect(theme.get('dark').get('navigationBarTextStyle')).toBe('white')
        expect(theme.get('dark').get('tabBarBorderColor')).toBe(
          'rgba(255, 255, 255, 0.33)'
        )
      }
    }
  )
})
