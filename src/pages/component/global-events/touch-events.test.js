jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/component/global-events/touch-events'

describe('touch-events-test', () => {
  if (isAndroid || isMP || isWeb || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
    await page.waitFor(isWeb ? 5000 : 1000);
  })

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();
  });

  // iPad 没点到
  it('touchStart-tagName-touchCount', async () => {
    const pageData = await page.data('data')
    let iconRect = pageData.iconRect
    let x = iconRect.x + iconRect.width / 2.0
    let y = iconRect.y + iconRect.height / 2.0

    // 点击图片
    await program.tap({
      x: x,
      y: y,
      duration: 100
    })

    await page.waitFor(1500);
    const touchTargets = await page.data('data.touchTargets')
    const touchTargetsCount = await page.data('data.touchTargetsCount')

    console.log('touchTargets', touchTargets)
    console.log('touchTargetsCount', touchTargetsCount)

    expect(touchTargets).toBe("IMAGEIMAGEIMAGEVIEW")
    expect(touchTargetsCount).toBe(2)
  })

  it('底部安全区域点击正常触发 touchstart 和 touchend #34134', async () => {
    const info = await program.callUniMethod('getWindowInfo')
    const bottom = info.safeAreaInsets.bottom
    if (bottom <= 0) {
      console.log('当前设备无底部安全区域，跳过底部安全区触摸验证')
      return
    }

    try {
      await page.callMethod('setBottomTouchTest', true)
      await page.waitFor('#bottom-touch-test')
      // 使用屏幕坐标点击安全区内部，不能用元素触发事件代替真实触摸。
      await program.tap({
        x: Math.round(info.screenWidth / 4),
        y: Math.round(info.screenHeight - bottom / 2),
        duration: 100
      })
      await page.waitFor(async () => {
        return (await page.callMethod('getBottomTouchEvents')).includes('tap')
      }, 3000)

      const events = await page.callMethod('getBottomTouchEvents')
      expect(events.filter(type => type === 'touchstart').length).toBe(1)
      expect(events.filter(type => type === 'touchend').length).toBe(1)
      expect(events).not.toContain('touchcancel')
      expect(events.indexOf('touchstart')).toBeLessThan(events.indexOf('touchend'))
    } finally {
      await page.callMethod('setBottomTouchTest', false)
    }
  })

})
