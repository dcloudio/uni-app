const PAGE_PATH = '/pages/template/scroll-view-sticky-section/scroll-view-sticky-section'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
describe('template-scroll-view-sticky-section', () => {
  if (!isApp) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page

  async function waitForStickyTransform(expectedSticky) {
    const start = Date.now()
    await page.waitFor(async () => {
      const sticky = await page.$('.search')
      const transform = await sticky.style('transform')
      const isSticky = transform.includes('translateY(')
      return isSticky == expectedSticky || Date.now() - start > 3000
    })

    const sticky = await page.$('.search')
    const transform = await sticky.style('transform')
    const isSticky = transform.includes('translateY(')
    expect(isSticky).toBe(expectedSticky)
  }

  async function scrollTo(scrollTop) {
    const scrollView = await page.$('.page')
    expect(scrollView).not.toBeNull()

    if (typeof scrollView.scrollTo == 'function') {
      await scrollView.scrollTo(0, scrollTop)
    } else {
      await program.pageScrollTo(scrollTop)
    }
    await page.waitFor(400)
  }

  async function getStickyThreshold() {
    const sticky = await page.$('.search')
    const scrollView = await page.$('.page')
    const stickyRect = await sticky.offset()
    const scrollRect = await scrollView.offset()
    const threshold = Math.round(stickyRect.top - scrollRect.top)
    return threshold
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor('scroll-view')
    await page.waitFor(800)
  })

  beforeEach(async () => {
    await scrollTo(0)
    await waitForStickyTransform(false)
  })

  it('renders sticky search section and list content', async () => {
    const sticky = await page.$('.search')
    const firstContent = await page.$('.content-item')
    const searchTip = await page.$('.search-tip-text')
    const searchBtn = await page.$('.search-btn')

    expect(sticky).not.toBeNull()
    expect(firstContent).not.toBeNull()
    expect(searchTip).not.toBeNull()
    expect(searchBtn).not.toBeNull()
    expect(await searchTip.text()).toBe('请输入你要搜索的内容')
    expect(await searchBtn.text()).toBe('搜索')
    await waitForStickyTransform(false)
  })

  it('keeps sticky section in normal flow before reaching threshold', async () => {
    const threshold = await getStickyThreshold()
    const beforeThreshold = threshold > 20 ? threshold - 20 : 0

    await scrollTo(beforeThreshold)
    await waitForStickyTransform(false)
  })

  it('sticks search section after scrolling beyond threshold', async () => {
    const threshold = await getStickyThreshold()

    await scrollTo(threshold + 30)
    await waitForStickyTransform(true)
  })

  it('restores sticky section after scrolling back to top', async () => {
    const threshold = await getStickyThreshold()

    await scrollTo(threshold + 30)
    await waitForStickyTransform(true)
    await scrollTo(0)
    await waitForStickyTransform(false)
  })
})
