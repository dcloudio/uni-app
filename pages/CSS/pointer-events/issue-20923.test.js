const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/CSS/pointer-events/issue-20923'

describe('issue-20923', () => {
  // 此测试例暂时只对鸿蒙开放
  if(!isHarmony) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('issue-20923', async () => {
    const windowInfo = await program.callUniMethod('getWindowInfo');
    const windowCenterX = windowInfo.windowWidth / 2
    const windowCenterY = windowInfo.statusBarHeight + 44 + windowInfo.windowHeight / 2
    await program.tap({
      x:  windowCenterX,
      y:  windowCenterY - 100,
    })
    await page.waitFor(300)
    const jest_result_1 = await page.callMethod("get_jest_result")
    expect(jest_result_1.length).toBe(1)
    expect(jest_result_1[0]).toBe(0)
    await program.tap({
      x: windowCenterX,
      y: windowCenterY,
    })
    await page.waitFor(300)
    const jest_result_2 = await page.callMethod("get_jest_result")
    expect(jest_result_2.length).toBe(2)
    expect(jest_result_2[1]).toBe(0)
  })
});
