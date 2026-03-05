const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')

describe('image switch render', () => {
  if (!isHarmony) {
    it('Only HarmonyOS', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/image/image-switch');
    await page.waitFor('view')
    // 需要第二次进入页面才可复现问题
    page = await program.reLaunch('/pages/component/image/image-switch');
    await page.waitFor('view')
  });

  it('screenshot', async () => {
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot();
  });
});
