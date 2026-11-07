const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe("setNavigationBarColor", () => {
  if (isAppWebView) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  const CURRENT_PAGE_PATH = "/pages/API/set-navigation-bar-title/set-navigation-bar-title";
  let page;
  let originLifeCycleNum;
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

  it("setNavigationBarNewTitle", async () => {
    await page.callMethod("setNavigationBarNewTitle");
    await page.waitFor(1000);
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot();
    const lifeCycleNum = await page.callMethod("getLifeCycleNum");
    expect(lifeCycleNum - originLifeCycleNum).toBe(2);
  });
  it("setNavigationBarLongTitle", async () => {
    await page.callMethod("setNavigationBarLongTitle");
    await page.waitFor(1000);
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot();
  });

  if(isMP || isWeb){
    it("showNavigationBarLoading", async () => {
      await page.callMethod("showNavigationBarLoading");
      await page.waitFor(100);
      const callback = await page.data('navigationBarLoadingCallback');
      expect(callback.showSuccess).toBe(true);
      expect(callback.showComplete).toBe(true);
    });
    it("hideNavigationBarLoading", async () => {
      await page.callMethod("hideNavigationBarLoading");
      await page.waitFor(100);
      const callback = await page.data('navigationBarLoadingCallback');
      expect(callback.hideSuccess).toBe(true);
      expect(callback.hideComplete).toBe(true);
    });
  }

});
