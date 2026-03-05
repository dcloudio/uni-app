const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/template/scroll-fold-nav/scroll-fold-nav'

describe('scroll-fold-nav', () => {
  let page
  let deviceShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: 0,
      },
    };
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1000)
    const windowInfo = await program.callUniMethod('getWindowInfo');
    let topSafeArea = windowInfo.safeAreaInsets.top;
    if (isAppWebView) {
      if (isIos) {
        topSafeArea = 59
      } else if (isAndroid) {
        topSafeArea = 24
        if (platformInfo.startsWith('android 5')) {
          topSafeArea = 25
        } else if (platformInfo.startsWith('android 11')) {
          topSafeArea = 52
        } else if (platformInfo.startsWith('android 13') || platformInfo.startsWith('android 15')) {
          topSafeArea = 49
        }
      } else if (isHarmony) {
        // mate 60
        // topSafeArea = 33
        // mate 60 pro
        topSafeArea = 38
      }
    }
    deviceShotOptions.area.y = topSafeArea
  })
  it('screenshot before scroll', async () => {
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot();
  });
  it('screenshot after scroll', async () => {
    await program.pageScrollTo(400)
    await page.waitFor(1000)
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot();
  });
})
