const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('/pages/CSS/transition/transition-duration.uvue', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/transition/transition-duration')
    await page.waitFor(2000);
  });

  it('parses duration-only transition shorthand', async () => {
    const duration = await page.callMethod('getDurationOnlyTransition')
    expect(['500ms', '0.5s']).toContain(duration)
  })

  it("snap transition finish", async () => {
    await page.callMethod('jest_start');
    await page.waitFor(2000);
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
    await page.waitFor(500);
    await page.callMethod('jest_reset');
  })
});
