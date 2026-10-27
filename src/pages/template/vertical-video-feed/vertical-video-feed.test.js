const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isAndroid = platformInfo.startsWith('android')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"
const PAGE_PATH = '/pages/template/vertical-video-feed/vertical-video-feed'

jest.setTimeout(60000)

describe('vertical-video-feed', () => {
  if (!isAndroid) {
    it('only support android', () => {
      expect(1).toBe(1)
    })
    return
  }
  if (isVapor) {
    it('skip vapor', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function openPage() {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(2000)
  }

  async function waitForState(getter, matcher, timeout = 8000) {
    const start = Date.now()
    await page.waitFor(async () => {
      const value = await page.callMethod(getter)
      return matcher(value) || Date.now() - start > timeout
    })
    return await page.callMethod(getter)
  }

  async function switchToVideo(index) {
    const swiper = await page.$('swiper')
    try {
      await swiper.swipeTo(index)
      await page.waitFor(1000)
    } catch (_) {
      // Fall back when element.swipeTo is not supported in current environment.
    }

    const current = await page.callMethod('jest_getCurrent')
    if (current != index) {
      await page.callMethod('jest_switchTo', index)
    }

    return await waitForState('jest_getCurrent', (value) => value == index)
  }

  beforeAll(async () => {
    await openPage()
  })

  if (!isAppWebView) {
    it('screenshot', async () => {
      const image = await program.screenshot({
        fullPage: true,
      })
      expect(image).toSaveImageSnapshot()
    })
  }

  it('can play after tapping video', async () => {
    await openPage()
    const videoCover = await page.$('.video-cover')
    let stateList = await page.callMethod('jest_getStateList')

    if (stateList[0] == 'play') {
      await videoCover.tap()
      stateList = await waitForState('jest_getStateList', (value) => value != null && value[0] == 'pause')
      expect(stateList[0]).toBe('pause')
    }

    await videoCover.tap()
    stateList = await waitForState('jest_getStateList', (value) => value != null && value[0] == 'play')
    expect(stateList[0]).toBe('play')
  })

  it('can switch up two videos with supported method', async () => {
    await openPage()
    expect(await page.callMethod('jest_getCurrent')).toBe(0)

    let current = await switchToVideo(1)
    expect(current).toBe(1)

    current = await switchToVideo(2)
    expect(current).toBe(2)
  })

  it('can switch down back to original video with supported method', async () => {
    await openPage()
    let current = await switchToVideo(2)
    expect(current).toBe(2)

    current = await switchToVideo(1)
    expect(current).toBe(1)

    current = await switchToVideo(0)
    expect(current).toBe(0)
  })

  it('can open comment list', async () => {
    await openPage()
    const commentBtn = await page.$('.comment-btn')
    await commentBtn.tap()
    const isPanelShown = await waitForState('jest_isCommentPanelShown', (value) => value == true)
    expect(isPanelShown).toBe(true)

    const panel = await page.$('.comment-panel')
    const { height } = await panel.size()
    expect(height).toBeGreaterThan(0)

    const commentItems = await page.$$('.comment-item')
    expect(commentItems.length).toBeGreaterThan(0)
  })

  it('can close comment list by tapping mask', async () => {
    await openPage()
    const commentBtn = await page.$('.comment-btn')
    await commentBtn.tap()
    let isPanelShown = await waitForState('jest_isCommentPanelShown', (value) => value == true)
    expect(isPanelShown).toBe(true)

    const mask = await page.$('.popup-mask')
    await mask.tap()
    isPanelShown = await waitForState('jest_isCommentPanelShown', (value) => value == false)
    expect(isPanelShown).toBe(false)
  })
})
