const container = 'list-view'
const platform = (process.env.uniTestPlatformInfo || process.env.UNI_OS_NAME || '').toLowerCase()
const isIos = platform.startsWith('ios')
const describeApp = /^(android|ios|harmony)/.test(platform) ? describe : describe.skip
const properties = [
  ['showScrollbar', 'changeShowScrollbar', true],
  ['scrollEnabled', 'changeScrollEnabled', true],
  ['pagingEnabled', 'changePagingEnabled', false]
]
if (isIos) properties.unshift(['bounces', 'changeBounces', true])
const methodIds = [
  ['scroll-to', ['scroll-to']],
  ['scroll-into-view', ['scroll-into-view']],
  ['refresh-scroll', ['trigger-refresh', 'close-refresh']],
  ['two-level-scroll', ['trigger-two-level', 'close-two-level']]
]

jest.setTimeout(30000)

describeApp(`ScrollViewContext / ${container}`, () => {
  let page
  beforeEach(async () => {
    page = await program.reLaunch(`/pages/API/scroll-view-context/${container}`)
    await page.waitFor(500)
  })

  async function waitFor(read, predicate) {
    const start = Date.now()
    let actual
    do {
      actual = await read()
      if (predicate(actual)) return actual
      await page.waitFor(100)
    } while (Date.now() - start < 5000)
    throw new Error(`等待页面变化超时，实际值：${JSON.stringify(actual)}`)
  }

  async function showContainer(id) {
    await program.callUniMethod('pageScrollTo', {
      selector: `#${id}`,
      offsetTop: -15,
      duration: 0
    })
    await page.waitFor(250)
  }

  async function scrollTop(id) {
    return Number(await (await page.$(`#${id}`)).callFunction('scroll-view.scrollTop'))
  }

  async function flag(id, property) {
    return await (await page.$(`#${id}`)).domProperty(property)
  }

  async function captureContainer(id) {
    const element = await page.$(`#${id}`)
    const offset = await element.offset()
    offset.top -= await page.scrollTop()
    const size = await element.size()
    const window = await program.callUniMethod('getWindowInfo')
    const { PNG } = require('pngjs')
    const png = PNG.sync.read(Buffer.from(await program.screenshot(), 'base64'))
    return { png, offset, size, window }
  }

  async function refreshing() {
    // iOS 读取刷新负偏移；Android 和 Harmony 检查实际指示器。
    if (platform.startsWith('ios')) return (await scrollTop('refresh-scroll')) < -20
    const { png, offset, size, window } = await captureContainer('refresh-scroll')
    const ratio = window.pixelRatio
    const center = offset.left + size.width / 2
    const top = window.safeAreaInsets.top + 44 + offset.top
    const reference =
      (Math.round((top + 4) * ratio) * png.width + Math.round((center - 30) * ratio)) * 4
    let pixels = 0
    // 取指示器左半部，避开双列瀑布流右列的条目文字；背景色从当前截图读取。
    for (let y = Math.ceil((top + 4) * ratio); y < (top + 42) * ratio; y++) {
      for (let x = Math.ceil((center - 18) * ratio); x < (center + 6) * ratio; x++) {
        const index = (y * png.width + x) * 4
        if (
          [0, 1, 2].some(
            (channel) => Math.abs(png.data[index + channel] - png.data[reference + channel]) > 48
          )
        )
          pixels++
      }
    }
    return pixels > Math.max(6, ratio * ratio * 3)
  }

  async function expectGreenPanel(id) {
    await waitFor(
      () => flag(id, 'refresherTwoLevelTriggered'),
      (visible) => visible
    )
    await page.waitFor(500)
    const { png, offset, size, window } = await captureContainer(id)
    let green = 0
    for (const x of [0.2, 0.5, 0.8]) {
      for (const y of [0.2, 0.5, 0.8]) {
        const px = Math.round((offset.left + size.width * x) * window.pixelRatio)
        const py = Math.round(
          (window.safeAreaInsets.top + 44 + offset.top + size.height * y) * window.pixelRatio
        )
        const index = (py * png.width + px) * 4
        if (
          Math.abs(png.data[index] - 183) < 12 &&
          Math.abs(png.data[index + 1] - 238) < 12 &&
          Math.abs(png.data[index + 2] - 214) < 12
        )
          green++
      }
    }
    expect(green).toBeGreaterThanOrEqual(7)
  }

  it('属性开关测试顶部容器，刷新和二级面板分别共用容器', async () => {
    expect((await page.$$('switch')).length).toBe(properties.length)
    expect(await page.$('#property-scroll')).not.toBeNull()
    for (const [id, buttons] of methodIds) {
      expect(await page.$(`#${id}`)).not.toBeNull()
      for (const button of buttons) expect(await page.$(`#call-${button}`)).not.toBeNull()
    }
  })

  for (const [name, handler, initial] of properties) {
    it(`${name} 写入后读取真实上下文属性`, async () => {
      for (const value of [!initial, initial]) {
        await page.callMethod(handler, value)
        expect(await page.data(`data.${name}`)).toBe(value)
      }
    })
  }

  it('scrollTo 只滚动自己的容器', async () => {
    await showContainer('scroll-to')
    await (await page.$('#call-scroll-to')).tap()
    await waitFor(
      () => scrollTop('scroll-to'),
      (top) => Math.abs(top - 120) <= 2
    )
    expect(await scrollTop('property-scroll')).toBe(0)
    expect(await scrollTop('scroll-into-view')).toBe(0)
  })

  it('scrollIntoView 获取对应上下文并定位到已显示的目标条目', async () => {
    await showContainer('scroll-into-view')
    await (await page.$('#call-scroll-into-view')).tap()
    await waitFor(
      () => scrollTop('scroll-into-view'),
      (top) => Math.abs(top - 80) <= 2
    )
    expect(await scrollTop('scroll-to')).toBe(0)
    expect(await scrollTop('property-scroll')).toBe(0)
  })

  it('triggerRefresh 显示自己的刷新区域', async () => {
    await showContainer('refresh-scroll')
    expect(await refreshing()).toBe(false)
    await (await page.$('#call-trigger-refresh')).tap()
    await waitFor(refreshing, (active) => active)
    expect(await scrollTop('property-scroll')).toBe(0)
  })

  it('closeRefresh 关闭本区域预先启动的刷新', async () => {
    await showContainer('refresh-scroll')
    await (await page.$('#call-trigger-refresh')).tap()
    await waitFor(refreshing, (active) => active)
    await (await page.$('#call-close-refresh')).tap()
    await waitFor(refreshing, (active) => !active)
  })

  it('triggerTwoLevel 显示自己的二级面板', async () => {
    await showContainer('two-level-scroll')
    await (await page.$('#call-trigger-two-level')).tap()
    await expectGreenPanel('two-level-scroll')
    expect(await scrollTop('property-scroll')).toBe(0)
  })

  it('closeTwoLevel 关闭本区域预先打开的二级面板', async () => {
    await showContainer('two-level-scroll')
    await (await page.$('#call-trigger-two-level')).tap()
    await expectGreenPanel('two-level-scroll')
    await (await page.$('#call-close-two-level')).tap()
    await waitFor(
      () => flag('two-level-scroll', 'refresherTwoLevelTriggered'),
      (visible) => !visible
    )
    await waitFor(
      () => scrollTop('two-level-scroll'),
      (top) => Math.abs(top) <= 2
    )
  })
})
