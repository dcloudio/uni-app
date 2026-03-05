const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

describe('image path', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/image/image-path');
    await page.waitFor('view')
    await page.waitFor(isWeb ? 5000 : 2000); // 等待页面加载完成
  });

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();
  });
});
