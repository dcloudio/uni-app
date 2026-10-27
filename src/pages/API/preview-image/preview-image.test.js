jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('preview-image', () => {
  if ( isMP) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  let screenShotOptions = { fullPage: true };

  async function screenshot() {
    const image = await program.screenshot(screenShotOptions);
    expect(image).toSaveImageSnapshot()
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/preview-image/preview-image');
    await page.waitFor('view');
    await page.waitFor(isWeb ? 4000 : 100);

    if (!isWeb) {
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
      // previewImage is a full-screen overlay without the page navigation bar.
      const top = topSafeArea
      const bottom = windowInfo.safeArea.bottom
      const left = windowInfo.safeArea.left
      const right = windowInfo.safeArea.right - 10
      screenShotOptions = {
        deviceShot: true,
        area: {
          x: left,
          y: top,
          width: right - left,
          height: bottom - top
        },
      }
    }
  });

  if (isWeb) {
    it('screenshot', async () => {
      await screenshot()
    });
  } else {
    it('previewImage_default', async () => {
      await page.callMethod('previewImage')
      await page.waitFor(1000)
      await screenshot()
      await page.callMethod('closePreviewImage')
      await page.waitFor(300)
    })
    it('previewImage_number', async () => {
      await page.callMethod('testSetCurrentIndicator','number')
      await page.waitFor(300)
      await page.callMethod('previewImage')
      await page.waitFor(3000)
      await screenshot()
      await page.callMethod('closePreviewImage')
      await page.waitFor(300)
    })
    it('previewImage_none', async () => {
      await page.callMethod('testSetCurrentIndicator','none')
      await page.waitFor(300)
      await page.callMethod('previewImage')
      await page.waitFor(3000)
      await screenshot()
      await page.callMethod('closePreviewImage')
      await page.waitFor(300)
    })
    it('previewImage_longpress', async () => {
      await page.callMethod('testSetCurrentIndicator','none')
      await page.waitFor(300)
      await page.callMethod('previewImage')
      await page.waitFor(3000)
      const systemInfo = await program.systemInfo()
      await program.tap({
        x: parseInt(systemInfo.screenWidth / 2),
        y: parseInt(systemInfo.screenHeight / 2),
        duration: 1000,
      })
      await page.waitFor(500)
      await screenshot()
      await page.callMethod('closePreviewImage')
      await page.waitFor(300)
    })
  }
});
