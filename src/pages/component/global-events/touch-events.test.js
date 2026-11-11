jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isApp = isAndroid || platformInfo.startsWith('ios') || platformInfo.startsWith('harmony')

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

describe('touchend coordinates #34632', () => {
  if (!isApp || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1000)
  })

  async function startTest() {
    await page.callMethod('setTouchEndTest', true)
    await page.waitFor('#touch-end-coordinate-test')
    await page.waitFor(200)
    const rect = await page.callMethod('getTouchEndTestRect')
    expect(rect).not.toBeNull()
    expect(rect.width).toBeGreaterThan(0)
    expect(rect.height).toBeGreaterThan(0)
    const info = await program.callUniMethod('getWindowInfo')
    const navigationOffset = info.safeAreaInsets.top + 44
    return {
      x: Math.round(rect.left + rect.width / 2),
      y: Math.round(rect.top + navigationOffset + rect.height / 2),
      distance: Math.floor(Math.min(rect.width / 4, 80))
    }
  }

  async function getCompletedGesture() {
    await page.waitFor(async () => {
      const result = await page.callMethod('getTouchEndTestResult')
      return result.endCount > 0 || result.cancelled
    }, 3000)
    const result = await page.callMethod('getTouchEndTestResult')
    expect(result.cancelled).toBe(false)
    expect(result.start).not.toBeNull()
    expect(result.end).not.toBeNull()
    expect(result.endCount).toBe(1)
    expect(result.activeAtEnd).toBe(0)
    expect(result.end.identifier).toBe(result.start.identifier)
    return result
  }

  function expectSameCoordinates(actual, expected) {
    expect(actual.identifier).toBe(expected.identifier)
    for (const key of ['screenX', 'screenY', 'clientX', 'clientY', 'pageX', 'pageY']) {
      expect(actual[key]).toBe(expected[key])
    }
  }

  for (const duration of [150, 600]) {
    it('拖动 ' + duration + 'ms 后 touchend 沿用最后一次 touchmove 坐标', async () => {
      try {
        const point = await startTest()
        await program.swipe({
          startPoint: { x: point.x - point.distance, y: point.y },
          endPoint: { x: point.x + point.distance, y: point.y },
          duration
        })
        const result = await getCompletedGesture()
        expect(result.moveCount).toBeGreaterThan(0)
        expect(result.lastMove).not.toBeNull()
        expect(Math.abs(result.lastMove.screenX - result.start.screenX)).toBeGreaterThan(10)
        expectSameCoordinates(result.end, result.lastMove)
      } finally {
        await page.callMethod('setTouchEndTest', false)
      }
    })
  }

  it('未移动直接松手时 touchend 沿用 touchstart 坐标', async () => {
    try {
      const point = await startTest()
      await program.tap({ x: point.x, y: point.y, duration: 100 })
      const result = await getCompletedGesture()
      expect(result.moveCount).toBe(0)
      expect(result.lastMove).toBeNull()
      expectSameCoordinates(result.end, result.start)
    } finally {
      await page.callMethod('setTouchEndTest', false)
    }
  })
})
