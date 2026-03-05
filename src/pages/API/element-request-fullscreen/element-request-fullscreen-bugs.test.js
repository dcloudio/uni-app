const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')

describe('/pages/API/element-request-fullscreen/element-request-fullscreen-bugs', () => {

  if (!isAndroid) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }


  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/element-request-fullscreen/element-request-fullscreen-bugs')
    await page.waitFor(2000);
  });

  it("test-fullscreen-bugs", async () => {
    // 进入全屏
    await page.callMethod('requestfullscreen')
    await page.waitFor(1000)

    const image2 = await program.screenshot({})
    expect(image2).toSaveImageSnapshot()
  })
});
