const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const CURRENT_PAGE_PATH = "/pages/API/set-navigation-bar-title/set-navigation-bar-title";

describe("setNavigationBarColor", () => {
  if (isAppWebView) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
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
});
