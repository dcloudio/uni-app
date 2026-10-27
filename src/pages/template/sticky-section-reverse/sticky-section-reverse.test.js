const PAGE_PATH = '/pages/template/sticky-section-reverse/sticky-section-reverse'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('template-sticky-section-reverse', () => {
  if ((!isAndroid && !isIOS && !isHarmony) || isAppWebView || !isVapor) {
    it('app vapor only', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('sticky-section')
    await page.waitFor(800)
  })

  it('keeps sticky sections correct after reversing and scrolling', async () => {
    await page.callMethod('applyOrder', true)
    await page.waitFor(500)

    const state = await page.callMethod('jest_getState')
    expect(state.reversed).toBe(true)
    expect(state.firstSectionKey).toBe('2026-07')
    expect(state.lastSectionKey).toBe('2024-09')

    const topImage = await program.screenshot()
    expect(topImage).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'sticky-section-reverse-top'
      }
    })

    const firstScrollSucceeded = await page.callMethod('jest_scrollTo', 500)
    expect(firstScrollSucceeded).toBe(true)
    await page.waitFor(500)
    const firstScrollImage = await program.screenshot()
    expect(firstScrollImage).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'sticky-section-reverse-scroll-1'
      }
    })

    const secondScrollSucceeded = await page.callMethod('jest_scrollTo', 1000)
    expect(secondScrollSucceeded).toBe(true)
    await page.waitFor(500)
    const secondScrollImage = await program.screenshot()
    expect(secondScrollImage).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'sticky-section-reverse-scroll-2'
      }
    })
  })
})
