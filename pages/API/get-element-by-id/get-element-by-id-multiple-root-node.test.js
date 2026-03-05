const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

const PAGE_PATH = "/pages/API/get-element-by-id/get-element-by-id-multiple-root-node";
let page;

describe("getElementByIdForMultipleRootNode", () => {
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
    await page.waitFor(500);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });
});
