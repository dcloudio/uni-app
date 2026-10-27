const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMpAlipay = platformInfo === 'mp-alipay'
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('css-z-index', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/layout/z-index');
    await page.waitFor('view');
    await page.waitFor(isWeb ? 4000 : 2000);
  });

  // web 与 app 在某种情况下表现不同，不进行 app-webview 截图对比
  if (!isAppWebView) {
    it('screenshot', async () => {
      const windowInfo = await program.callUniMethod('getWindowInfo');
      // 支付宝 deviceShot 使用设备屏幕坐标，页面 viewport 从 screenTop 开始。
      const area = isMpAlipay
        ? {
            x: 0,
            y: windowInfo.screenTop,
            width: windowInfo.windowWidth,
            height: windowInfo.windowHeight
          }
        : {
            x: 0,
            y: windowInfo.safeAreaInsets.top + 44
          }
      const image = await program.screenshot({
        deviceShot: true,
        area
      });
      expect(image).toSaveImageSnapshot();
    });
  }
});
