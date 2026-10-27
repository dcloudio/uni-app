jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

const API_PAGE_PATH = '/pages/tabBar/API'
const COMPONENT_PAGE_PATH = '/pages/tabBar/component'
const API_TAB_INDEX = 1
const COMPONENT_TAB_INDEX = 0
const TAB_BAR_ITEM_COUNT = 5

describe('tab bar lifecycle', () => {
  if (!isApp || !isVapor) {
    it('only supports app vapor', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function tapTabBarItem(index) {
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const itemWidth = windowInfo.screenWidth / TAB_BAR_ITEM_COUNT
    await program.tap({
      x: Math.round(itemWidth * (index + 0.5)),
      y: Math.round(windowInfo.screenHeight - windowInfo.safeAreaInsets.bottom - 25)
    })
    await page.waitFor(500)
    page = await program.currentPage()
  }

  beforeAll(async () => {
    page = await program.reLaunch(API_PAGE_PATH)
    await page.waitFor('view')
  })

  it('onTabItemTap', async () => {
    expect(await page.callMethod('getOnTabItemTapTestResult')).toEqual({
      count: 0,
      index: -1,
      text: '',
      pagePath: ''
    })

    await tapTabBarItem(API_TAB_INDEX)
    expect(page.path).toBe(API_PAGE_PATH.substring(1))
    expect(await page.callMethod('getOnTabItemTapTestResult')).toEqual({
      count: 1,
      index: API_TAB_INDEX,
      text: '接口',
      pagePath: API_PAGE_PATH.substring(1)
    })

    await tapTabBarItem(COMPONENT_TAB_INDEX)
    expect(page.path).toBe(COMPONENT_PAGE_PATH.substring(1))
    expect(await page.callMethod('getOnTabItemTapTestResult')).toEqual({
      count: 1,
      index: COMPONENT_TAB_INDEX,
      text: '组件',
      pagePath: COMPONENT_PAGE_PATH.substring(1)
    })

    await tapTabBarItem(API_TAB_INDEX)
    expect(page.path).toBe(API_PAGE_PATH.substring(1))
    expect(await page.callMethod('getOnTabItemTapTestResult')).toEqual({
      count: 2,
      index: API_TAB_INDEX,
      text: '接口',
      pagePath: API_PAGE_PATH.substring(1)
    })
  })
})
