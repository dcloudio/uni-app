const PAGE_PATH = '/pages/template/swipe-tabs-scale-highlight/swipe-tabs-scale-highlight'
const ACTIVE_COLORS = ['rgb(0, 0, 0)', '#000000', '#000000FF']
const INACTIVE_COLORS = ['rgb(85, 85, 85)', '#555555', '#555555FF']
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('template-swipe-tabs-scale-highlight', () => {
  let page

  async function launchPage() {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(800)
  }

  function expectOneOfColor(actualColor, expectedColors) {
    expect(expectedColors).toContain(actualColor)
  }

  async function waitForSwiperCurrent(target) {
    const start = Date.now()
    await page.waitFor(async () => {
      const swiper = await page.$('.swiper-view')
      return await swiper.property('current') == target || Date.now() - start > 8000
    })
    const swiper = await page.$('.swiper-view')
    expect(await swiper.property('current')).toBe(target)
  }

  async function waitForTabTransformChange(tab, beforeTransform) {
    await page.waitFor(async () => {
      const currentTransform = await tab.style('transform')
      return currentTransform !== beforeTransform && currentTransform !== ''
    })
  }

  beforeEach(async () => {
    await launchPage()
  })

  it('renders tabs and initial highlighted state', async () => {
    const tabs = await page.$$('.swiper-tabs-item')
    expect(tabs.length).toBe(4)
    expect(await tabs[0].text()).toBe('Tab 0')
    expect(await tabs[3].text()).toBe('Tab 3')
    expectOneOfColor(await tabs[0].style('color'), ACTIVE_COLORS)
    expectOneOfColor(await tabs[1].style('color'), INACTIVE_COLORS)
    if (!isMP) {
      expect(await tabs[0].style('transform')).not.toBe('none')
    }
    const swiper = await page.$('.swiper-view')
    expect(await swiper.property('current')).toBe(0)
  })

  it('updates highlighted tab after tapping Tab 1', async () => {
    const tabs = await page.$$('.swiper-tabs-item')
    const tab0BeforeTransform = await tabs[0].style('transform')
    const tab1BeforeTransform = await tabs[1].style('transform')

    await tabs[1].tap()
    await waitForSwiperCurrent(1)
    if (!isMP) {
      await waitForTabTransformChange(tabs[1], tab1BeforeTransform)
      await waitForTabTransformChange(tabs[0], tab0BeforeTransform)
    }

    const swiper = await page.$('.swiper-view')
    expect(await swiper.property('current')).toBe(1)
    expectOneOfColor(await tabs[1].style('color'), ACTIVE_COLORS)
    expectOneOfColor(await tabs[0].style('color'), INACTIVE_COLORS)
    if (!isMP) {
      expect(await tabs[1].style('transform')).not.toBe('none')
      expect(await tabs[1].style('transform')).not.toBe(tab1BeforeTransform)
      expect(await tabs[0].style('transform')).not.toBe(tab0BeforeTransform)
    }
  })

  it('keeps highlighted tab in sync after swiper current changes', async () => {
    const tabs = await page.$$('.swiper-tabs-item')

    await page.callMethod('jest_setSwiperCurrent', 2)
    await waitForSwiperCurrent(2)

    const swiper = await page.$('.swiper-view')
    expect(await swiper.property('current')).toBe(2)
    expectOneOfColor(await tabs[2].style('color'), ACTIVE_COLORS)
    expectOneOfColor(await tabs[0].style('color'), INACTIVE_COLORS)
    if (!isMP) {
      expect(await tabs[2].style('transform')).not.toBe('none')
    }
  })

  it('switches back to Tab 0 after returning from a non-zero tab', async () => {
    const tabs = await page.$$('.swiper-tabs-item')
    await tabs[2].tap()
    await waitForSwiperCurrent(2)

    await tabs[0].tap()
    await waitForSwiperCurrent(0)

    const swiper = await page.$('.swiper-view')
    expect(await swiper.property('current')).toBe(0)
    expectOneOfColor(await tabs[0].style('color'), ACTIVE_COLORS)
    expectOneOfColor(await tabs[2].style('color'), INACTIVE_COLORS)
    if (!isMP) {
      expect(await tabs[0].style('transform')).not.toBe('none')
    }
  })

})
