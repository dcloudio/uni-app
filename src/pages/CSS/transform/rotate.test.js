const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('/pages/CSS/transform/rotate.uvue', () => {
  if (isIOS && isAppWebView) {
  	it('ios 与 web 存在差异, webview 不进行截图', () => {
      expect(1).toBe(1)
    })
  	return
  }

	let page;
	beforeAll(async () => {
	  page = await program.reLaunch('/pages/CSS/transform/rotate')
	  await page.waitFor(1000);
	});

  it("snap rotate", async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
});
