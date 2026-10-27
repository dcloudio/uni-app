jest.setTimeout(60000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/CSS/page-body-scope/page-body-scope'
const DETAIL_PAGE_PATH = '/pages/CSS/page-body-scope/page-body-scope-detail'

// #00cbbb -> rgb(0, 203, 187) (teal, normal: App scoped CSS variable applied)
// #dc2626 -> rgb(220, 38, 38) (red, broken: fallback value, uni-page-body missing App scopeId)
const NORMAL_COLOR = 'rgb(0, 203, 187)'

describe('page-body-scope', () => {
  if (!isWeb) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function getScopeTextColor(p) {
    const el = await p.$('.scope-test-text')
    const color = await el.style('color')
    return color
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('主页面 App scoped CSS 变量生效', async () => {
    await page.waitFor(500)
    const color = await getScopeTextColor(page)
    expect(color).toBe(NORMAL_COLOR)
  })

  it('跳转到第二个页面后 CSS 变量生效', async () => {
    page = await program.navigateTo(DETAIL_PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(500)
    const color = await getScopeTextColor(page)
    expect(color).toBe(NORMAL_COLOR)
  })

  it('返回主页面后 CSS 变量仍然生效', async () => {
    await program.navigateBack()
    await page.waitFor(500)
    page = await program.currentPage()
    const color = await getScopeTextColor(page)
    expect(color).toBe(NORMAL_COLOR)
  })

  it('多次跳转后 CSS 变量始终生效', async () => {
    for (let i = 0; i < 3; i++) {
      page = await program.navigateTo(DETAIL_PAGE_PATH)
      await page.waitFor('view')
      await page.waitFor(500)
      let color = await getScopeTextColor(page)
      expect(color).toBe(NORMAL_COLOR)

      await program.navigateBack()
      await page.waitFor(500)
      page = await program.currentPage()
      color = await getScopeTextColor(page)
      expect(color).toBe(NORMAL_COLOR)
    }
  })
})
