jest.setTimeout(30000)

describe('test preventDefault click', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  const isHarmony = platformInfo.startsWith('harmony')
  const isVapor = process.env.UNI_APP_X_DOM2 === "true"

  // TODO: dom1 harmony 暂不支持 touch 事件中 preventDefault 阻止 click
  if (isWeb || isMP || (isHarmony && !isVapor)) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  beforeAll(async () => {
    page = await program.reLaunch("/pages/component/global-events/touch-events-preventDefault-click");
    await page.waitFor(3000);
  });

  // 都没有拦截的情况下
  it('preventDefault with click', async () => {
    await page.setData({
      data: {
        isParentPreventDefault: false,
        isPreventDefault: false,
        isParentClickTrigger: false,
        isClickTrigger: false,
      }
    })
    var eventDomRect = await page.data("data.eventDomRect")
    await page.waitFor(300);
    let x = eventDomRect.x + eventDomRect.width / 2.0
    let y = eventDomRect.y + eventDomRect.height / 2.0
    await program.tap({
      x: x,
      y: y,
      duration: 100
    })
    await page.waitFor(200);
    const isClickTrigger = await page.data("data.isClickTrigger");
    expect(isClickTrigger).toEqual(true);
    const isParentClickTrigger = await page.data("data.isParentClickTrigger");
    expect(isParentClickTrigger).toEqual(true);
  });
  // 子调用preventDefault
  it('child preventDefault without click', async () => {
    await page.setData({
      data: {
        isParentPreventDefault: false,
        isPreventDefault: true,
        isParentClickTrigger: false,
        isClickTrigger: false,
      }
    })
    var eventDomRect = await page.data("data.eventDomRect")
    await page.waitFor(300);
    let x = eventDomRect.x + eventDomRect.width / 2.0
    let y = eventDomRect.y + eventDomRect.height / 2.0
    await program.tap({
      x: x,
      y: y,
      duration: 100
    })
    await page.waitFor(200);
    const isClickTrigger = await page.data("data.isClickTrigger");
    expect(isClickTrigger).toEqual(false);
    const isParentClickTrigger = await page.data("data.isParentClickTrigger");
    expect(isParentClickTrigger).toEqual(false);
  });
  // 父调用preventDefault
  it('child preventDefault without click', async () => {
    await page.setData({
      data: {
        isParentPreventDefault: true,
        isPreventDefault: false,
        isParentClickTrigger: false,
        isClickTrigger: false,
      }
    })
    var eventDomRect = await page.data("data.eventDomRect")
    await page.waitFor(300);
    let x = eventDomRect.x + eventDomRect.width / 2.0
    let y = eventDomRect.y + eventDomRect.height / 2.0
    await program.tap({
      x: x,
      y: y,
      duration: 100
    })
    await page.waitFor(200);
    const isClickTrigger = await page.data("data.isClickTrigger");
    expect(isClickTrigger).toEqual(false);
    const isParentClickTrigger = await page.data("data.isParentClickTrigger");
    expect(isParentClickTrigger).toEqual(false);
  });
});
