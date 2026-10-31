const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
const PAGE_PATH = '/pages/component/live-player/live-player'
const NAV_BAR_HEIGHT = 44

describe('component-live-player', () => {
  if (isWeb || isMP || isHarmony) {
    // 不支持program.swipe
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('跳过横屏模式', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(800)
  })

  it('keeps vertical scroll-view from horizontal scrolling', async () => {
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const scrollView = await page.$('#live-player-scroll-view')
    const initialScrollLeft = await scrollView.property('scrollLeft')
    const rect = await page.callMethod('getScrollViewRectForTest')
    expect(rect).not.toBeNull()

    const y = Math.round(rect.y + windowInfo.safeAreaInsets.top + NAV_BAR_HEIGHT + 50)

    await program.swipe({
      startPoint: {
        x: 200,
        y
      },
      endPoint: {
        x: 100,
        y
      },
      duration: 300,
    })
    await page.waitFor(500)

    const scrollLeft = await scrollView.property('scrollLeft')
    expect(initialScrollLeft).toBe(0)
    expect(scrollLeft).toBe(0)
  })
})
