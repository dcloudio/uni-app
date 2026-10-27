const PAGE_PATH = '/pages/component/list-view/initial-scroll-bottom'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe(PAGE_PATH, () => {
  if ((!isAndroid && !isIOS && !isHarmony) || isAppWebView || !isVapor) {
    it('仅测试 app 平台蒸汽模式', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('#toggle-list-button')
    await page.waitFor(300)
  })

  it('initially scrolls to bottom after list and images are mounted', async () => {
    const button = await page.$('#toggle-list-button')
    await button.tap()
    await page.waitFor('#initial-scroll-bottom-list')
    await page.waitFor(2000)

    const metrics = await page.callMethod('getScrollMetrics')
    expect(metrics.showList).toBe(true)
    expect(metrics.scrollHeight).toBeGreaterThan(metrics.viewportHeight)
    expect(Math.abs(metrics.distanceFromBottom)).toBeLessThanOrEqual(2)

    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
