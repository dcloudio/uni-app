describe('css-font-size', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/text/font-size');
  });

  it('change font-size screenshot', async () => {
    await page.callMethod("setFontSize");
    await page.waitFor(100);
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  });
});
