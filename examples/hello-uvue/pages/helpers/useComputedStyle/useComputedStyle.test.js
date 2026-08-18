const PAGE_PATH = '/pages/helpers/useComputedStyle/useComputedStyle'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')

describe('useComputedStyle', () => {
  if (isMP || isWeb || (isAndroid && platformInfo.indexOf('14') > -1)) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page = null

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('toggle class', async () => {
    const btn = await page.$('.toggle-class-btn')
    await btn.tap()
    await page.waitFor(500)
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
    await btn.tap()
    await page.waitFor(500)
  })

  it('toggle style', async () => {
    const btn = await page.$('.toggle-style-btn')
    await btn.tap()
    await page.waitFor(500)
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
    await btn.tap()
    await page.waitFor(500)
  })
})