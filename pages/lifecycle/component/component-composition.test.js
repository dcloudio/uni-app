const PAGE_PATH = '/pages/lifecycle/component/component-composition'
const HOME_PATH = '/pages/index/index'

describe('component-lifecycle', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.includes('android')
  const isIOS = platformInfo.includes('ios')
  // TODO: harmony 暂不支持部分 API
  const isHarmony = platformInfo.startsWith('harmony')
  const isMP = platformInfo.startsWith('mp')
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

  it('onLoad onPageShow onReady onBeforeMount onMounted onActivated', async () => {
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    // TODO: android 组合式 API 不触发 onActivated
    expect(lifeCycleNum).toBe(isAndroid ? 112 : 113)
  })
  it('onDeactivated', async () => {
    // TODO: android 组合式 API 不触发 onActivated onDeactivated
    const toggleAliveComponentBtn = await page.$('#toggle-alive-component-btn')

    await toggleAliveComponentBtn.tap()
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(112)

    await toggleAliveComponentBtn.tap()
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    // TODO: android 端 组合式 API 不触发 activated
    expect(lifeCycleNum).toBe(isAndroid ? 112 : 113)
    await page.callMethod('pageSetLifeCycleNum', 0)
  })
  it('onBeforeUpdate onUpdated', async () => {
    const updateTitleBtn = await page.$('.component-lifecycle-btn')
    await updateTitleBtn.tap()
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(2)
    await page.callMethod('pageSetLifeCycleNum', 0)
  })
  if (!isHarmony) {
    // TODO: harmony 不支持 pullDownRefresh & pageScrollTo
    it('onPullDownRefresh', async () => {
      await page.callMethod('pullDownRefresh')
      await page.waitFor(2000)
      lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
      expect(lifeCycleNum).toBe(10)
      await page.callMethod('pageSetLifeCycleNum', 0)
    })
    it('onPageScroll onReachBottom', async () => {
      await program.pageScrollTo(2000)
      // TODO: web 端组件内监听 onPageScroll onReachBottom 不触发
      if (process.env.uniTestPlatformInfo.startsWith('android')) {
        const isScrolled = await page.callMethod('getIsScrolled')
        expect(isScrolled).toBe(true)
        lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
        expect(lifeCycleNum).toBe(10)
      }
      await page.callMethod('pageSetLifeCycleNum', 0)
    })
  }
  it('onHide', async () => {
    page = await program.navigateTo(HOME_PATH)
    await page.waitFor('view')
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    // App 端页面离开返回不触发 keepAlive 组件 activated deactivated, 详见 https://issues.dcloud.net.cn/pages/issues/detail?id=7419
    expect(lifeCycleNum).toBe((isIOS || isAndroid || isHarmony) ? -10 : -11)
    page = await program.navigateBack()
    await page.waitFor('view')
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(0)
  })
  it('onDeactivated beforeUnmount unmounted onUnload onBackPress', async () => {
    page = await program.navigateBack()
    lifeCycleNum = await page.callMethod('getLifeCycleNum')
    // TODO: android 组合式 API 不触发 onDeactivated
    expect(lifeCycleNum).toBe(isAndroid ? -112 : -113)
    await page.callMethod('setLifeCycleNum', 0)
  })
})