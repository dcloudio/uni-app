jest.setTimeout(50000);
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/API/toast/toast'

describe('API-toast', () => {
  let page;
  let deviceShotOptions = {}
  beforeAll(async () => {
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
    deviceShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: topSafeArea + 44,
      },
    };

    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor("view");
  });

  async function toScreenshot(imgName) {
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot({customSnapshotIdentifier() {
      return imgName
    }})
    await page.waitFor(500);
  }

  it("onload-toast-test", async () => {
    await toScreenshot('toast-onload')
  })

  it("icon-toast-test", async () => {
    const icons = await page.$$('.radio-icon')
    for (let i = 0; i < icons.length; i++) {
      await icons[i].tap()
      const iconText = await icons[i].text()
      await page.callMethod('toast1Tap')
      await page.waitFor(100);
      await toScreenshot(`${iconText}-toast`)
    }
  })

  it("icon=none-mask=true-toast-test", async () => {
    await page.setData({data:{maskSelect: true}})
    await page.callMethod('toast3Tap')
    await page.waitFor(300);
    await toScreenshot('icon=none-mask=true-toast-image')
  })

  it("image-toast-test", async () => {
    await page.setData({data:{imageSelect: true}})
    await page.waitFor(300);
    await page.callMethod('toast1Tap')
    await page.waitFor(300);
    await toScreenshot('toast-image')
  })

  it("duration-toast-test", async () => {
    await page.setData({data:{intervalSelect: 4000}})
    await page.callMethod('toast1Tap')
    await page.waitFor(2000);
    await toScreenshot('toast-duration-2000')
    await page.waitFor(1000);
    await page.callMethod('hideToast')
    await page.waitFor(300);
    await toScreenshot('toast-duration-end')
  })

  if(isWeb){
    return
  }

  it("position-toast-test", async () => {
    if (isIos) {
      const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
      if (
        platformInfo.indexOf('14.5') != -1 ||
        platformInfo.indexOf('13.7') != -1 ||
        platformInfo.indexOf('12.4') != -1
      ) {
        expect(1).toBe(1)
        return
      }
    }

    const positions = await page.$$('.radio-position')
    for (let i = 0;i < positions.length;i++) {
      // 等待上一个 toast 消失
      await page.waitFor(2000);
      await positions[i].tap()
      const positionsText = await positions[i].attribute('value')
      await page.callMethod('toast2Tap')
      await page.waitFor(500);
      await toScreenshot(`toast-position-${positionsText}`)
    }
  })

});
