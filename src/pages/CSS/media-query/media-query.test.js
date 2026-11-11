const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isApp = ['android', 'ios', 'harmony'].some(name => platformInfo.startsWith(name))
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true'
const PAGE_PATH = '/pages/CSS/media-query/media-query'
const COMPONENT_ONLY_PATH = '/pages/CSS/media-query/component-only'
// Chrome 对比例交叉乘积的等值和 min/max 使用 1/64 绝对容差，严格比较不使用。
const RATIO_PRECISION = 1 / 64

jest.setTimeout(60000)

describe('css-media-query', () => {
  if (!isApp || !isVapor || isAppWebView) {
    it('仅支持 App 蒸汽模式', () => { expect(1).toBe(1) })
    return
  }

  let page
  let originalOrientation
  let orientationChanged = false

  async function readViewport() {
    const { windowWidth, windowHeight } = await program.callUniMethod('getWindowInfo')
    return { width: windowWidth, height: windowHeight }
  }

  async function getViewport() {
    const viewport = await readViewport()
    expect(viewport.width).toBeGreaterThan(0)
    expect(viewport.height).toBeGreaterThan(0)
    return viewport
  }

  async function expectMatch(id, matches) {
    const element = await page.$('#' + id)
    expect(element).not.toBeNull()
    const unmatched = await page.$('#' + id + '-unmatched')
    expect(unmatched).not.toBeNull()
    const expected = matches ? 'flex' : 'none'
    const expectedUnmatched = matches ? 'none' : 'flex'
    let actual
    let actualUnmatched
    for (let i = 0; i < 40; i++) {
      actual = await element.style('display')
      actualUnmatched = await unmatched.style('display')
      if (actual === expected && actualUnmatched === expectedUnmatched) return
      await page.waitFor(100)
    }
    expect(actual).toBe(expected)
    expect(actualUnmatched).toBe(expectedUnmatched)
  }

  async function expectPageRules() {
    const { width, height } = await getViewport()
    const expected = {
      portrait: height >= width,
      landscape: width > height,
      'orientation-boolean': true,
      'not-portrait': width > height,
      'landscape-width': width > height && width >= 600,
      'aspect-ratio': Math.abs(width - height) <= RATIO_PRECISION,
      'min-aspect-ratio': width >= height - RATIO_PRECISION,
      'max-aspect-ratio': width <= height + RATIO_PRECISION,
      'range-aspect-ratio': width > height && width * 9 <= height * 16 + RATIO_PRECISION,
      'aspect-ratio-boolean': true,
      'min-width': width >= 600,
      'max-width': width <= 600,
      'min-height': height >= 500,
      'max-height': height <= 500,
      boolean: width > 0 && height > 0,
      'range-width': width >= 600 && width < 1000,
      'range-height': height >= 500 && height <= 800,
      and: width >= 600 && height >= 500,
      or: width >= 600 || height >= 500,
      nested: width >= 600 && (height >= 500 || height <= 400),
      not: width < 600,
    }
    for (const [id, matches] of Object.entries(expected)) {
      await expectMatch(id, matches)
    }
    return { width, height }
  }

  async function expectComponentRules() {
    const { width, height } = await getViewport()
    await expectMatch('component-width', width >= 600)
    await expectMatch('component-height', height >= 500)
    await expectMatch('component-portrait', height >= width)
    await expectMatch('component-aspect-ratio', width >= height - RATIO_PRECISION)
  }

  async function setComponentVisible(visible) {
    await page.callMethod('setComponentVisible', visible)
    if (visible) {
      await page.waitFor('#component-width')
    } else {
      await page.waitFor(async () => await page.$('#component-width') === null)
    }
  }

  async function rotate(orientation) {
    orientationChanged = true
    await program.device.setScreenOrientation(orientation)
    let previous = ''
    let stable = 0
    for (let i = 0; i < 80; i++) {
      const viewport = await readViewport()
      const { width, height } = viewport
      const correct = width > 0 && height > 0 &&
        (orientation === 'portrait' ? height > width : width > height)
      const current = width + ',' + height
      stable = correct && current === previous ? stable + 1 : 0
      if (stable >= 2) return viewport
      previous = current
      await page.waitFor(100)
    }
    throw new Error('页面没有完成方向切换：' + orientation + '，最后视口 ' + previous)
  }

  beforeAll(async () => {
    const systemInfo = await program.systemInfo()
    originalOrientation = systemInfo.deviceOrientation
  })

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('#min-width')
  })

  afterEach(async () => {
    if (orientationChanged) {
      await rotate(originalOrientation === 'landscape' ? 'landscapeLeft' : 'portrait')
      orientationChanged = false
    }
  })

  it('首次加载应用方向、宽高、宽高比、范围和组合条件', async () => {
    await expectPageRules()
  })

  it('动态挂载和移除组件时使用当前媒体环境', async () => {
    await setComponentVisible(true)
    await expectComponentRules()
    await setComponentVisible(false)
    await setComponentVisible(true)
    await expectComponentRules()
  })

  it('旋转后页面和组件按实际视口更新方向、宽高、宽高比及组合条件', async () => {
    await setComponentVisible(true)
    for (const orientation of ['portrait', 'landscapeLeft', 'portrait']) {
      await rotate(orientation)
      await expectPageRules()
      await expectComponentRules()
    }
  })

  it('页面没有媒体查询时，动态组件仍能匹配和更新', async () => {
    page = await program.reLaunch(COMPONENT_ONLY_PATH)
    await page.waitFor('button')
    expect(await page.$('#component-width')).toBeNull()
    await setComponentVisible(true)
    await expectComponentRules()
    await rotate('portrait')
    await expectComponentRules()
    await rotate('landscapeLeft')
    await expectComponentRules()
    await setComponentVisible(false)
    await rotate('portrait')
    await setComponentVisible(true)
    await expectComponentRules()
  })
})
