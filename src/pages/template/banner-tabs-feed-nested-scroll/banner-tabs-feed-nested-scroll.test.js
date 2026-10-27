const PAGE_PATH = '/pages/template/banner-tabs-feed-nested-scroll/banner-tabs-feed-nested-scroll'
const ACTIVE_COLOR = '#007AFF'
const isMpAlipay = process.env.uniTestPlatformInfo.toLocaleLowerCase() === 'mp-alipay'

function normalizeColor(color) {
  if (color == null) {
    return ''
  }

  const value = `${color}`.trim()
  if (value.startsWith('#')) {
    return value.slice(0, 7).toUpperCase()
  }

  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (rgb != null) {
    return `#${[rgb[1], rgb[2], rgb[3]].map((item) => Number(item).toString(16).padStart(2, '0')).join('')}`.toUpperCase()
  }

  return value.toUpperCase()
}

async function expectTabActive(tabs, activeIndex, inactiveIndex) {
  const activeColor = normalizeColor(await tabs[activeIndex].style('color'))
  const inactiveColor = normalizeColor(await tabs[inactiveIndex].style('color'))

  expect(activeColor).toBe(ACTIVE_COLOR)
  expect(inactiveColor).not.toBe('')
  expect(inactiveColor).not.toBe(ACTIVE_COLOR)
}

describe('template-banner-tabs-feed-nested-scroll', () => {
  if (isMpAlipay) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function waitForSwiperCurrent(target, timeout = 4000) {
    const start = Date.now()
    await page.waitFor(async () => {
      const state = await page.callMethod('jest_getState')
      return state != null && state.swiperIndex == target && state.animationFinishIndex == target || Date.now() - start > timeout
    })

    const state = await page.callMethod('jest_getState')
    expect(state.swiperIndex).toBe(target)
    expect(state.animationFinishIndex).toBe(target)
  }

  async function waitForListState(index, matcher, timeout = 5000) {
    const start = Date.now()
    await page.waitFor(async () => {
      const state = await page.callMethod('jest_getListState', index)
      return matcher(state) || Date.now() - start > timeout
    })

    return await page.callMethod('jest_getListState', index)
  }

  async function waitForIndicatorChange(indicator, beforeTransform, beforeWidth, timeout = 4000) {
    const start = Date.now()
    await page.waitFor(async () => {
      const transform = await indicator.style('transform')
      const width = (await indicator.size()).width
      return transform !== beforeTransform || width !== beforeWidth || Date.now() - start > timeout
    })

    const transform = await indicator.style('transform')
    const width = (await indicator.size()).width
    expect(transform !== beforeTransform || width !== beforeWidth).toBe(true)
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor('scroll-view')
    await page.waitFor('swiper')
    await page.waitFor(800)
  })

  beforeEach(async () => {
    await page.callMethod('jest_setSwiperCurrent', 0)
    await page.callMethod('jest_prepareMockData')
    await waitForListState(0, (state) => state != null && state.renderedCount > 0)
    await page.waitFor(200)
  })

  it('renders banner tabs and initial mocked feed list', async () => {
    const swipers = await page.$$('swiper')
    const tabs = await page.$$('.swiper-tabs-item')
    const firstListState = await page.callMethod('jest_getListState', 0)
    const secondListState = await page.callMethod('jest_getListState', 1)
    const pageState = await page.callMethod('jest_getState')

    expect(swipers.length).toBe(2)
    expect(tabs.length).toBe(4)
    expect(await tabs[0].text()).toBe('最新上架')
    expect(await tabs[2].text()).toBe('付费热榜')
    expect(pageState.currentType).toBe('UpdatedDate')
    expect(pageState.nestedScrollChildId).toBe('list-id-1')
    expect(firstListState.renderedCount).toBe(10)
    expect(firstListState.firstTitle).toBe('UpdatedDate mock 1')
    expect(secondListState.renderedCount).toBe(0)
    await expectTabActive(tabs, 0, 1)
  })

  it('updates nested child id and indicator after tapping another tab', async () => {
    const tabs = await page.$$('.swiper-tabs-item')
    const indicator = await page.$('.swiper-tabs-indicator')
    const beforeTransform = await indicator.style('transform')
    const beforeWidth = (await indicator.size()).width

    await tabs[1].tap()
    await waitForSwiperCurrent(1)
    const secondListState = await waitForListState(1, (state) => state != null && state.renderedCount > 0)
    const pageState = await page.callMethod('jest_getState')

    expect(pageState.currentType).toBe('FreeHot')
    expect(pageState.nestedScrollChildId).toBe('list-id-2')
    expect(secondListState.firstTitle).toBe('FreeHot mock 1')
    await expectTabActive(tabs, 1, 0)

    await waitForIndicatorChange(indicator, beforeTransform, beforeWidth)
  })

  it('supports programmatic switch to later feed tabs', async () => {
    const changed = await page.callMethod('jest_setSwiperCurrent', 2)
    expect(changed).toBe(true)
    await waitForSwiperCurrent(2)

    const thirdListState = await waitForListState(2, (state) => state != null && state.renderedCount > 0)
    const pageState = await page.callMethod('jest_getState')

    expect(pageState.currentType).toBe('PaymentHot')
    expect(pageState.nestedScrollChildId).toBe('list-id-3')
    expect(thirdListState.firstTitle).toBe('PaymentHot mock 1')
  })
})
