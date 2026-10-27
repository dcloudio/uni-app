const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')

describe('/pages/CSS/transition/transition-transform.uvue', () => {
  if (isMP || isAndroid) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/transition/transition-transform')
    await page.waitFor(2000);
  });

  it("snap transition finish", async () => {
    await page.callMethod('open')
    await page.waitFor(3000)
    const windowInfo = await program.callUniMethod('getWindowInfo');
    const image = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44
      }
    })
    expect(image).toSaveImageSnapshot()
  })
});
