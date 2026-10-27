const isVapor = process.env.UNI_APP_X_DOM2 === "true";

describe('css-direction', () => {
  if (!isVapor) {
    it('skip', () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/text/direction');
    await page.waitFor(1000);
  });

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  });
});
