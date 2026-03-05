describe('css-font-family-icon', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase();
  const isMP = platformInfo.startsWith('mp');
  const isWeb = platformInfo.startsWith('web');
  const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true';
  let page;

  if (isWeb || isMP || isAppWebView) {
    it('other platform', () => {
      expect(1).toBe(1);
    });
    return;
  }

  it('screenshot', async () => {
    page = await program.reLaunch('/pages/CSS/text/font-family-icon');
    await page.waitFor('view');
    await page.waitFor(1000);
    
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  });

  it('screenshot after changeStyle', async () => {
    await page.callMethod('changeStyle');
    await page.waitFor(500);
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  });
});
