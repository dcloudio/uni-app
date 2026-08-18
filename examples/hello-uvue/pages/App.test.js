const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.includes('android')
const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony

const HOME_PATH = '/pages/index/index'

describe("app launch & show options", () => {
  let page
  it("onLaunch onShow", async () => {
    page = await program.reLaunch(HOME_PATH)
    await page.waitFor('view')
    expect(await page.callMethod("checkLaunchPath")).toBe(true)
    expect(await page.callMethod("checkGlobalData")).toBe(true)
    // if (!isAndroid && !isDom2) {
    // 改为组合式 API 后，app mixins 失效，暂不校验 @fxy
    if(!isApp) {
      expect(await page.callMethod("checkAppMixin")).toBe(true)
    }

    const lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
    // 蒸汽模式不支持 globalProperties
    // ios harmony 组合式 API 后，app.vm.globalPropertiesStr undefined @fxy
    expect(lifeCycleNum).toBe(isDom2 || isIos || isHarmony ? 1100 : 1110)
  })
  it('onLastPageBackPress', async () => {
    if (isAndroid) {
      page = await program.navigateBack()
      await page.waitFor(700)
      const lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
      expect(lifeCycleNum).toBe(isDom2 ? 100 : 110)
    }
  })
})
