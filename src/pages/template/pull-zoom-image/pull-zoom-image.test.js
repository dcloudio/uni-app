const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
describe('pull-zoom-image', () => {
  if (!isApp) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/template/pull-zoom-image/pull-zoom-image');
    await page.waitFor('view');
    await page.waitFor(1000);
    const windowInfo = await program.callUniMethod('getWindowInfo');
    const image = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44
      }
    });
    expect(image).toSaveImageSnapshot();
  });
});
