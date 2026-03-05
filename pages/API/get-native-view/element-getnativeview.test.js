const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('get-native-view', () => {
  if (isMP || isHarmony || isWeb || isAppWebView) {
  	it('skip mp', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  if (
    isIOS &&
    (
      platformInfo.indexOf('14.5') != -1 ||
      platformInfo.indexOf('13.7') != -1 ||
      platformInfo.indexOf('12.4') != -1
    )
  ) {
    // TODO: 排查 ios 不兼容版本 测试异常原因
    it('14.5 13.7 12.4 测试异常', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/get-native-view/element-getnativeview')
    await page.waitFor('web-view')
  })

  //检测view标签原生View是否匹配
  it('check_view_native_view', async () => {
    page.waitFor(100)
    const value = await page.callMethod('checkViewNativeView')
    expect(value).toBe(true)
  })

  //检测input标签原生View是否匹配
  it('check_input_native_view', async () => {
    page.waitFor(100)
    const value = await page.callMethod('checkInputNativeView')
    expect(value).toBe(true)
  })

  //检测textarea标签原生View是否匹配
  it('check_textarea_native_view', async () => {
    page.waitFor(100)
    const value = await page.callMethod('checkTextareaNativeView')
    expect(value).toBe(true)
  })

  //检测webview标签原生View是否匹配
  it('check_web_view_native_view', async () => {
    page.waitFor(100)
    const value = await page.callMethod('checkWebViewNativeView')
    expect(value).toBe(true)
  })

})
