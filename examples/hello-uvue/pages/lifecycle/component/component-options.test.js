const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const PAGE_PATH = '/pages/lifecycle/component/component-options'
const HOME_PATH = '/pages/index/index'

describe('component-lifecycle', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  let lifeCycleNum
  beforeAll(async () => {
    page = await program.reLaunch(HOME_PATH)
    await page.waitFor(700)
    const initLifecycleNum = 0
    await page.callMethod('setLifeCycleNum', initLifecycleNum)
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(initLifecycleNum)

    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor(700)
  })
  afterAll(async () => {
    const resetLifecycleNum = 1110
    await page.callMethod('setLifeCycleNum', resetLifecycleNum)
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(resetLifecycleNum)
  })

  it('beforeCreate created beforeMount mounted activated', async () => {
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(5)
  })
  it('deactivated', async () => {
    const toggleAliveComponentBtn = await page.$('#toggle-alive-component-btn')
    await toggleAliveComponentBtn.tap()
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(4)
    await toggleAliveComponentBtn.tap()
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(5)
  })
  it('beforeUpdate updated', async () => {
    const updateTitleBtn = await page.$('.component-lifecycle-btn')
    await updateTitleBtn.tap()
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(7)
  })
  it('deactivated beforeUnmount unmounted', async () => {
    page = await program.navigateBack()
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    expect(lifeCycleNum).toBe(4)
  })
})