const PAGE_PATH = '/pages/component/list-view/scroll-into-section'
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

  async function expectTargetVisible(targetId, nearTop = true, requireFullVisible = true) {
    await page.callMethod('jest_reset')
    await page.waitFor(300)

    await page.callMethod('jest_scrollToTarget', targetId)
    await page.waitFor(700)

    const metrics = await page.callMethod('jest_getScrollMetrics', targetId)

    expect(metrics.currentTarget).toBe(targetId)
    expect(metrics.scrollTop).toBeGreaterThan(0)
    expect(metrics.targetTop).toBeGreaterThanOrEqual(metrics.viewportTop - 1)
    if (requireFullVisible) {
      expect(metrics.targetBottom).toBeLessThanOrEqual(metrics.viewportBottom + 1)
    } else {
      expect(metrics.targetBottom).toBeGreaterThan(metrics.viewportTop - 1)
    }
    if (nearTop) {
      expect(metrics.targetTop - metrics.viewportTop).toBeLessThanOrEqual(16)
    }
  }

  it('scrolls to item inside sticky-section', async () => {
    await expectTargetVisible('item-4-8', false)
  })

  it('scrolls to sticky-header', async () => {
    await expectTargetVisible('header-4')
  })

  it('scrolls to sticky-section root', async () => {
    await expectTargetVisible('section-4', true, false)
  })
})
