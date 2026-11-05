jest.setTimeout(30000)

const PAGE_PATH = '/pages/component/waterflow/waterflow-refresher-props'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('waterflow-refresher-props', () => {
  if (isWeb || isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('waterflow')
    await page.waitFor(500)
  })

  it('screenshot', async () => {
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })

  if (isAndroid && isVapor) {
    it('check_android_refresher_color', async () => {
      await page.callMethod('setAndroidRefresherColorForTest', '#0000ff')
      await page.waitFor(100)

      expect(await page.callMethod('getAndroidRefresherColorForTest')).toBe('#0000ff')

      const image = await program.screenshot({ fullPage: true })
      expect(image).toSaveImageSnapshot()
    })
  }
})
