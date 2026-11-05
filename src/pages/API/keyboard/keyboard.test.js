const PAGE_PATH = '/pages/API/keyboard/keyboard'
const isHarmony = process.env.uniTestPlatformInfo.toLocaleLowerCase().startsWith('harmony')

describe('keyboard', () => {
  let page
  if (!isHarmony) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600)
  })

  it('Toggle keyboard diagnostics', async () => {
    const initiallyVisible = (await page.$('#keyboard-details')) !== null
    const toggle = await page.$('#toggle-keyboard-details')
    await toggle.tap()
    await page.waitFor(100)
    expect((await page.$('#keyboard-details')) !== null).toBe(!initiallyVisible)
    await toggle.tap()
    await page.waitFor(100)
    expect((await page.$('#keyboard-details')) !== null).toBe(initiallyVisible)
    expect(await page.$('#uni-input-box')).not.toBeNull()
  })

  async function waitForKeyboardState(visible, previousEventCount, timeout = 5000) {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      const keyboardHeight = await page.data('data.keyboardHeight')
      const animation = await page.data('keyboardAnimationData')
      if (animation.keyboardAnimationEventCount > previousEventCount &&
        animation.keyboardAnimationState === 'end' &&
        (visible ? keyboardHeight > 0 : keyboardHeight === 0) &&
        animation.keyboardAnimationHeight === keyboardHeight) {
        return true
      }
      await page.waitFor(100)
    }
    return false
  }

  async function waitForPanelBottom(expectedBottom, timeout = 3000) {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      const bottom = await page.callMethod('getKeyboardPanelBottom')
      if (bottom >= 0 && Math.abs(bottom - expectedBottom) <= 2) return true
      await page.waitFor(100)
    }
    return false
  }

  it('Check keyboard animation lifecycle', async () => {
    const initialBottom = await page.callMethod('getKeyboardPanelBottom')
    expect(initialBottom).toBeGreaterThan(0)
    const safeAreaBottom = await page.data('keyboardBottomSafeArea')
    // 每轮操作前记录计数，避免使用上一轮的 end 事件通过断言。
    for (let index = 0; index < 3; index++) {
      const hiddenEventCount = await page.data('keyboardAnimationData.keyboardAnimationEventCount')
      const hint = await page.$('#keyboard-composer-hint')
      await hint.tap()
      expect(await waitForKeyboardState(true, hiddenEventCount)).toBe(true)
      expect(await page.data('data.isFocus')).toBe(true)
      expect(await page.data('data.keyboardStatus')).toBe('显示中')
      const height = await page.data('keyboardAnimationData.keyboardAnimationHeight')
      const offset = Math.max(0, height - safeAreaBottom)
      expect(await waitForPanelBottom(initialBottom - offset)).toBe(true)

      const openedEventCount = await page.data('keyboardAnimationData.keyboardAnimationEventCount')
      const dismiss = await page.$('#keyboard-dismiss')
      await dismiss.tap()
      expect(await waitForKeyboardState(false, openedEventCount)).toBe(true)
      expect(await page.data('data.isFocus')).toBe(false)
      expect(await page.data('data.keyboardStatus')).toBe('已隐藏')
      expect(await waitForPanelBottom(initialBottom)).toBe(true)
    }
  })
})
