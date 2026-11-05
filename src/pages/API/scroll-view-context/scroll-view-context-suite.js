jest.setTimeout(180000)

const PAGE = '/pages/API/scroll-view-context/'
const platform = process.env.uniTestPlatformInfo || process.env.UNI_OS_NAME || 'unknown'
const platformInfo = platform.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
async function snapshot(page, full = false) {
  return JSON.parse(await page.callMethod('acceptanceSnapshot', full))
}

async function waitUntil(page, predicate, timeout = 120000) {
  const start = Date.now()
  let state
  do {
    state = await snapshot(page)
    if (predicate(state)) return state
    await page.waitFor(300)
  } while (Date.now() - start < timeout)
  throw new Error(`等待验收超时：${JSON.stringify(state)}`)
}

function registerScrollViewContextSuite(container) {
  const register = isApp ? describe : describe.skip
  register(`ScrollViewContext / ${container} / App Vapor bytecode`, () => {
    it(`${container}: 从入口页进入独立页面`, async () => {
      const entry = await program.reLaunch(`${PAGE}scroll-view-context`)
      await entry.waitFor(500)
      await (await entry.$(`#open-${container}`)).tap()
      await entry.waitFor(700)
      const page = await program.currentPage()
      expect(page.path.replace(/^\//, '')).toBe(`pages/API/scroll-view-context/${container}`)
      expect(await (await page.$('#outside-target')).text()).toContain(`${container} / ScrollViewContext`)
      expect(await page.$('#select-scroll-view')).toBeNull()
      expect(await page.$('#select-list-view')).toBeNull()
      expect(await page.$('#select-waterflow')).toBeNull()
    })

    it(`${container}: 各属性及方法可独立演示和检查`, async () => {
      const page = await program.reLaunch(`${PAGE}${container}?direction=vertical`)
      await waitUntil(page, (state) => state.ready, 15000)
      const keys = [
        'node.exec', 'node.callback', 'bounces', 'showScrollbar', 'scrollEnabled', 'pagingEnabled',
        'scrollTo', 'scrollIntoView', 'triggerRefresh', 'closeRefresh', 'triggerTwoLevel', 'closeTwoLevel'
      ]
      for (const key of keys) {
        await page.callMethod('checkFocused', key)
        const start = Date.now()
        let state
        do {
          state = JSON.parse(await page.callMethod('focusedSnapshot'))
          if (!state.running && state.checks.some((check) => check.id === key)) break
          await page.waitFor(100)
        } while (Date.now() - start < 10000)
        const result = state.checks.find((check) => check.id === key)
        expect(result).toBeDefined()
        expect(result.passed).toBe(true)
      }
    })

    it(`${container}: 属性、坐标、动画、定位、刷新及二级面板`, async () => {
      const page = await program.reLaunch(`${PAGE}${container}`)
      await waitUntil(page, (state) => state.ready, 15000)
      await page.callMethod('startAcceptance')
      await waitUntil(page, (value) => !value.running && value.count > 0)
      const state = await snapshot(page, true)
      // 不依赖页面显示的 PASS 文案，直接核对每项检查结果。
      expect(state.container).toBe(container)
      expect(state.unsupportedProperties).toEqual([
        'fastDeceleration', 'decelerationDisabled', 'withinExtent'
      ])
      expect(state.checks.length).toBeGreaterThan(50)
      expect(state.checks.filter((check) => !check.passed)).toEqual([])
    })

    it(`${container}: 原生手势禁用、恢复、分页、独立控制区及二级面板`, async () => {
      const page = await program.reLaunch(`${PAGE}${container}?direction=vertical`)
      const initial = await waitUntil(page, (state) => state.ready, 15000)
      const windowInfo = await program.callUniMethod('getWindowInfo')
      // 与仓库现有的原生刷新测试一致：页面坐标加顶部安全区和默认导航栏高度。
      const screenTop = windowInfo.safeAreaInsets.top + 44
      const checks = []
      async function check(id, action) {
        if (!initial.gestureReady) {
          checks.push({ id, passed: false, blocked: true, actual: '当前基座缺少手势验收所需的 scrollEnabled/pagingEnabled/刷新接口' })
          return
        }
        try {
          expect(Number.isFinite(screenTop)).toBe(true)
          const actual = await action()
          checks.push({ id, passed: true, actual })
        } catch (error) {
          checks.push({ id, passed: false, blocked: String(error).includes('当前基座缺少'), actual: String(error) })
        }
      }
      async function drag(rect, down = false, xFraction = 0.8, longSwipe = false) {
        const x = rect.left + rect.width * xFraction
        // getBoundingClientRect 相对页面视口；原生输入使用屏幕坐标。
        const y1 = screenTop + rect.top + rect.height * (longSwipe ? 0.9 : down ? 0.1 : 0.8)
        const y2 = screenTop + rect.top + rect.height * (longSwipe ? 0.1 : down ? 0.95 : 0.2)
        await program.swipe({ startPoint: { x, y: y1 }, endPoint: { x, y: y2 }, duration: longSwipe ? 300 : 650 })
        await page.waitFor(1800)
      }
      await check('gesture.disabled', async () => {
        await page.callMethod('prepareGesture', { enabled: false, paging: false, offset: 300, bounce: false, twoLevelEnabled: true })
        await page.waitFor(500)
        const before = await snapshot(page)
        await drag(before.viewport)
        const after = await snapshot(page)
        expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(2)
        return `before=${before.top},after=${after.top}`
      })
      await check('gesture.enabled', async () => {
        await page.callMethod('prepareGesture', { enabled: true, paging: false, offset: 300, bounce: false, twoLevelEnabled: true })
        await page.waitFor(500)
        const before = await snapshot(page)
        await drag(before.viewport)
        const after = await snapshot(page)
        expect(after.top).toBeGreaterThan(before.top + 20)
        return `before=${before.top},after=${after.top}`
      })
      await check('gesture.paging', async () => {
        // 从两个分页边界之间起滑，避免慢速手势吸附回原页时误判为分页失效。
        const startOffset = Math.round(initial.viewport.height * 1.5)
        await page.callMethod('prepareGesture', { enabled: true, paging: true, offset: startOffset, bounce: false, twoLevelEnabled: true })
        await page.waitFor(500)
        const before = await snapshot(page)
        expect(Math.abs(before.top - startOffset)).toBeLessThanOrEqual(2)
        await drag(before.viewport, false, 0.8, true)
        const after = await snapshot(page)
        expect(after.top).toBeGreaterThan(before.top + 20)
        const pageOffset = after.top / before.viewport.height
        expect(Math.abs(pageOffset - Math.round(pageOffset)) * before.viewport.height).toBeLessThanOrEqual(2)
        return `top=${after.top},height=${before.viewport.height}`
      })
      await check('gesture.controlsIsolation', async () => {
        await page.callMethod('prepareGesture', { enabled: true, paging: false, offset: 300, bounce: false, twoLevelEnabled: true })
        const originalPageTop = await page.scrollTop()
        await page.callMethod('setControlsMaxHeightForTest', '120px')
        try {
          await page.waitFor(500)
          await program.pageScrollTo(100000)
          await page.waitFor(500)
          const before = await snapshot(page)
          expect(before.controls.top).toBeGreaterThanOrEqual(0)
          expect(before.controls.bottom).toBeLessThanOrEqual(windowInfo.windowHeight)
          expect(before.controlsScrollHeight - before.controls.height).toBeGreaterThan(5)
          await drag(before.controls, false, 0.1)
          const after = await snapshot(page)
          expect(after.controlsTop).toBeGreaterThan(before.controlsTop + 5)
          expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(2)
          return `controls=${before.controlsTop}->${after.controlsTop},preview=${before.top}->${after.top}`
        } finally {
          try {
            await page.callMethod('setControlsMaxHeightForTest', '')
          } finally {
            await program.pageScrollTo(originalPageTop)
            await page.waitFor(300)
          }
        }
      })
      await check('gesture.refreshDisabled', async () => {
        await page.callMethod('prepareGesture', { enabled: false, paging: false, offset: 0, bounce: true, twoLevelEnabled: false })
        await page.waitFor(500)
        const before = await snapshot(page)
        await drag(before.viewport, true)
        const after = await snapshot(page)
        expect(after.refresh).toBe(before.refresh)
        return `refresh=${after.refresh}`
      })
      await check('gesture.refreshRestored', async () => {
        await page.callMethod('prepareGesture', { enabled: true, paging: false, offset: 0, bounce: true, twoLevelEnabled: false })
        await page.waitFor(500)
        const before = await snapshot(page)
        await drag(before.viewport, true)
        const after = await snapshot(page)
        expect(after.refresh).toBe(before.refresh + 1)
        await page.callMethod('finishGestureRefresh')
        await page.waitFor(500)
        return `refresh=${after.refresh}`
      })
      await check('gesture.twoLevelVisible', async () => {
        await page.callMethod('prepareGesture', { enabled: true, paging: false, offset: 0, bounce: false, twoLevelEnabled: true })
        await page.waitFor(500)
        await page.callMethod('triggerTwoLevel')
        await page.waitFor(700)
        const open = await snapshot(page)
        const screenshot = await program.screenshot()
        expect(open.twoLevel).toBe(true)
        expect(open.refresher).toBeTruthy()
        const visibleHeight = Math.min(open.refresher.bottom, open.viewport.bottom) - Math.max(open.refresher.top, open.viewport.top)
        expect(visibleHeight).toBeGreaterThan(open.viewport.height * 0.8)
        // 原生节点的几何区域存在，也可能没有绘制插槽；核对实际绿色面板。
        const { PNG } = require('pngjs')
        const png = PNG.sync.read(Buffer.from(screenshot, 'base64'))
        const ratio = windowInfo.pixelRatio
        let green = 0
        for (const fx of [0.2, 0.35, 0.5, 0.65, 0.8]) {
          for (const fy of [0.2, 0.35, 0.5, 0.65, 0.8]) {
            const x = Math.round((open.viewport.left + open.viewport.width * fx) * ratio)
            const y = Math.round((screenTop + open.viewport.top + open.viewport.height * fy) * ratio)
            const index = (y * png.width + x) * 4
            if (Math.abs(png.data[index] - 183) < 12 && Math.abs(png.data[index + 1] - 238) < 12 && Math.abs(png.data[index + 2] - 214) < 12) green++
          }
        }
        expect(green).toBeGreaterThanOrEqual(20)
        await page.callMethod('closeTwoLevel')
        await page.waitFor(700)
        const close = await snapshot(page)
        expect(close.twoLevel).toBe(false)
        expect(Math.abs(close.top)).toBeLessThanOrEqual(2)
        return `visibleHeight=${visibleHeight},greenSamples=${green}/25,closedTop=${close.top}`
      })
      expect(checks.filter((value) => !value.passed)).toEqual([])
    })
  })
}

module.exports = { registerScrollViewContextSuite }
