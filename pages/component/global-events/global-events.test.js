const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/component/global-events/global-events'

describe('event trigger', () => {
  if (process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('跳过横屏模式', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  const tapParams = {
    x: 0,
    y: 0,
    duration: 1000
  }
  beforeAll(async () => {
    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view')
    const windowInfo = await program.callUniMethod('getWindowInfo');
    topSafeArea = windowInfo.safeAreaInsets.top;
    const longPressTargetRect = await page.data('longPressTargetRect')
    tapParams.x = parseInt(longPressTargetRect.x + longPressTargetRect.width / 2)
    tapParams.y = parseInt(longPressTargetRect.y + longPressTargetRect.height / 2 + topSafeArea)
  })

  it('touch', async () => {
    if (!isAppWebView) {
      const el = await page.$('#touch-target')
      await el.touchstart({
        touches: [{
          identifier: 1,
          pageX: 101,
          pageY: 101,
          clientX: 101,
          clientY: 101,
          screenX: 101,
          screenY: 101
        }, ],
        changedTouches: [{
          identifier: 1,
          pageX: 101,
          pageY: 101,
          clientX: 101,
          clientY: 101,
          screenX: 101,
          screenY: 101
        }, ],
      })
      await page.waitFor(100)
      const touchStartTouchTargetIdentifier = '1'
      const touchStartTouchTargetValue = '101'
      const touchStartTouchIdentifier = await page.$('#touch-start-touch-identifier')
      expect(await touchStartTouchIdentifier.text()).toBe(touchStartTouchTargetIdentifier)
      const touchStartTouchPageX = await page.$('#touch-start-touch-page-x')
      expect(await touchStartTouchPageX.text()).toBe(touchStartTouchTargetValue)
      const touchStartTouchPageY = await page.$('#touch-start-touch-page-y')
      expect(await touchStartTouchPageY.text()).toBe(touchStartTouchTargetValue)
      const touchStartTouchClientX = await page.$('#touch-start-touch-client-x')
      expect(await touchStartTouchClientX.text()).toBe(touchStartTouchTargetValue)
      const touchStartTouchClientY = await page.$('#touch-start-touch-client-y')
      expect(await touchStartTouchClientY.text()).toBe(touchStartTouchTargetValue)
      const touchStartTouchScreenX = await page.$('#touch-start-touch-screen-x')
      expect(await touchStartTouchScreenX.text()).toBe(touchStartTouchTargetValue)
      const touchStartTouchScreenY = await page.$('#touch-start-touch-screen-y')
      expect(await touchStartTouchScreenY.text()).toBe(touchStartTouchTargetValue)

      const touchStartChangedTouchIdentifier = await page.$('#touch-start-changed-touch-identifier')
      expect(await touchStartChangedTouchIdentifier.text()).toBe(touchStartTouchTargetIdentifier)
      const touchStartChangedTouchPageX = await page.$('#touch-start-changed-touch-page-x')
      expect(await touchStartChangedTouchPageX.text()).toBe(touchStartTouchTargetValue)
      const touchStartChangedTouchPageY = await page.$('#touch-start-changed-touch-page-y')
      expect(await touchStartChangedTouchPageY.text()).toBe(touchStartTouchTargetValue)
      const touchStartChangedTouchClientX = await page.$('#touch-start-changed-touch-client-x')
      expect(await touchStartChangedTouchClientX.text()).toBe(touchStartTouchTargetValue)
      const touchStartChangedTouchClientY = await page.$('#touch-start-changed-touch-client-y')
      expect(await touchStartChangedTouchClientY.text()).toBe(touchStartTouchTargetValue)
      const touchStartChangedTouchScreenX = await page.$('#touch-start-changed-touch-screen-x')
      expect(await touchStartChangedTouchScreenX.text()).toBe(touchStartTouchTargetValue)
      const touchStartChangedTouchScreenY = await page.$('#touch-start-changed-touch-screen-y')
      expect(await touchStartChangedTouchScreenY.text()).toBe(touchStartTouchTargetValue)

      await el.touchmove({
        touches: [{
          identifier: 1,
          pageX: 102,
          pageY: 102,
          clientX: 102,
          clientY: 102,
          screenX: 102,
          screenY: 102
        }],
        changedTouches: [{
          identifier: 1,
          pageX: 102,
          pageY: 102,
          clientX: 102,
          clientY: 102,
          screenX: 102,
          screenY: 102
        }, ],
      })
      await page.waitFor(100)

      const touchMoveTouchTargetIdentifier = '1'
      const touchMoveTouchTargetValue = '102'
      const touchMoveTouchIdentifier = await page.$('#touch-move-touch-identifier')
      expect(await touchMoveTouchIdentifier.text()).toBe(touchMoveTouchTargetIdentifier)
      const touchMoveTouchPageX = await page.$('#touch-move-touch-page-x')
      expect(await touchMoveTouchPageX.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveTouchPageY = await page.$('#touch-move-touch-page-y')
      expect(await touchMoveTouchPageY.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveTouchClientX = await page.$('#touch-move-touch-client-x')
      expect(await touchMoveTouchClientX.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveTouchClientY = await page.$('#touch-move-touch-client-y')
      expect(await touchMoveTouchClientY.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveTouchScreenX = await page.$('#touch-move-touch-screen-x')
      expect(await touchMoveTouchScreenX.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveTouchScreenY = await page.$('#touch-move-touch-screen-y')
      expect(await touchMoveTouchScreenY.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveChangedTouchIdentifier = await page.$('#touch-move-changed-touch-identifier')
      expect(await touchMoveChangedTouchIdentifier.text()).toBe(touchMoveTouchTargetIdentifier)
      const touchMoveChangedTouchPageX = await page.$('#touch-move-changed-touch-page-x')
      expect(await touchMoveChangedTouchPageX.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveChangedTouchPageY = await page.$('#touch-move-changed-touch-page-y')
      expect(await touchMoveChangedTouchPageY.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveChangedTouchClientX = await page.$('#touch-move-changed-touch-client-x')
      expect(await touchMoveChangedTouchClientX.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveChangedTouchClientY = await page.$('#touch-move-changed-touch-client-y')
      expect(await touchMoveChangedTouchClientY.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveChangedTouchScreenX = await page.$('#touch-move-changed-touch-screen-x')
      expect(await touchMoveChangedTouchScreenX.text()).toBe(touchMoveTouchTargetValue)
      const touchMoveChangedTouchScreenY = await page.$('#touch-move-changed-touch-screen-y')
      expect(await touchMoveChangedTouchScreenY.text()).toBe(touchMoveTouchTargetValue)

      await el.touchend({
        touches: [{
          identifier: 1,
          pageX: 103,
          pageY: 103,
          clientX: 103,
          clientY: 103,
          screenX: 103,
          screenY: 103
        }],
        changedTouches: [{
          identifier: 1,
          pageX: 103,
          pageY: 103,
          clientX: 103,
          clientY: 103,
          screenX: 103,
          screenY: 103
        }, ],
      })
      await page.waitFor(100)
      const touchEndTouchTargetIdentifier = '1'
      const touchEndTouchTargetValue = '103'
      const touchEndTouchIdentifier = await page.$('#touch-end-touch-identifier')
      expect(await touchEndTouchIdentifier.text()).toBe(touchEndTouchTargetIdentifier)
      const touchEndTouchPageX = await page.$('#touch-end-touch-page-x')
      expect(await touchEndTouchPageX.text()).toBe(touchEndTouchTargetValue)
      const touchEndTouchPageY = await page.$('#touch-end-touch-page-y')
      expect(await touchEndTouchPageY.text()).toBe(touchEndTouchTargetValue)
      const touchEndTouchClientX = await page.$('#touch-end-touch-client-x')
      expect(await touchEndTouchClientX.text()).toBe(touchEndTouchTargetValue)
      const touchEndTouchClientY = await page.$('#touch-end-touch-client-y')
      expect(await touchEndTouchClientY.text()).toBe(touchEndTouchTargetValue)
      const touchEndTouchScreenX = await page.$('#touch-end-touch-screen-x')
      expect(await touchEndTouchScreenX.text()).toBe(touchEndTouchTargetValue)
      const touchEndTouchScreenY = await page.$('#touch-end-touch-screen-y')
      expect(await touchEndTouchScreenY.text()).toBe(touchEndTouchTargetValue)
      const touchEndChangedTouchIdentifier = await page.$('#touch-end-changed-touch-identifier')
      expect(await touchEndChangedTouchIdentifier.text()).toBe(touchEndTouchTargetIdentifier)
      const touchEndChangedTouchPageX = await page.$('#touch-end-changed-touch-page-x')
      expect(await touchEndChangedTouchPageX.text()).toBe(touchEndTouchTargetValue)
      const touchEndChangedTouchPageY = await page.$('#touch-end-changed-touch-page-y')
      expect(await touchEndChangedTouchPageY.text()).toBe(touchEndTouchTargetValue)
      const touchEndChangedTouchClientX = await page.$('#touch-end-changed-touch-client-x')
      expect(await touchEndChangedTouchClientX.text()).toBe(touchEndTouchTargetValue)
      const touchEndChangedTouchClientY = await page.$('#touch-end-changed-touch-client-y')
      expect(await touchEndChangedTouchClientY.text()).toBe(touchEndTouchTargetValue)
      const touchEndChangedTouchScreenX = await page.$('#touch-end-changed-touch-screen-x')
      expect(await touchEndChangedTouchScreenX.text()).toBe(touchEndTouchTargetValue)
      const touchEndChangedTouchScreenY = await page.$('#touch-end-changed-touch-screen-y')
      expect(await touchEndChangedTouchScreenY.text()).toBe(touchEndTouchTargetValue)
    }
  })

  it('click', async () => {
    if (isMP) {
      page = await program.navigateTo(PAGE_PATH)
      await page.waitFor('view')
      const el = await page.$('#longpress-target')
      await el.tap()
      await page.waitFor(500)
      const clickEventX = await page.$('#click-event-x')
      expect(parseInt(await clickEventX.text())).toBeGreaterThan(0)
      const clickEventY = await page.$('#click-event-y')
      expect(parseInt(await clickEventY.text())).toBeGreaterThan(0)
    } else {
      const el = await page.$('#longpress-target')
      await el.tap()
      await page.waitFor(100)
      const targetX = '0'
      const targetY = '0'
      const tapEventX = await page.$('#tap-event-x')
      expect(await tapEventX.text()).toBe(targetX)
      const tapEventY = await page.$('#tap-event-y')
      expect(await tapEventY.text()).toBe(targetY)
      const clickEventX = await page.$('#click-event-x')
      expect(await clickEventX.text()).toBe(targetX)
      const clickEventY = await page.$('#click-event-y')
      expect(await clickEventY.text()).toBe(targetY)
    }
  })

  it('longPress', async () => {
    if (!isAppWebView) {
      const el = await page.$('#longpress-target')
      await el.longpress()
      await page.waitFor(100)
      if (isMP) {
        const longPressTouchIdentifier = await page.$('#long-press-touch-identifier')
        expect(await longPressTouchIdentifier.text()).toBe('0')
        const longPressTouchPageX = await page.$('#long-press-touch-page-x')
        expect(parseInt(await longPressTouchPageX.text())).toBeGreaterThan(0)
        const longPressTouchPageY = await page.$('#long-press-touch-page-y')
        expect(parseInt(await longPressTouchPageY.text())).toBeGreaterThan(0)
        const longPressTouchClientX = await page.$('#long-press-touch-client-x')
        expect(parseInt(await longPressTouchClientX.text())).toBeGreaterThan(0)
        const longPressTouchClientY = await page.$('#long-press-touch-client-y')
        expect(parseInt(await longPressTouchClientY.text())).toBeGreaterThan(0)
        const longPressChangedTouchIdentifier = await page.$('#long-press-changed-touch-identifier')
        expect(await longPressChangedTouchIdentifier.text()).toBe('0')
        const longPressChangedTouchPageX = await page.$('#long-press-changed-touch-page-x')
        expect(parseInt(await longPressChangedTouchPageX.text())).toBeGreaterThan(0)
        const longPressChangedTouchPageY = await page.$('#long-press-changed-touch-page-y')
        expect(parseInt(await longPressChangedTouchPageY.text())).toBeGreaterThan(0)
        const longPressChangedTouchClientX = await page.$('#long-press-changed-touch-client-x')
        expect(parseInt(await longPressChangedTouchClientX.text())).toBeGreaterThan(0)
        const longPressChangedTouchClientY = await page.$('#long-press-changed-touch-client-y')
        expect(parseInt(await longPressChangedTouchClientY.text())).toBeGreaterThan(0)
      } else {
        const longPressTouchTargetIdentifier = '1'
        const longPressTouchTargetValue = '0'
        const longPressTouchIdentifier = await page.$('#long-press-touch-identifier')
        expect(await longPressTouchIdentifier.text()).toBe(longPressTouchTargetIdentifier)
        const longPressTouchPageX = await page.$('#long-press-touch-page-x')
        expect(await longPressTouchPageX.text()).toBe(longPressTouchTargetValue)
        const longPressTouchPageY = await page.$('#long-press-touch-page-y')
        expect(await longPressTouchPageY.text()).toBe(longPressTouchTargetValue)
        const longPressTouchClientX = await page.$('#long-press-touch-client-x')
        expect(await longPressTouchClientX.text()).toBe(longPressTouchTargetValue)
        const longPressTouchClientY = await page.$('#long-press-touch-client-y')
        expect(await longPressTouchClientY.text()).toBe(longPressTouchTargetValue)
        const longPressTouchScreenX = await page.$('#long-press-touch-screen-x')
        expect(await longPressTouchScreenX.text()).toBe(longPressTouchTargetValue)
        const longPressTouchScreenY = await page.$('#long-press-touch-screen-y')
        expect(await longPressTouchScreenY.text()).toBe(longPressTouchTargetValue)
        const longPressChangedTouchIdentifier = await page.$('#long-press-changed-touch-identifier')
        expect(await longPressChangedTouchIdentifier.text()).toBe(longPressTouchTargetIdentifier)
        const longPressChangedTouchPageX = await page.$('#long-press-changed-touch-page-x')
        expect(await longPressChangedTouchPageX.text()).toBe(longPressTouchTargetValue)
        const longPressChangedTouchPageY = await page.$('#long-press-changed-touch-page-y')
        expect(await longPressChangedTouchPageY.text()).toBe(longPressTouchTargetValue)
        const longPressChangedTouchClientX = await page.$('#long-press-changed-touch-client-x')
        expect(await longPressChangedTouchClientX.text()).toBe(longPressTouchTargetValue)
        const longPressChangedTouchClientY = await page.$('#long-press-changed-touch-client-y')
        expect(await longPressChangedTouchClientY.text()).toBe(longPressTouchTargetValue)
        const longPressChangedTouchScreenX = await page.$('#long-press-changed-touch-screen-x')
        expect(await longPressChangedTouchScreenX.text()).toBe(longPressTouchTargetValue)
        const longPressChangedTouchScreenY = await page.$('#long-press-changed-touch-screen-y')
        expect(await longPressChangedTouchScreenY.text()).toBe(longPressTouchTargetValue)

        if (isAndroid || isIos || isHarmony) {
          await program.tap(tapParams)
          const longPressTouchIdentifierText = await longPressTouchIdentifier.text()
          expect(longPressTouchIdentifierText).not.toBe(longPressTouchTargetIdentifier)
          expect(longPressTouchIdentifierText).toBeTruthy()
          const longPressTouchPageXText = await longPressTouchPageX.text()
          expect(longPressTouchPageXText).not.toBe(longPressTouchTargetValue)
          expect(longPressTouchPageXText).toBeTruthy()
          const longPressTouchPageYText = await longPressTouchPageY.text()
          expect(longPressTouchPageYText).not.toBe(longPressTouchTargetValue)
          expect(longPressTouchPageYText).toBeTruthy()
          const longPressTouchClientXText = await longPressTouchClientX.text()
          expect(longPressTouchClientXText).not.toBe(longPressTouchTargetValue)
          expect(longPressTouchClientXText).toBeTruthy()
          const longPressTouchClientYText = await longPressTouchClientY.text()
          expect(longPressTouchClientYText).not.toBe(longPressTouchTargetValue)
          expect(longPressTouchClientYText).toBeTruthy()
          const longPressTouchScreenXText = await longPressTouchScreenX.text()
          expect(longPressTouchScreenXText).not.toBe(longPressTouchTargetValue)
          expect(longPressTouchScreenXText).toBeTruthy()
          const longPressTouchScreenYText = await longPressTouchScreenY.text()
          expect(longPressTouchScreenYText).not.toBe(longPressTouchTargetValue)
          expect(longPressTouchScreenYText).toBeTruthy()
          const longPressChangedTouchIdentifierText = await longPressChangedTouchIdentifier.text()
          expect(longPressChangedTouchIdentifierText).not.toBe(longPressTouchTargetIdentifier)
          expect(longPressChangedTouchIdentifierText).toBeTruthy()
          const longPressChangedTouchPageXText = await longPressChangedTouchPageX.text()
          expect(longPressChangedTouchPageXText).not.toBe(longPressTouchTargetValue)
          expect(longPressChangedTouchPageXText).toBeTruthy()
          const longPressChangedTouchPageYText = await longPressChangedTouchPageY.text()
          expect(longPressChangedTouchPageYText).not.toBe(longPressTouchTargetValue)
          expect(longPressChangedTouchPageYText).toBeTruthy()
          const longPressChangedTouchClientXText = await longPressChangedTouchClientX.text()
          expect(longPressChangedTouchClientXText).not.toBe(longPressTouchTargetValue)
          expect(longPressChangedTouchClientXText).toBeTruthy()
          const longPressChangedTouchClientYText = await longPressChangedTouchClientY.text()
          expect(longPressChangedTouchClientYText).not.toBe(longPressTouchTargetValue)
          expect(longPressChangedTouchClientYText).toBeTruthy()
          const longPressChangedTouchScreenXText = await longPressChangedTouchScreenX.text()
          expect(longPressChangedTouchScreenXText).not.toBe(longPressTouchTargetValue)
          expect(longPressChangedTouchScreenXText).toBeTruthy()
          const longPressChangedTouchScreenYText = await longPressChangedTouchScreenY.text()
          expect(longPressChangedTouchScreenYText).not.toBe(longPressTouchTargetValue)
          expect(longPressChangedTouchScreenYText).toBeTruthy()
        }
      }
    }
  })

  if (isIos || isHarmony) {
    it('mock tap event', async () => {
      await page.callMethod('clearAllEvents')

      tapParams.duration = 0
      await program.tap(tapParams)
      await page.waitFor(200)

      const clickEventX = await page.$('#click-event-x')
      const StringX = await clickEventX.text()

      expect(Number(StringX)).toBeGreaterThan(0)
      const clickEventY = await page.$('#click-event-y')
      const StringY = await clickEventY.text()
      expect(Number(StringY)).toBeGreaterThan(0)
    })
  }
})
