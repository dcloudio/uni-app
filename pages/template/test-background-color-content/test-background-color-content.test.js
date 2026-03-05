describe('PagesJson-backgroundColorContent', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch(
      '/pages/template/test-background-color-content/test-background-color-content')
    await page.waitFor('view');
    await page.waitFor(1000);
  });

  it('screenShot', async () => {
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot()
  })
  it('background color content size', async () => {
    await program.pageScrollTo(1000)
    await page.waitFor(2000);
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot()
  })
});
