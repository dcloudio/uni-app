const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe("element take snapshot", () => {
  if (isWeb || isAppWebView || isMP) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/element-takesnapshot/element-takesnapshot')
    await page.waitFor(1200);
  });

  it("takeSnapshot", async () => {
    await page.waitFor(1200)
    let btnTakeSnapshot = await page.$('.btn-TakeSnapshot')
    await btnTakeSnapshot.tap()
    await page.waitFor(1200)
    const image = await page.data('data.snapImage')
    console.log(image)
    ///storage/emulated/0/Android/data/io.dcloud.uniappx/apps/__UNI__3584C99/cache/temp/screenshot/1697513148915.png
    expect(image.length).toBeGreaterThan(20)
  });

  it("complete should be triggered", async () => {
    const completeTriggered = await page.data('data.completeTriggered')
    expect(completeTriggered).toBe(true)
  });
});
