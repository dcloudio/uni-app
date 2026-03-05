const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/component/navigator/navigator'
const PAGE_PATH_NAVIGATE = '/pages/component/navigator/navigate'
const PAGE_PATH_REDIRECT = '/pages/component/navigator/redirect'

describe('navigator', () => {
  let page
  beforeAll(async () => {
    if (isWeb) {
      // 由于开发期间跳转页面需要编译，web端先跳转一次
      await program.reLaunch(PAGE_PATH_NAVIGATE)
      await program.reLaunch(PAGE_PATH_REDIRECT)
    }
  })
  it('navigate', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)

    const btnNavigate = await page.$('#navigate')
    await btnNavigate.tap()
    await page.waitFor(500)

    const currentPage = await program.currentPage()
    expect(currentPage.path).toBe(PAGE_PATH_NAVIGATE.substring(1))
    await page.waitFor(1000)
  })
  it('redirect', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(1000)

    const btnRedirect = await page.$('#redirect')
    await btnRedirect.tap()
    await page.waitFor(500)

    const currentPage = await program.currentPage()
    expect(currentPage.path).toBe(PAGE_PATH_REDIRECT.substring(1))
  })
})
