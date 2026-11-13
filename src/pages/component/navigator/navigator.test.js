const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isWeixin = platformInfo.startsWith('mp-weixin')

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

describe('navigator 新增跳转示例', () => {
  const itWeixin = isWeixin ? it : it.skip

  async function tapAndWaitForRoute(page, selector, route) {
    await page.waitFor(selector)
    const navigator = await page.$(selector)
    await navigator.tap()
    await page.waitFor(async () => (await program.currentPage()).path === route.substring(1))
    expect((await program.currentPage()).path).toBe(route.substring(1))
  }

  itWeixin('target=self 跳转到当前小程序页面', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('#navigate-self')
    const navigator = await page.$('#navigate-self')
    expect(await navigator.attribute('target')).toBe('self')
    await tapAndWaitForRoute(page, '#navigate-self', PAGE_PATH_NAVIGATE)
  })

  it('delta=1 返回上一页', async () => {
    await program.reLaunch(PAGE_PATH)
    const page = await program.navigateTo(PAGE_PATH_NAVIGATE)
    await tapAndWaitForRoute(page, '#navigate-back-one', PAGE_PATH)
  })

  it('delta=2 跨过中间页返回两层', async () => {
    // 三层使用不同路由，避免只返回一层时也误判为通过。
    await program.reLaunch(PAGE_PATH_REDIRECT)
    await program.navigateTo(PAGE_PATH)
    const page = await program.navigateTo(PAGE_PATH_NAVIGATE)
    await tapAndWaitForRoute(page, '#navigate-back-two', PAGE_PATH_REDIRECT)
  })

  it('delta 超过可返回层数时返回栈底页', async () => {
    await program.reLaunch(PAGE_PATH)
    const page = await program.navigateTo(PAGE_PATH_NAVIGATE)
    await tapAndWaitForRoute(page, '#navigate-back-two', PAGE_PATH)
  })
})
