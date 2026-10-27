const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const NAV_BAR_HEIGHT = 44

describe('native-view.uvue', () => {
  if (isMP || isWeb || isAppWebView) {
  	it('not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  if(isIOS) {
    const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
    if(
      platformInfo.indexOf('14.5') != -1 ||
      platformInfo.indexOf('13.7') != -1 ||
      platformInfo.indexOf('12.4') != -1
      ){
        // TODO: 排查 ios 不兼容版本 测试异常原因
        it('14.5 13.7 12.4 测试异常', () => {
          expect(1).toBe(1)
        })
        return
    }
  }

  it('native-view检测init函数是否响应', async () => {
    page = await program.reLaunch('/pages/component/native-view/native-view')
    await page.waitFor('view')

    const isLoad = await page.callMethod('getIsLoadTest')
    expect(isLoad).toBe(true)
  })

  it('native-view点击事件透传自定义value', async () => {
    page = await program.reLaunch('/pages/component/native-view/native-view')
    await page.waitFor('view')

    const nativeButton = await page.$('#helloView')
    const rect = await nativeButton.offset()
    const size = await nativeButton.size()
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const x = Math.round(rect.left + size.width / 2)
    const y = Math.round(rect.top + size.height / 2 + windowInfo.safeAreaInsets.top + NAV_BAR_HEIGHT)
    await program.device.tap(x, y + 30)
    await page.waitFor(100)

    const buttonTapValue = await page.callMethod('getButtonTapValueTest')
    expect(buttonTapValue).toBe('CustomValue')
  })

  if (isHarmony) {
    it('native-button-framenode检测init函数是否响应', async () => {
      page = await program.reLaunch('/pages/component/native-view/native-view')
      await page.waitFor('view')

      const isLoad = await page.callMethod('getFrameNodeIsLoadTest')
      expect(isLoad).toBe(true)
    })

    it('native-button-framenode点击事件透传自定义value', async () => {
      page = await program.reLaunch('/pages/component/native-view/native-view')
      await page.waitFor('view')

      const nativeButton = await page.$('#helloFrameNodeView')
      const rect = await nativeButton.offset()
      const size = await nativeButton.size()
      const windowInfo = await program.callUniMethod('getWindowInfo')
      const x = Math.round(rect.left + size.width / 2)
      const y = Math.round(rect.top + size.height / 2 + windowInfo.safeAreaInsets.top + NAV_BAR_HEIGHT)
      await program.device.tap(x, y + 30)
      await page.waitFor(100)

      const buttonTapValue = await page.callMethod('getFrameNodeButtonTapValueTest')
      expect(buttonTapValue).toBe('CustomValue')
    })
  }

  it('fixed test-native-view可通过v-if切换显隐', async () => {

    let fixedNativeView = await page.$('#fixed-test-native-view')
    expect(fixedNativeView).not.toBeNull()

    const toggleButton = await page.$('#toggle-fixed-test-native-view')
    await toggleButton.tap()
    await page.waitFor(200)

    fixedNativeView = await page.$('#fixed-test-native-view')
    expect(fixedNativeView).toBeNull()

    await toggleButton.tap()
    await page.waitFor(200)

    fixedNativeView = await page.$('#fixed-test-native-view')
    expect(fixedNativeView).not.toBeNull()
  })
})
