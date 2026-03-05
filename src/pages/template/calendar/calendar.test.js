const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

const PAGE_PATH = '/pages/template/calendar/calendar'

describe('calendar', () => {
  if (isWeb || isMP || process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true' || isDom2) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })
  it('width', async () => {
    const pageData = await page.data('data')
    expect(pageData.testWidth > 0).toBe(true)
  })
})
