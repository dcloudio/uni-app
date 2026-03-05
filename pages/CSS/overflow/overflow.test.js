const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('component-native-overflow', () => {
  let page
  beforeAll(async () => {
    //打开list-view测试页
    page = await program.reLaunch('/pages/CSS/overflow/overflow')
    await page.waitFor("image")
  })

  //检测overflow设置hidden，visible
  it('check_view_overflow', async () => {
    if (isAndroid && !isAppWebView) {
        let version = process.env.uniTestPlatformInfo
        version = parseInt(version.split(" ")[1])
        //安卓7模拟器不截图 导致闪退
        if(version == 7) {
          return
        }
    }
    await page.waitFor(600)
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();
  })
})
