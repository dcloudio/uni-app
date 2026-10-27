const PAGE_PATH = '/pages/component/list-view/scroll-anchoring'
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
    await page.waitFor(800)
  })

  it('keeps probe item position stable after prepend', async () => {
    await page.callMethod('jest_reset')
    await page.waitFor(500)

    await page.callMethod('jest_scrollToProbePosition')
    await page.waitFor(600)

    const probeItemId = await page.callMethod('jest_getProbeItemId')
    const beforeMetrics = await page.callMethod('jest_getItemMetrics', probeItemId)
    const beforeScrollTop = await page.callMethod('jest_getScrollTop')

    await page.callMethod('jest_prependItems')
    await page.waitFor(600)

    const afterMetrics = await page.callMethod('jest_getItemMetrics', probeItemId)
    const afterScrollTop = await page.callMethod('jest_getScrollTop')

    expect(afterScrollTop).toBeGreaterThan(beforeScrollTop)
    expect(Math.abs(afterMetrics.relativeTop - beforeMetrics.relativeTop)).toBeLessThanOrEqual(8)
    expect(afterMetrics.itemBottom).toBeGreaterThan(afterMetrics.listTop)
  })

  it('keeps probe item position stable after append', async () => {
    await page.callMethod('jest_reset')
    await page.waitFor(500)

    await page.callMethod('jest_scrollToProbePosition')
    await page.waitFor(600)

    const probeItemId = await page.callMethod('jest_getProbeItemId')
    const beforeMetrics = await page.callMethod('jest_getItemMetrics', probeItemId)
    const beforeScrollTop = await page.callMethod('jest_getScrollTop')

    await page.callMethod('jest_appendItems')
    await page.waitFor(600)

    const afterMetrics = await page.callMethod('jest_getItemMetrics', probeItemId)
    const afterScrollTop = await page.callMethod('jest_getScrollTop')

    expect(Math.abs(afterScrollTop - beforeScrollTop)).toBeLessThanOrEqual(4)
    expect(Math.abs(afterMetrics.relativeTop - beforeMetrics.relativeTop)).toBeLessThanOrEqual(8)
    expect(afterMetrics.itemBottom).toBeGreaterThan(afterMetrics.listTop)
  })
})
