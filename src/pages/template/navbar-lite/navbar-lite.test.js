const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const CURRENT_PAGE_PATH = "/pages/template/navbar-lite/navbar-lite";

describe("setCustomNavigationBarColor", () => {
  if (isAppWebView) {
  	it('skip not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page;
  let originLifeCycleNum;
  let screenShotArea = {
    x: 342,
    y:18,
    width: 40,
    height: 20
  };
  if (isIos) {
    screenShotArea.x = 310
    screenShotArea.y = 20
    screenShotArea.width = 40
    screenShotArea.height = 20
  } else if (platformInfo.startsWith('android 6')) {
    screenShotArea.x = 204
    screenShotArea.width = 34
    screenShotArea.height = 16
  } else if (platformInfo.startsWith('android 12')) {
    screenShotArea.x = 336
    screenShotArea.y = 3
    screenShotArea.width = 50
    screenShotArea.height = 20
  } else if (isHarmony) {
    screenShotArea.x = 295
    screenShotArea.y = 14
    screenShotArea.width = 40
    screenShotArea.height = 20
  }
  beforeAll(async () => {
    page = await program.navigateTo(CURRENT_PAGE_PATH);
    await page.waitFor('view');
    originLifeCycleNum = await page.callMethod("getLifeCycleNum");
  });

  afterAll(async () => {
    await page.callMethod("setLifeCycleNum", originLifeCycleNum);
    const lifeCycleNum = await page.callMethod("getLifeCycleNum");
    expect(lifeCycleNum).toBe(originLifeCycleNum);
  });

  it("setNavigationBarColor-black", async () => {
    await page.callMethod("setNavigationBarColor2");
    await page.waitFor(1000);
    if (isApp) {
      const image = await program.screenshot({
        deviceShot: true,
        area: screenShotArea,
      });
      expect(image).toSaveImageSnapshot();
    }
    const lifeCycleNum = await page.callMethod("getLifeCycleNum");
    expect(lifeCycleNum - originLifeCycleNum).toBe(2);
  });

  it("setNavigationBarColor-white", async () => {
    await page.callMethod("setNavigationBarColor1");
    await page.waitFor(1000);
    if (isApp) {
      const image = await program.screenshot({
        deviceShot: true,
        area: screenShotArea,
      });
      expect(image).toSaveImageSnapshot();
    }
    const lifeCycleNum = await page.callMethod("getLifeCycleNum");
    expect(lifeCycleNum - originLifeCycleNum).toBe(4);
  });

  if (isApp) {
    it("input-in-scroll-view-focus", async () => {
      const windowInfo = await program.callUniMethod('getWindowInfo');
      let topSafeArea = windowInfo.statusBarHeight;
      screenShotArea = {
        x: 0,
        y: topSafeArea
      }
      await page.setData({ data: { indexView: 2 } });
      await page.waitFor(1000);
      await page.setData({ data: { indexView: 0 } });
      await page.waitFor(1000);
      await page.setData({ data: { scrollViewInputFocus: true } });
      await page.waitFor(1000);
      const image = await program.screenshot({
        deviceShot: true,
        area: screenShotArea,
      });
      expect(image).toSaveImageSnapshot();
      await page.setData({ data: { scrollViewInputFocus: false } });
      await page.waitFor(1000);
    });

    it("input-in-list-view-focus", async () => {
      await page.setData({ data: { indexView: 1 } });
      await page.waitFor(1000);
      await page.setData({ data: { listViewInputFocus: true } });
      await page.waitFor(1000);
      const image = await program.screenshot({
        deviceShot: true,
        area: screenShotArea,
      });
      expect(image).toSaveImageSnapshot();
      await page.setData({ data: { listViewInputFocus: false } });
      await page.waitFor(1000);
    });
  }
});
