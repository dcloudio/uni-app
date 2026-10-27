describe('text-layout', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase();
  const isIos = platformInfo.startsWith('ios');
  const isHarmony = platformInfo.startsWith('harmony');
  const isWeb = platformInfo.startsWith('web');
  const isMP = platformInfo.startsWith('mp');
  const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true';
  const isVapor = process.env.UNI_APP_X_DOM2 == 'true';

  if (isIos || isHarmony || isWeb || isMP || isAppWebView || isVapor) {
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
