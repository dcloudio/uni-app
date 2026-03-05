const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isWeb = platformInfo.startsWith('web')
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('swiper-vertical-video', () => {
  if (isWeb) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  if (isDom2) {
    it('自动化测试进入页面崩溃，暂时跳过', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/swiper-vertical-video/swiper-vertical-video');
    await page.waitFor('view')
    await page.waitFor(2000); // 等待页面加载完成
  });
  // 不进行 app-webview 截图对比
  if (!isAppWebView) {
    it('screenshot', async () => {
      const image = await program.screenshot({
       fullPage: true,
      });
      expect(image).toSaveImageSnapshot();
    });
  }
});
