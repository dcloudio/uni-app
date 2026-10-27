const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMpWeixin = platformInfo === 'mp-weixin'

describe('test WXS drag interaction', () => {
  let page,movable;
  if (!isMpWeixin) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/wxs-drag-interaction/wxs-drag-interaction')
    await page.waitFor(3000);
    movable = await page.$('.movable');
  });

  it('setColor', async () => {
    const setColor = await page.$('.setColor')
    await setColor.tap()
    expect(await setColor.style('color')).toEqual('rgb(255, 0, 0)');
  });

  it('check title', async () => {
    const titleText = await movable.text();
    expect(titleText).toEqual('Hello');
  });

  it('touchstart-touchmove', async () => {
    const offsetBefore = await movable.offset()
    await movable.touchstart({
      touches: [{
        identifier: 0,
        pageX: 92,
        pageY: 93,
        clientX: 92,
        clientY: 93
      }],
      changedTouches: [{
        identifier: 0,
        pageX: 92,
        pageY: 93,
        clientX: 92,
        clientY: 93
      }]
    })
    await page.waitFor(100)
    await movable.touchmove({
      touches: [{
        identifier: 0,
        pageX: 207,
        pageY: 385,
        clientX: 207,
        clientY: 385
      }],
      changedTouches: [{
        identifier: 0,
        pageX: 207,
        pageY: 385,
        clientX: 207,
        clientY: 385
      }]
    })
    await page.waitFor(100)
    const offsetAfter = await movable.offset()
    expect(offsetAfter.left).toBeGreaterThan(offsetBefore.left);
    expect(offsetAfter.top).toBeGreaterThan(offsetBefore.top);
  });
});
