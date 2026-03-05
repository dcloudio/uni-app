const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase();
const isAndroid = platformInfo.startsWith('android');
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe("rich-text-tags", () => {
  if (isAppWebView) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page;
  it("screenshot", async () => {
    page = await program.reLaunch('/pages/component/rich-text/rich-text-tags');
    await page.waitFor('view');
    await page.waitFor(1000)
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  })

  if (isAndroid) {
    it("test attr mode", async () => {
      await page.setData({
        modeData: {
          mode: 'native'
        }
      });
      await page.waitFor(1000);
      const image = await program.screenshot({ fullPage: true });
      expect(image).toSaveImageSnapshot();
    });
  }
});
