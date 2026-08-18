jest.setTimeout(30000)

const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.includes('android')
const isIos = platformInfo.startsWith('ios')
// TODO: harmony 暂不支持部分 API
const isHarmony = platformInfo.includes('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isDialogPageSupported = !isMP && !isAppWebView
const isWeb = platformInfo.startsWith('web')
const isPad = process.env.UNI_AUTOMATOR_IS_PAD == 'true'

const OPTIONS_PAGE_PATH = '/pages/lifecycle/page/page-options'
const COMPOSITION_PAGE_PATH = '/pages/lifecycle/page/page-composition'
const HOME_PATH = '/pages/index/index'
let page
let lifeCycleNum

const initLifecycle = async () => {
  page = await program.reLaunch(HOME_PATH)
  await page.waitFor(1000)
  await page.callMethod('pageSetLifeCycleNum', 0)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(0)
}
const testPageLifecycle = async (pagePath) => {
  // onLoad onShow onReady
  page = await program.reLaunch(pagePath)
  await page.waitFor(1000)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(isMP ? 240 : 230)
  // onResize
  if (isAndroid || isIos || isWeb) {
    // setScreenOrientation android ios 通过命令修改模拟器屏幕方向，web 调整屏幕尺寸
    // portrait | portraitUpsideDown | landscapeLeft | landscapeRight
    // 为兼容 web, 不使用 program.device.setScreenOrientation
    await program.setScreenOrientation(isPad ? 'portrait' : 'landscapeRight')
    await page.waitFor(2000)
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(241)
    await program.setScreenOrientation(isPad ? 'landscapeLeft' : 'portrait')
    await page.waitFor(2000)
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(252)
  }
  await page.callMethod('pageSetLifeCycleNum', 0)
  // 组件监听 app onError 生命周期
  if (!isMP) {
    const triggerMonitorAppError = await page.$('#trigger-monitor-app-error')
    await triggerMonitorAppError.tap()
    await page.waitFor(500)
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(110)
    await page.callMethod('pageSetLifeCycleNum', 0)
  }

  await page.callMethod('pullDownRefresh')
  await page.waitFor(1500)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(20)
  await page.callMethod('pageSetLifeCycleNum', 0)

  await program.pageScrollTo(2000)
  await page.waitFor(1000)
  const dataInfo = await page.data('dataInfo')
  expect(dataInfo.isScrolled).toBe(true)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(20)
  await page.callMethod('pageSetLifeCycleNum', 0)

  if (isDialogPageSupported) {
    await program.pageScrollTo(0)
    await page.waitFor(1000)
    await page.callMethod('resetPageScrollStatus')
    let dataInfo = await page.data('dataInfo')
    expect(dataInfo.isScrolled).toBe(false)

    await page.callMethod('openLifecycleDialogPage')
    await page.waitFor(1000)
    await page.callMethod('closeLifecycleDialogPage')
    await page.waitFor(1000)

    await program.pageScrollTo(2000)
    await page.waitFor(1000)
    dataInfo = await page.data('dataInfo')
    expect(dataInfo.isScrolled).toBe(true)
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(20)
    await page.callMethod('pageSetLifeCycleNum', 0)
  }
  // onHide
  page = await program.navigateTo(HOME_PATH)
  await page.waitFor('view')
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(-20)
  page = await program.navigateBack()
  await page.waitFor('view')
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(0)

  // onUnload
  page = await program.reLaunch(HOME_PATH)
  await page.waitFor(700)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(-110)
  await page.callMethod('pageSetLifeCycleNum', 0)

  // onBackPress
  page = await program.navigateTo(pagePath)
  await page.waitFor(700)
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  expect(lifeCycleNum).toBe(isMP ? 240 : 230)
  page = await program.navigateBack()
  await page.waitFor('view')
  lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
  // 微信小程序不会触发onBackPress
  expect(lifeCycleNum).toBe(isMP ? 130 : 100)
  await page.callMethod('pageSetLifeCycleNum', 0)
}
const test = async (pagePath) => {
  await initLifecycle()
  await testPageLifecycle(pagePath)
}

describe('page-lifecycle', () => {
  if (!isDom2) {
    it('page-lifecycle options API', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }

  it('page-lifecycle composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })

  afterEach(async () => {
    if (isAndroid || isIos || isWeb) {
      await program.setScreenOrientation(isPad ? 'landscapeLeft' : 'portrait')
    }
    const resetLifecycleNum = 1110
    await page.callMethod('pageSetLifeCycleNum', resetLifecycleNum)
    lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    expect(lifeCycleNum).toBe(resetLifecycleNum)
  })
})
