const PAGE_PATH = '/pages/component/list-view/scroll-into-item'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe(PAGE_PATH, () => {
  if ((!isAndroid && !isIOS && !isHarmony) || isAppWebView || !isVapor) {
    it('app vapor only', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
  })

  it('scrolls item into viewport without section', async () => {
    await page.callMethod('jest_reset')
    await page.waitFor(300)

    await page.callMethod('jest_scrollToTarget', 'item-12')
    await page.waitFor(600)

    const metrics = await page.callMethod('jest_getScrollMetrics', 'item-12')

    expect(metrics.currentTarget).toBe('item-12')
    expect(metrics.scrollTop).toBeGreaterThan(0)
    expect(metrics.targetTop).toBeGreaterThanOrEqual(metrics.viewportTop - 1)
    expect(metrics.targetBottom).toBeLessThanOrEqual(metrics.viewportBottom + 1)
    expect(metrics.targetTop - metrics.viewportTop).toBeLessThanOrEqual(16)
  })
})
