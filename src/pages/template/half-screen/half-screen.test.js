describe('template-half-screen', () => {
  let page;

  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/half-screen/half-screen')
    await page.waitFor('view')
  });

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  });

  it('打开弹窗 screenshot', async () => {
    const btn = await page.$('.bottomButton')
    await btn.tap()
    await page.waitFor(1000)
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  });
});
