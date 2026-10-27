jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/tabBar/API'
const TAB_BAR_INDEX = 1
const DEFAULT_TAB_BAR_ITEM = {
  visible: true,
  index: TAB_BAR_INDEX,
  text: '接口',
  iconPath: '/static/api.png',
  selectedIconPath: '/static/apiHL.png'
}
const DEFAULT_TAB_BAR_STYLE = {
  color: '#7A7E83',
  selectedColor: '#007AFF',
  backgroundColor: '#F8F8F8',
  borderStyle: 'black'
}

function normalizeColor(value) {
  return value.replace(/\s/g, '')
}

describe('tab bar api on web with darkmode enabled', () => {
  // darkmode 开启后，parseTheme 会创建主题副本，即使当前系统主题为 light。
  if (!isWeb) {
    it('only supports web', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let originalOrientation

  async function resetTabBar() {
    await program.callUniMethod('setTabBarItem', DEFAULT_TAB_BAR_ITEM)
    await program.callUniMethod('setTabBarStyle', DEFAULT_TAB_BAR_STYLE)
    await page.waitFor(100)
  }

  beforeAll(async () => {
    // 仅在当前测试内切换为竖屏，避免宽屏进入 PC 布局后不渲染 tabBar。
    const systemInfo = await program.systemInfo()
    originalOrientation = systemInfo.deviceOrientation
    if (originalOrientation === 'landscape') {
      await program.device.setScreenOrientation('portrait')
    }
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
    const appBaseInfo = await program.callUniMethod('getAppBaseInfo')
    expect(['light', 'dark']).toContain(appBaseInfo.theme)
    const windowInfo = await program.callUniMethod('getWindowInfo')
    if (windowInfo.windowWidth >= 768) {
      throw new Error(
        `tabBar Web test requires a mobile viewport, got ${windowInfo.windowWidth}px`
      )
    }
    await resetTabBar()
  })

  afterEach(async () => {
    await resetTabBar()
  })

  afterAll(async () => {
    if (originalOrientation === 'landscape') {
      await program.device.setScreenOrientation('landscapeLeft')
    }
  })

  it('setTabBarItem updates the rendered text', async () => {
    await program.callUniMethod('setTabBarItem', {
      ...DEFAULT_TAB_BAR_ITEM,
      text: 'API'
    })
    await page.waitFor(100)

    expect(
      await page.callMethod('getTabBarItemText', TAB_BAR_INDEX)
    ).toBe('API')
  })

  it('setTabBarStyle updates the rendered colors', async () => {
    await program.callUniMethod('setTabBarStyle', {
      ...DEFAULT_TAB_BAR_STYLE,
      selectedColor: '#112233',
      backgroundColor: '#445566'
    })
    await page.waitFor(100)

    expect(
      normalizeColor(
        await page.callMethod('getTabBarStyle', 'background-color')
      )
    ).toBe('rgb(68,85,102)')
    expect(
      normalizeColor(
        await page.callMethod('getTabBarItemStyle', TAB_BAR_INDEX, 'color')
      )
    ).toBe('rgb(17,34,51)')
  })
})
