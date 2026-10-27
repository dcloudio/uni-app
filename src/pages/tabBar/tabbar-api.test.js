const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony

const PAGE_PATH = '/pages/tabBar/API'
const COMPONENT_PAGE_PATH = '/pages/tabBar/component'
const TAB_BAR_INDEX = 1
const DEFAULT_TAB_BAR_STYLE = {
  color: '#7A7E83',
  selectedColor: '#007AFF',
  backgroundColor: '#F8F8F8',
  borderStyle: 'black'
}
const DEFAULT_TAB_BAR_ITEM = {
  visible: true,
  index: TAB_BAR_INDEX,
  text: '接口',
  iconPath: '/static/api.png',
  selectedIconPath: '/static/apiHL.png'
}

describe('tab bar api screenshot', () => {
  if (!isApp) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let screenShotOptions = { fullPage: true }

  async function callUniMethod(method, options) {
    return await program.callUniMethod(method, options)
  }

  async function ignoreUniMethodError(method, options) {
    try {
      await callUniMethod(method, options)
    } catch (_) {}
  }

  async function resetTabBar() {
    await ignoreUniMethodError('showTabBar')
    await ignoreUniMethodError('removeTabBarBadge', { index: TAB_BAR_INDEX })
    await ignoreUniMethodError('hideTabBarRedDot', { index: TAB_BAR_INDEX })
    await ignoreUniMethodError('setTabBarStyle', DEFAULT_TAB_BAR_STYLE)
    await ignoreUniMethodError('setTabBarItem', DEFAULT_TAB_BAR_ITEM)
    await page.waitFor(500)
  }

  async function openPage(path = PAGE_PATH) {
    page = await program.reLaunch(path)
    await page.waitFor('view')
    await resetTabBar()
  }

  async function screenshot() {
    await page.waitFor(1000)
    const image = await program.screenshot(screenShotOptions)
    expect(image).toSaveImageSnapshot()
  }

  beforeAll(async () => {
    const windowInfo = await program.callUniMethod('getWindowInfo')
    screenShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44
      }
    }
  })

  beforeEach(async () => {
    await openPage()
  })

  afterEach(async () => {
    await resetTabBar()
  })

  afterAll(async () => {
    if (page != null) {
      await resetTabBar()
    }
  })

  it('set tab bar item text screenshot', async () => {
    await callUniMethod('setTabBarItem', {
      ...DEFAULT_TAB_BAR_ITEM,
      text: 'API'
    })
    await screenshot()
  })

  it('set tab bar item long title screenshot', async () => {
    await callUniMethod('setTabBarItem', {
      ...DEFAULT_TAB_BAR_ITEM,
      text: '超长标题内容超长标题内容超长标题内容超长标题测试',
      iconPath: '',
      selectedIconPath: ''
    })
    await screenshot()
  })

  it('set tab bar style screenshot', async () => {
    await callUniMethod('setTabBarStyle', {
      color: '#FFF',
      selectedColor: '#007AFF',
      backgroundColor: '#000000',
      borderStyle: 'black'
    })
    await screenshot()
  })

  it('show tab bar red dot screenshot', async () => {
    await callUniMethod('showTabBarRedDot', { index: TAB_BAR_INDEX })
    await screenshot()
  })

  it('set tab bar badge screenshot', async () => {
    await callUniMethod('setTabBarBadge', {
      index: TAB_BAR_INDEX,
      text: '1'
    })
    await screenshot()
  })

  it('hide tab bar screenshot', async () => {
    await callUniMethod('hideTabBar')
    await screenshot()
  })

  it('preview image dialogPage cover tab bar screenshot', async () => {
    await openPage(COMPONENT_PAGE_PATH)
    await screenshot()
    await page.callMethod('openPreviewImageTest')
    await screenshot()
    await page.callMethod('closePreviewImageTest')
    await page.waitFor(500)
  })
})
