const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('css-z-index', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/layout/z-index');
    await page.waitFor('view');
    await page.waitFor(isWeb ? 4000 : 2000);
  });

  if (isAndroid) {
    it('test crash', async () => {
      await page.setData({
        data: {
          autoTest: true
        }
      });
      const elements = await page.$$('view');
      expect(elements.length).toBeGreaterThan(0);
      await page.setData({
        data: {
          autoTest: false
        }
      });
    });
  }
  // web 与 app 在某种情况下表现不同，不进行 app-webview 截图对比
  if (!isAppWebView) {
    it('screenshot', async () => {
      const windowInfo = await program.callUniMethod('getWindowInfo');
      const image = await program.screenshot({
        deviceShot: true,
        area: {
          x: 0,
          y: windowInfo.safeAreaInsets.top + 44
        }
      });
      expect(image).toSaveImageSnapshot();
    });
  }
});
