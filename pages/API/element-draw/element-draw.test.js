const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isIOS = platformInfo.startsWith('ios')

describe('api-element-draw', () => {
  if (!(isAndroid || isIOS || isHarmony)) {
    it('!App', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/element-draw/element-draw');
    await page.waitFor(1000);
  });

  it('test element draw', async () => {
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  });
})
