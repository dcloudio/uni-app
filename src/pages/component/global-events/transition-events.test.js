const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('transition event', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
      page = await program.reLaunch('/pages/component/global-events/transition-events')
      await page.waitFor(3000);
  });

  it('transitionend', async () => {
      await page.callMethod('switchBtn')
      await page.waitFor(3000)
      expect(await page.data("data.onTransitionEndTriggr")).toBe(true)
      await page.callMethod('switchBtn')
      await page.waitFor(200)
      expect(await page.data("data.onTransitionEndTriggr")).toBe(false)
      await page.callMethod('switchBtn')
      await page.waitFor(3000)
      expect(await page.data("data.onTransitionEndTriggr")).toBe(true)
  });
});
