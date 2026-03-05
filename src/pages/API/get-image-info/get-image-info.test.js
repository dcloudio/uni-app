const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')

describe('API-getImageInfo', () => {
  if (isIOS) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/get-image-info/get-image-info');
    await page.waitFor('view');
    await page.waitFor(6000);
  });

  it('screenshot', async () => {
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot()
  })

  it('test getImageInfo', async () => {
    await page.waitFor(500);
    if (isWeb) {
      expect(await page.data('testState.imageInfoForTest')).toEqual({
        width: 192,
        height: 192,
        path: 'test-image/logo.png'
      });
      return;
    }
    expect(await page.data('testState.imageInfoForTest')).toEqual({
      width: 192,
      height: 192,
      path: 'test-image/logo.png',
      orientation: 'up',
      type: 'png'
    });
  });
});
