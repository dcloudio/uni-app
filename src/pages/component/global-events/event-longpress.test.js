// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/

describe('test longPress', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  if (isWeb || isMP) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  beforeAll(async () => {
    page = await program.reLaunch("/pages/component/global-events/event-longpress");
    await page.waitFor(3000);
  });

  it('check longPress event', async () => {
    let eventDomRect = await page.data("data.eventDomRect")
    let x = eventDomRect.x + eventDomRect.width / 2.0
    let y = eventDomRect.y + eventDomRect.height / 2.0
    await program.device.tap(x, y+100, {duration: 1000})
    let isLongPressTrigger = await page.data("data.isLongPressTrigger")
    expect(isLongPressTrigger).toEqual(true);
  });
});
