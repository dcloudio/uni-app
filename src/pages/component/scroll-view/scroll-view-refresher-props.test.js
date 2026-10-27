jest.setTimeout(30000)

const PAGE_PATH = '/pages/component/scroll-view/scroll-view-refresher-props'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('scroll-view-refresher-props', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function performPullRefresh(pullDistance = 180, offsetY = 10) {
    const rect = await page.callMethod('getBoundingClientRectForTest')
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const startX = Math.round(rect.left + rect.width / 2)
    const startY = Math.round(rect.top + offsetY + windowInfo.safeAreaInsets.top + 44)
    const endY = Math.round(startY + pullDistance)

    await program.swipe({
      startPoint: {
        x: startX,
        y: startY
      },
      endPoint: {
        x: startX,
        y: endY
      },
      duration: 500
    })

    await page.waitFor(800)
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
  })

  it('screenshot', async () => {
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })

  if (isAndroid && isVapor) {
    beforeEach(async () => {
      await page.callMethod('resetAndroidOverscrollForTest')
      await page.waitFor(100)
    })

    it('check_android_overscroll', async () => {
      await page.callMethod('setAndroidOverscrollForTest', true)
      await page.callMethod('setRefresherEnabledForTest', false)
      await page.waitFor(100)

      expect(await page.callMethod('getAndroidOverscrollForTest')).toBe(true)
      expect(await page.callMethod('getRefresherRefreshCountForTest')).toBe(0)

      await performPullRefresh()

      expect(await page.callMethod('getAndroidOverscrollForTest')).toBe(true)
      expect(await page.callMethod('getRefresherRefreshCountForTest')).toBe(0)
    })

    it('check_android_refresher_color', async () => {
      await page.callMethod('setAndroidRefresherColorForTest', '#0000ff')
      await page.waitFor(100)

      expect(await page.callMethod('getAndroidRefresherColorForTest')).toBe('#0000ff')

      const image = await program.screenshot({ fullPage: true })
      expect(image).toSaveImageSnapshot()
    })
  }

})
