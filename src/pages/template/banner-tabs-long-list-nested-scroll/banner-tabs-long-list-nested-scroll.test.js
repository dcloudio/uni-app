const PAGE_PATH = '/pages/template/banner-tabs-long-list-nested-scroll/banner-tabs-long-list-nested-scroll'
const ACTIVE_COLOR = '#007AFF'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
// 把不同平台返回的颜色格式统一成 #RRGGBB，避免因为格式不同导致误判
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

describe('template-banner-tabs-long-list-nested-scroll', () => {
  if (!isApp) {
    it('skip non-app platform', () => {
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

  it('renders nested scroll banner tabs and initial list', async () => {
    const swipers = await page.$$('swiper')
    const tabs = await page.$$('.swiper-tabs-item')
    const firstListState = await page.callMethod('jest_getListState', 0)
    const secondListState = await page.callMethod('jest_getListState', 1)
    const pageState = await page.callMethod('jest_getState')

    expect(swipers.length).toBe(2)
    expect(tabs.length).toBe(4)
    expect(await tabs[0].text()).toBe('最新上架')
    expect(await tabs[1].text()).toBe('免费热榜')
    expect(pageState.currentType).toBe('UpdatedDate')
    expect(pageState.nestedScrollChildId).toBe('list-id-1')
    expect(firstListState.renderedCount).toBe(10)
    expect(firstListState.firstTitle).toBe('UpdatedDate mock 1')
    expect(secondListState.renderedCount).toBe(0)
    await expectTabActive(tabs, 0, 1)
  })

  it('switches tab state and nested child binding after tapping', async () => {
    const tabs = await page.$$('.swiper-tabs-item')

    await tabs[1].tap()
    await waitForSwiperCurrent(1)
    const secondListState = await waitForListState(1, (state) => state != null && state.renderedCount > 0)
    const pageState = await page.callMethod('jest_getState')

    expect(pageState.currentType).toBe('FreeHot')
    expect(pageState.nestedScrollChildId).toBe('list-id-2')
    expect(secondListState.firstTitle).toBe('FreeHot mock 1')
    await expectTabActive(tabs, 1, 0)
  })

  it('supports programmatic switch to the last list tab', async () => {
    const changed = await page.callMethod('jest_setSwiperCurrent', 3)
    expect(changed).toBe(true)
    await waitForSwiperCurrent(3)

    const fourthListState = await waitForListState(3, (state) => state != null && state.renderedCount > 0)
    const pageState = await page.callMethod('jest_getState')

    expect(pageState.currentType).toBe('HotList')
    expect(pageState.nestedScrollChildId).toBe('list-id-4')
    expect(fourthListState.firstTitle).toBe('HotList mock 1')
  })
})
