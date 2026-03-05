const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('API-theme-change', () => {
  let page;
  let originalTheme;
  if (!isAndroid || !isIos || isAppWebView) {
    it('dummyTest', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/theme-change/theme-change')
    await page.waitFor('view');
    originalTheme = await page.data('originalTheme')
  });

  it("check-set-app-theme", async () => {
    await page.callMethod('setAppTheme', "dark")
    await page.waitFor(300)
    expect(await page.data('appTheme')).toBe("dark")
    const image = await program.screenshot({ deviceShot: true });
    expect(image).toSaveImageSnapshot();
  })

  afterAll(async () => {
    await page.callMethod('setAppTheme', originalTheme)
    await page.waitFor(600)
  })
});
