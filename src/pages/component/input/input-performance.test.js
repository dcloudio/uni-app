const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('input-performance', () => {
  if (isAppWebView || !isVapor || isMP) {
  	it('skip', () => {
      expect(1).toBe(1)
    })
  	return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/input/input-performance')
    await page.waitFor('view');
    await page.setData({ autoData: { showFps: false } });
  });

  // 测试页面加载速度及 placeholder 字体大小是否正常 issue/26417
  it("screenshot", async () => {
    const image = await program.screenshot()
    expect(image).toSaveImageSnapshot()
  })
});
