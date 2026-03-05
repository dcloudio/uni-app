let page;
describe('web-clipboard', () => {
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/choose-image/choose-image')
    await page.waitFor('view');
    await page.waitFor(2000);
  });

  it('screenshot', async () => {
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  });
});
