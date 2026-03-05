const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('custom-long-list', () => {
  if (isDom2) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/custom-long-list/custom-long-list');
    await page.waitFor('view')
    await page.waitFor(2000); // 等待页面加载完成
  });

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();
  });
});
