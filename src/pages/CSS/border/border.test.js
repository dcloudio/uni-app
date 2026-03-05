describe('css-border', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch("/pages/CSS/border/border")
    await page.waitFor('view');
    await page.waitFor(2000);
  });

  it('Check Border Wait Screenshot', async () => {
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });
});
