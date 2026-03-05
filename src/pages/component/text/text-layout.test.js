// uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/
describe('text-layout', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase();
  const isIos = platformInfo.startsWith('ios');
  const isHarmony = platformInfo.startsWith('harmony');
  const isWeb = platformInfo.startsWith('web');
  const isMP = platformInfo.startsWith('mp');
  const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true';

  if (isIos || isHarmony || isWeb || isMP || isAppWebView) {
    it('other platform', () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/text/text-layout');
    await page.waitFor(500);
  });

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  });
});
