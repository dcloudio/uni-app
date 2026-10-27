jest.setTimeout(30000)

const PAGE_PATH = '/pages/component/glass-effect-view/glass-effect-view'
const NAV_BAR_HEIGHT = 44

describe('glass-effect-view.uvue', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isIOS = platformInfo.startsWith('ios')
  const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

  if (!isIOS || !isVapor) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('dispatches gesture click event', async () => {
    const rect = await page.callMethod('getGlassEffectViewRectForTest')
    expect(rect).not.toBeNull()
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const x = Math.round(rect.x + rect.width / 2)
    const y = Math.round(rect.y + rect.height / 2 + windowInfo.safeAreaInsets.top + NAV_BAR_HEIGHT)

    await program.tap({ x, y, duration: 100 })
    await page.waitFor(300)
    expect(await page.data('data.clickCount')).toBe(1)
  })
})
