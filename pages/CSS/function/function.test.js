const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('css-function', () => {
  if (isAppWebView) {
    // app 与 web 存在差异, webview 不进行截图
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/CSS/function/function');
    await page.waitFor('view');
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  });
});
