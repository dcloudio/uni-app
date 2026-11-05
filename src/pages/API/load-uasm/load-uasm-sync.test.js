const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('load-uasm-sync', () => {
  if (!isApp || !isVapor) {
    it('skip-current-platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/load-uasm/load-uasm-sync')
    await page.waitFor('view')
    await page.waitFor(2000)
  })

  it('load-uasm-sync.add+contact', async () => {
    const noError = await page.callMethod('test_no_error')
    expect(noError).toBe(true)
  })
})
