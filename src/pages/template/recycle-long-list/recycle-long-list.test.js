const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('recycle-long-list', () => {
  if (isVapor) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
    
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/recycle-long-list/recycle-long-list');
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
