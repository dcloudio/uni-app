const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')

describe('component canvas canvas-context', () => {
  if (isMP) {
    it('Not Support MP', async () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/canvas/canvas-context');
    await page.waitFor(1000);
  });

  it('measureText', async () => {
    await page.callMethod('measureText')
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  });
})
