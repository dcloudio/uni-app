const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/template/long-list-perf/long-list-perf'

describe('long-list-perf', () => {
  if (!isAndroid || !isVapor) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(5000)
  })

  it('scrolls to 500px and saves a screenshot', async () => {
    const didScroll = await page.callMethod('jest_scrollTo', 500)
    expect(didScroll).toBe(true)
    await page.waitFor(500)

    const image = await program.device.screenshot()
    expect(image).toSaveImageSnapshot()
  })
})
