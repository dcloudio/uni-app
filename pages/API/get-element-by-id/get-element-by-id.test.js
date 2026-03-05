const PAGE_PATH = "/pages/API/get-element-by-id/get-element-by-id";
let page;

describe("getElementById", () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isIOS = platformInfo.startsWith('ios')
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH);
    await page.waitFor('view');
  });
  it("getElementByNotExistId", async () => {
    const res = await page.callMethod("getElementByNotExistId");
    expect(res).toBe(null);
  });
  it("changeStyle", async () => {
    if (!isMP) {
      await page.callMethod("changePageHeadBackgroundColor");
    }
    await page.callMethod("changeTextColor");
    await page.callMethod("changeViewStyle");
    await page.callMethod("changeImageStyle");
    await page.callMethod("changeScrollViewStyle");
    await page.waitFor(500);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });

  if(isMP) {
    return
  }
  /**
   * 检测元素offsetLeft属性值域
   */
  it("checkElementOffsetLeft", async() => {
    const res = await page.callMethod("getTextOffsetLeft");
    expect(res).toBe(0);
  })
});
