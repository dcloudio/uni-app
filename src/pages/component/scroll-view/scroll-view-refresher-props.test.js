describe('scroll-view-refresher-props', () => {
  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/component/scroll-view/scroll-view-refresher-props');
    await page.waitFor('view');
    await page.waitFor(1000);

    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });
});
