const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isWeb = platformInfo.startsWith('web')
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('component-native-sticky-header', () => {
  if (isMP || isDom2 && isHarmony) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  const screenshotParams = { }

  beforeAll(async () => {
    if (!isAppWebView) {
      const windowInfo = await program.callUniMethod('getWindowInfo');
      screenshotParams.offsetY = `${windowInfo.safeAreaInsets.top + 44}`
    }
    page = await program.reLaunch('/pages/component/sticky-header/sticky-header')
    await page.waitFor('sticky-header')
    await page.waitFor(isWeb ? 5000 : 2000); // 等待页面加载完成
  })

  //检测吸顶效果
  it('check_sticky_header', async () => {
    await page.callMethod('confirm_scroll_top_input', 600)
    await page.waitFor(1000);
    const image = await program.screenshot(screenshotParams);
    expect(image).toSaveImageSnapshot();
  })
  //测试验证issues 16216 问题
  it('check_sticky_header_position', async () => {
    await page.callMethod('confirm_scroll_top_input', 300)
    await page.waitFor(1000);
    await page.callMethod('clearListData')
    await page.waitFor(1000);
    const image = await program.screenshot(screenshotParams);
    expect(image).toSaveImageSnapshot();
  })
})
