const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isSafari = platformInfo.indexOf('safari') > -1

describe('inner-audio-path', () => {
  if (!isWeb || isSafari) {
    it('not support', () => {
      expect(1).toBe(1)
    });
    return;
  }

  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/API/create-inner-audio-context/inner-audio-path')
    await page.waitFor('view');
    await page.waitFor(1000);

    const image = await program.screenshot({fullPage: true})
    expect(image).toSaveImageSnapshot();
  });
});
