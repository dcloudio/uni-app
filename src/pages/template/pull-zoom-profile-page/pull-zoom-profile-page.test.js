const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const PAGE_PATH = '/pages/template/pull-zoom-profile-page/pull-zoom-profile-page'

function parseScale(transform) {
  const matched = transform.match(/scale\(([^)]+)\)/)
  return matched ? parseFloat(matched[1]) : 1
}

function parseTranslateY(transform) {
  const matched = transform.match(/translateY\(([-0-9.]+)px\)/)
  return matched ? parseFloat(matched[1]) : 0
}

async function getTransformState(page) {
  return await page.data('data')
}

describe('pull-zoom-profile-page', () => {
  if (!isApp) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  async function scrollTo(scrollTop) {
    const scrollView = await page.$('scroll-view')
    expect(scrollView).not.toBeNull()

    if (typeof scrollView.scrollTo == 'function') {
      await scrollView.scrollTo(0, scrollTop)
    } else {
      await program.pageScrollTo(scrollTop)
    }
    await page.waitFor(500)
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1000)
  })

  beforeEach(async () => {
    await scrollTo(0)
    await page.callMethod('jest_applyScroll', 0)
    await page.callMethod('jest_applyPulling', 0)
  })

  it('renders profile header and content list', async () => {
    const username = await page.$('.username')
    const slogan = await page.$('.slogan')
    const avatar = await page.$('.avatar')
    const items = await page.$$('.list-item')

    expect(username).not.toBeNull()
    expect(slogan).not.toBeNull()
    expect(avatar).not.toBeNull()
    expect(await username.text()).toBe('uni-app-x')
    expect(await slogan.text()).toBe('一次开发，多端覆盖')
    expect(items.length).toBe(30)
    expect(await items[0].text()).toContain('1. 占位')
  })

  it('updates header wrapper and profile transforms while scrolling', async () => {
    const headerWrapper = await page.$('.header-wrapper')
    const userInfo = await page.$('.user-info')

    await scrollTo(0)
    expect(parseTranslateY(await headerWrapper.style('transform'))).toBe(0)
    expect(parseScale(await userInfo.style('transform'))).toBeCloseTo(1, 2)

    await scrollTo(80)
    expect(parseTranslateY(await headerWrapper.style('transform'))).toBe(0)
    expect(parseScale(await userInfo.style('transform'))).toBeCloseTo(0.7333, 2)

    await scrollTo(120)
    expect(parseTranslateY(await headerWrapper.style('transform'))).toBeGreaterThan(0)
    expect(parseScale(await userInfo.style('transform'))).toBeCloseTo(0.7, 2)
  })

  it('caps profile shrink and restores transforms after scrolling back', async () => {
    const headerWrapper = await page.$('.header-wrapper')
    const userInfo = await page.$('.user-info')

    await scrollTo(300)
    expect(parseTranslateY(await headerWrapper.style('transform'))).toBeCloseTo(190, 0)
    expect(parseScale(await userInfo.style('transform'))).toBeCloseTo(0.7, 2)

    await scrollTo(0)
    expect(parseTranslateY(await headerWrapper.style('transform'))).toBe(0)
    expect(parseScale(await userInfo.style('transform'))).toBeCloseTo(1, 2)
  })

  it('scales both header images together while pulling', async () => {
    await page.callMethod('jest_applyPulling', 50)
    let state = await getTransformState(page)
    const smallPullScale = parseScale(state.headerImgTransform)
    expect(smallPullScale).toBeCloseTo(1.25, 2)
    expect(parseScale(state.headerPullImgTransform)).toBeCloseTo(smallPullScale, 2)

    await page.callMethod('jest_applyPulling', 100)
    state = await getTransformState(page)
    const largePullScale = parseScale(state.headerImgTransform)
    expect(largePullScale).toBeGreaterThan(smallPullScale)
    expect(largePullScale).toBeCloseTo(1.5, 2)
    expect(parseScale(state.headerPullImgTransform)).toBeCloseTo(largePullScale, 2)
  })
});
