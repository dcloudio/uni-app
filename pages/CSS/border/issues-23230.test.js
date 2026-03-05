describe('issues-23230', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch("/pages/CSS/border/issues-23230")
    await page.waitFor('view');
    await page.waitFor(2000);
  });

  it('issues23230', async () => {
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });
});
