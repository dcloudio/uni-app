const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase();
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isWeb = platformInfo.startsWith('web')

describe("video-format", () => {
  if (isAppWebView || isWeb) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page

  // 添加辅助函数来简化数据设置
  async function setPageData(newData) {
    return await page.setData({ autoTestData: newData });
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/video/video-format');
    await page.waitFor('view');
    await page.waitFor(3000)
  })

  it("screenshot", async () => {
    await setPageData({autoTest: true})
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  })
});
