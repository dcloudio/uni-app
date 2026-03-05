const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')

describe('global event transform', () => {
  if (!isAndroid) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/global-events/global-events-transform')
    await page.waitFor(3000);
  });

  it('event transform click', async () => {
    const el = await page.$('#event-transform')
    await el.tap()
    await page.waitFor(100)
    expect(await page.data("data.clickTriger")).toBe(true)
  });
  it('event transform longclick', async () => {
    const el = await page.$('#event-transform')
    await el.longpress()
    await page.waitFor(100)
    expect(await page.data("data.longClickTriger")).toBe(true)
  });
});
