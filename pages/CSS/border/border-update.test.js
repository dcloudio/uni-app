describe('css-border-update', () => {
  let page;
  let res;

  beforeAll(async () => {
    page = await program.reLaunch("/pages/CSS/border/border-update")
    await page.waitFor('view');
  });

  it('Check Border Update', async () => {
    await page.callMethod('jest_border_update')
    await page.waitFor(100)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });
});
