describe('template-draggable-half-modal', () => {
  let page;

  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/draggable-half-modal/draggable-half-modal')
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
