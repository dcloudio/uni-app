describe('match-media', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/match-media/match-media')
    await page.waitFor(2000);
  });

  it('match-media screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();
  });
});
