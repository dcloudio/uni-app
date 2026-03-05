const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.includes('android')
const isIOS = platformInfo.includes('ios')
const OPTIONS_PAGE_PATH = '/pages/error/throw-error/throw-error-options'
const COMPOSITION_PAGE_PATH = '/pages/error/throw-error/throw-error-composition'
const HOME_PAGE_PATH = '/pages/index/index'

describe('throw error', () => {
  let page
  let lifeCycleNum
  const initLifecycle = async () => {
    page = await program.reLaunch(HOME_PAGE_PATH)
    await page.waitFor('view')
    await page.callMethod('setLifeCycleNum', 0)
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(0)
  }
  const test = async (pagePath) => {
    await initLifecycle()
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    expect(page.path).toBe(pagePath.substring(1))

    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(100)

    const triggerErrorBtn = await page.$('#trigger-error')
    await triggerErrorBtn.tap()
    await page.waitFor(500)

    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(200)

    if (isAndroid || isIOS) {
      const triggerTimeoutErrorBtn = await page.$('#trigger-timeout-error')
      await triggerTimeoutErrorBtn.tap()
      await page.waitFor(500)

      lifeCycleNum = await page.callMethod('getLifeCycleNum')
      expect(lifeCycleNum).toBe(300)
    }

    page = await program.navigateTo(HOME_PAGE_PATH)
    await page.waitFor('view')
    expect(page.path).toBe(HOME_PAGE_PATH.substring(1))
  }
  it('onError options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })
  it('onError composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })

  afterAll(async () => {
    const resetLifecycleNum = 1110
    await page.callMethod('setLifeCycleNum', resetLifecycleNum)
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(resetLifecycleNum)
  })
})