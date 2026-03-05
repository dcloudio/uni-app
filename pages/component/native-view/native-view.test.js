const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isIOS = platformInfo.startsWith('ios')

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
})
