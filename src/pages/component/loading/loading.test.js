const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('component loading', () => {
  if (!(isIOS || isAndroid || isHarmony || isWeb || isMP)) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  beforeAll(async () => {
    const page = await program.reLaunch('/pages/component/loading/loading');
    await page.waitFor('view');
  });

	it('screenshot', async () => {
		const image = await program.screenshot({fullPage: true})
		expect(image).toSaveImageSnapshot();
	})
})
