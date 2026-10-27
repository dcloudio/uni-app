const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMpAlipay = platformInfo === 'mp-alipay'
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isIos = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')

const PAGE_PATH = '/pages/template/scroll-collapse-navbar/scroll-collapse-navbar'

describe('scroll-collapse-navbar', () => {
  let page
  let screenShotOptions = {};
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1000)
    const windowInfo = await program.callUniMethod('getWindowInfo');
    let topSafeArea = windowInfo.safeAreaInsets.top;
    if (isAppWebView) {
      if (isIos) {
        topSafeArea = 59
        if (platformInfo.includes('26')) {
          topSafeArea = 62
        }
      } else if (isAndroid) {
        topSafeArea = 24
        windowInfo.safeArea.bottom = 867
        if (platformInfo.startsWith('android 5')) {
          topSafeArea = 25
        }if (platformInfo.startsWith('android 6')) {
          windowInfo.safeArea.bottom = 592
        }if (platformInfo.startsWith('android 8')) {
          windowInfo.safeArea.bottom = 534
        } else if (platformInfo.startsWith('android 11')) {
          topSafeArea = 52
        } else if (platformInfo.startsWith('android 12')) {
          topSafeArea = 24
          windowInfo.safeArea.bottom = 716
        } else if (platformInfo.startsWith('android 13') || platformInfo.startsWith('android 14') || platformInfo.startsWith('android 15')) {
          topSafeArea = 49
          windowInfo.safeArea.bottom = 891
        }
      } else if (isHarmony) {
        topSafeArea = 39
        if (platformInfo.includes('nova_12')) {
          topSafeArea = 35
        }
      }
    }
    // navigationStyle is custom, so only exclude the system status bar.
    // The collapsing navbar itself is page content covered by this test.
    // 支付宝透明导航页的 windowHeight 包含原生区域，页面下边界需扣除 screenTop。
    const top = isMpAlipay ? windowInfo.statusBarHeight : topSafeArea
    const bottom = isMpAlipay
      ? windowInfo.screenHeight - windowInfo.screenTop
      : windowInfo.safeArea.bottom
    const left = isMpAlipay ? 0 : windowInfo.safeArea.left
    const right = isMpAlipay ? windowInfo.windowWidth : windowInfo.safeArea.right
    screenShotOptions = {
      deviceShot: true,
      area: {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      },
    }
  })
  it('screenshot before scroll', async () => {
    const image = await program.screenshot(screenShotOptions);
    expect(image).toSaveImageSnapshot();
  });
  it('screenshot after scroll', async () => {
    await page.callMethod('jest_scrollTo', 400)
    await page.waitFor(1000)
    const currentScrollTop = await page.callMethod('jest_getScrollTop')
    expect(currentScrollTop).toBeGreaterThan(399)

    const image = await program.screenshot(screenShotOptions);
    expect(image).toSaveImageSnapshot();
  });
})
