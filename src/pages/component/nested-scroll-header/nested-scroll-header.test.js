const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('component-native-nested-scroll-header', () => {
  if (isMP || isWeb || isAppWebView) {
    it('dummyTest', () => {
      expect(1).toBe(1)
    })
    return
  }

  it('check_nested-scroll-header', async () => {
    //打开 nested-scroll-header测试页
    const page = await program.reLaunch('/pages/component/nested-scroll-header/nested-scroll-header')
    await page.waitFor('view');
    await page.waitFor(1000)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })
})
