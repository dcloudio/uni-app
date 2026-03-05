const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isIos = platformInfo.startsWith('ios')

describe('match-media', () => {
  const isSupported = isMP || isAndroid || isHarmony || isIos;
  if (!isSupported) {
    it('not support', () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/match-media/match-media')
    await page.waitFor(2000);
  });

  it('match-media screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();
  });
});
