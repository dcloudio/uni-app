const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isApp = ['android', 'ios', 'harmony'].some(name => platformInfo.startsWith(name))
const isWeb = platformInfo.startsWith('web')
const isMpWeixin = platformInfo.startsWith('mp-weixin')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true'
const PAGE_PATH = '/pages/CSS/media-query/media-query'
const COMPONENT_ONLY_PATH = '/pages/CSS/media-query/component-only'
// Chrome 对比例交叉乘积的等值和 min/max 使用 1/64 绝对容差，严格比较不使用。
const RATIO_PRECISION = 1 / 64

jest.setTimeout(60000)

describe('css-media-query', () => {
  if ((!isApp && !isWeb && !isMpWeixin) || (isApp && (!isVapor || isAppWebView))) {
    it.skip('仅支持 App 蒸汽模式、Web 和微信小程序', () => {})
    return
  }

  let page
  let originalOrientation
  let canRotate = false
  let orientationChanged = false

  async function readViewport() {
    return await page.callMethod('getMediaViewport')
  }

  async function getViewport() {
    const viewport = await readViewport()
    expect(viewport.width).toBeGreaterThan(0)
    expect(viewport.height).toBeGreaterThan(0)
    return viewport
  }

  async function readDisplays(id, inComponent) {
    if (isMpWeixin && inComponent) {
      // 微信自动化工具无法定位当前组件的外层节点，使用原生查询读取组件内的计算样式。
      const styles = await program.evaluate((id) => {
        const pages = getCurrentPages()
        const component = pages[pages.length - 1].selectComponent('#media-query-component')
        if (component == null) return null
        return new Promise(resolve => {
          const query = uni.createSelectorQuery().in(component)
          query.select('#' + id).fields({ computedStyle: ['display'] })
          query.select('#' + id + '-unmatched').fields({ computedStyle: ['display'] })
          query.exec(resolve)
        })
      }, id)
      expect(styles).not.toBeNull()
      expect(styles[0]).not.toBeNull()
      expect(styles[1]).not.toBeNull()
      return styles.map(style => style.display)
    }
    const element = await page.$('#' + id)
    expect(element).not.toBeNull()
    const unmatched = await page.$('#' + id + '-unmatched')
    expect(unmatched).not.toBeNull()
    return [await element.style('display'), await unmatched.style('display')]
  }

  async function expectMatch(id, matches, inComponent = false) {
    const expected = matches ? ['flex', 'none'] : ['none', 'flex']
    let actual
    for (let i = 0; i < 40; i++) {
      actual = await readDisplays(id, inComponent)
      if (actual[0] === expected[0] && actual[1] === expected[1]) return
      await page.waitFor(100)
    }
    expect({ id, displays: actual }).toEqual({ id, displays: expected })
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
    await expectMatch('component-width', width >= 600, true)
    await expectMatch('component-height', height >= 500, true)
    await expectMatch('component-portrait', height >= width, true)
    await expectMatch('component-aspect-ratio', width >= height - RATIO_PRECISION, true)
  }

  async function isComponentVisible() {
    if (isMpWeixin) {
      return await program.evaluate(() => {
        const pages = getCurrentPages()
        return pages[pages.length - 1].selectComponent('#media-query-component') != null
      })
    }
    return await page.$('#component-width') !== null
  }

  async function waitForComponent(visible) {
    await page.waitFor(async () => await isComponentVisible() === visible, 5000)
  }

  async function setComponentVisible(visible) {
    await page.callMethod('setComponentVisible', visible)
    await waitForComponent(visible)
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
    // 旋转 API 仅支持 Android、iOS 模拟器，不支持真机及 HarmonyOS。
    if (platformInfo.startsWith('android') || platformInfo.startsWith('ios')) {
      const deviceInfo = await program.callUniMethod('getDeviceInfo')
      canRotate = deviceInfo.isSimulator === true
    }
    if (canRotate) {
      const systemInfo = await program.systemInfo()
      originalOrientation = systemInfo.deviceOrientation
    } else {
      console.warn('当前设备未覆盖自动旋转；仍验证首次媒体匹配、组件挂载及重新挂载。视口变化需手动验证。')
    }
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

  it('首次加载匹配方向、宽高、宽高比、范围和组合条件；支持的模拟器追加旋转验证', async () => {
    await expectPageRules()
    if (canRotate) {
      await setComponentVisible(true)
      for (const orientation of ['portrait', 'landscapeLeft', 'portrait']) {
        await rotate(orientation)
        await expectPageRules()
        await expectComponentRules()
      }
    }
  })

  it('动态挂载和移除组件时使用当前媒体环境', async () => {
    await setComponentVisible(true)
    await expectComponentRules()
    await setComponentVisible(false)
    await setComponentVisible(true)
    await expectComponentRules()
  })

  it('页面没有媒体查询时，组件首次显示及重新挂载正常匹配；支持的模拟器追加旋转验证', async () => {
    page = await program.reLaunch(COMPONENT_ONLY_PATH)
    await page.waitFor('button')
    await waitForComponent(true)
    await expectComponentRules()
    if (canRotate) {
      await rotate('portrait')
      await expectComponentRules()
      await rotate('landscapeLeft')
      await expectComponentRules()
    }
    await setComponentVisible(false)
    if (canRotate) await rotate('portrait')
    await setComponentVisible(true)
    await expectComponentRules()
  })
})
