const PAGE_PATH = '/pages/template/swipe-tabs-underline/swipe-tabs-underline'
const ACTIVE_COLOR = '#007AFF'

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

describe('template-swipe-tabs-underline', () => {
  let page

  async function launchPage() {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(800)
  }

  async function expectTabActive(tabs, activeIndex, inactiveIndex) {
    const activeColor = normalizeColor(await tabs[activeIndex].style('color'))
    const inactiveColor = normalizeColor(await tabs[inactiveIndex].style('color'))

    expect(activeColor).toBe(ACTIVE_COLOR)
    expect(inactiveColor).not.toBe('')
    expect(inactiveColor).not.toBe(ACTIVE_COLOR)
  }

  async function waitForTabActive(tabs, activeIndex, inactiveIndex) {
    const start = Date.now()
    await page.waitFor(async () => {
      const activeColor = normalizeColor(await tabs[activeIndex].style('color'))
      const inactiveColor = normalizeColor(await tabs[inactiveIndex].style('color'))
      return (activeColor === ACTIVE_COLOR && inactiveColor !== '' && inactiveColor !== ACTIVE_COLOR) || Date.now() - start > 8000
    })

    await expectTabActive(tabs, activeIndex, inactiveIndex)
  }

  async function waitForSwiperCurrent(target) {
    const start = Date.now()
    await page.waitFor(async () => {
      const swiper = await page.$('swiper')
      return await swiper.property('current') == target || Date.now() - start > 8000
    })

    const swiper = await page.$('swiper')
    expect(await swiper.property('current')).toBe(target)
  }

  async function swipeSwiperNext() {
    const tabs = await page.$$('.swiper-tabs-item')
    await tabs[1].tap()
    await waitForSwiperCurrent(1)
  }

  beforeEach(async () => {
    await launchPage()
  })

  it('renders tabs and initial active state', async () => {
    const tabs = await page.$$('.swiper-tabs-item')
    expect(tabs.length).toBe(8)
    expect(await tabs[0].text()).toBe('Tab 0')
    expect(await tabs[7].text()).toBe('Tab        7')
    await expectTabActive(tabs, 0, 1)
    const swiper = await page.$('swiper')
    expect(await swiper.property('current')).toBe(0)
  })

  it('switches current tab after tapping a tab', async () => {
    const tabs = await page.$$('.swiper-tabs-item')
    await tabs[3].tap()
    await waitForSwiperCurrent(3)
    const swiper = await page.$('swiper')
    expect(await swiper.property('current')).toBe(3)
    await waitForTabActive(tabs, 3, 0)
  })

  it('keeps tabs in sync after swiper changes current', async () => {
    const tabs = await page.$$('.swiper-tabs-item')
    const swiper = await page.$('swiper')
    await page.callMethod('jest_setSwiperCurrent', 1)
    await waitForSwiperCurrent(1)
    expect(await swiper.property('current')).toBe(1)
    await waitForTabActive(tabs, 1, 0)
  })

  it('switches back to Tab 0 after returning from a non-zero page', async () => {
    const swiper = await page.$('swiper')
    await swipeSwiperNext()
    expect(await swiper.property('current')).toBe(1)
    const tabs = await page.$$('.swiper-tabs-item')
    await tabs[0].tap()
    await waitForSwiperCurrent(0)
    expect(await swiper.property('current')).toBe(0)
    await waitForTabActive(tabs, 0, 1)
  })
})
