const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony

describe('/pages/CSS/selector/selector.uvue', () => {
  if (!isApp) {
    it('skip non-app platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (!isVapor) {
    it('skip non-dom2', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let originalTheme = 'light'

  const pageBackgroundColors = {
    light: '#f0eff4',
    dark: '#1a1a1b',
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/selector/selector')
    await page.waitFor('view')
    const systemInfo = await program.systemInfo()
    originalTheme = systemInfo.appTheme ?? 'light'
  })

  const expectPageBackgroundColor = async (theme) => {
    const pageBackgroundColorContent = await page.callMethod('getPageBackgroundColorContent')
    expect(pageBackgroundColorContent.toLowerCase()).toBe(pageBackgroundColors[theme])
  }

  const setAppThemeAndReLaunch = async (theme) => {
    await program.callUniMethod('setAppTheme', { theme })
    await page.waitFor(600)
    page = await program.reLaunch('/pages/CSS/selector/selector')
    await page.waitFor('view')
  }

  const expectPagePadding = async (expectedPadding) => {
    const pageElement = await page.$('page')
    expect(pageElement).toBeTruthy()

    const paddingTop = await pageElement.style('padding-top')
    const paddingRight = await pageElement.style('padding-right')
    const paddingBottom = await pageElement.style('padding-bottom')
    const paddingLeft = await pageElement.style('padding-left')
    expect([expectedPadding]).toContain(paddingTop)
    expect([expectedPadding]).toContain(paddingRight)
    expect([expectedPadding]).toContain(paddingBottom)
    expect([expectedPadding]).toContain(paddingLeft)
  }

  it('get page node padding from css variable', async () => {
    await expectPagePadding('16px')
  })

  it('change page node padding from css variable', async () => {
    const button = await page.$('#setPagePaddingButton')
    await button.tap()
    await page.waitFor(500)
    await expectPagePadding('20px')
  })

  it('page selector background color has priority over pages.json in light theme', async () => {
    await setAppThemeAndReLaunch('light')
    await expectPageBackgroundColor('light')
  })

  it('page selector background color has priority over pages.json in dark theme', async () => {
    await setAppThemeAndReLaunch('dark')
    await expectPageBackgroundColor('dark')
  })

  it('class selector applies', async () => {
    const el = await page.$('#selector-class')
    const borderColor = await el.style('border-top-color')
    expect(borderColor).not.toBe('')
  })

  it('compound class selector overrides single class', async () => {
    const base = await page.$('#selector-base')
    const compound = await page.$('#selector-compound')
    const baseColor = await base.style('border-top-color')
    const compoundColor = await compound.style('border-top-color')
    expect(compoundColor).not.toBe(baseColor)
  })

  it('group selector applies to both classes', async () => {
    const a = await page.$('#selector-group-a')
    const b = await page.$('#selector-group-b')
    const aColor = await a.style('border-top-color')
    const bColor = await b.style('border-top-color')
    expect(bColor).toBe(aColor)
  })

  afterAll(async () => {
    await program.callUniMethod('setAppTheme', { theme: originalTheme })
  })
})
