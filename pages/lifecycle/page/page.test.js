jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
// TODO: harmony 暂不支持部分 API
const isHarmony = platformInfo.includes('harmony')

const OPTIONS_PAGE_PATH = '/pages/lifecycle/page/page-options'
const COMPOSITION_PAGE_PATH = '/pages/lifecycle/page/page-composition'
const HOME_PATH = '/pages/index/index'
let page
let lifeCycleNum

const initLifecycle = async () => {
  page = await program.reLaunch(HOME_PATH)
  await page.waitFor(1000)
  await page.callMethod('setLifeCycleNum', 0)
  lifeCycleNum = await page.callMethod('getLifeCycleNum')
  expect(lifeCycleNum).toBe(0)
}
const testPageLifecycle = async (pagePath) => {
  // onLoad onShow onReady onResize
  page = await program.reLaunch(pagePath)
  await page.waitFor(1000)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(120)
  await page.callMethod('pageSetLifeCycleNum', 0)

  // onPullDownRefresh
  if (!isHarmony) {
    // TODO: harmony 不支持 pullDownRefresh
    await page.callMethod('pullDownRefresh')
    await page.waitFor(1500)
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(10)
    await page.callMethod('pageSetLifeCycleNum', 0)
  }

  if (!isMP && !isHarmony) {
    // TODO: harmony 不支持 pageScrollTo
    // onPageScroll onReachBottom
    await program.pageScrollTo(2000)
    await page.waitFor(1000)
    const dataInfo = await page.data('dataInfo')
    expect(dataInfo.isScrolled).toBe(true)
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(10)
    await page.callMethod('pageSetLifeCycleNum', 0)
  }
  // onHide
  page = await program.navigateTo(HOME_PATH)
  await page.waitFor('view')
  lifeCycleNum = await page.callMethod('getLifeCycleNum')
  expect(lifeCycleNum).toBe(-10)
  page = await program.navigateBack()
  await page.waitFor('view')
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(0)

  // onUnload
  page = await program.reLaunch(HOME_PATH)
  await page.waitFor(700)
  lifeCycleNum = await page.callMethod('getLifeCycleNum')
  expect(lifeCycleNum).toBe(-100)
  await page.callMethod('setLifeCycleNum', 0)

  // onBackPress
  page = await program.navigateTo(pagePath)
  await page.waitFor(700)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(120)
  page = await program.navigateBack()
  await page.waitFor('view')
  lifeCycleNum = await page.callMethod('getLifeCycleNum')
  // 微信小程序不会触发onBackPress
  expect(lifeCycleNum).toBe(isMP ? 20 : 10)
  await page.callMethod('setLifeCycleNum', 0)
}

describe('page-lifecycle', () => {
  it('page-lifecycle options API', async () => {
    await initLifecycle()
    await testPageLifecycle(OPTIONS_PAGE_PATH)
  })

  it('page-lifecycle composition API', async () => {
    await initLifecycle()
    await testPageLifecycle(COMPOSITION_PAGE_PATH)
  })

  afterAll(async () => {
    const resetLifecycleNum = 1110
    await page.callMethod('setLifeCycleNum', resetLifecycleNum)
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(resetLifecycleNum)
  })
})