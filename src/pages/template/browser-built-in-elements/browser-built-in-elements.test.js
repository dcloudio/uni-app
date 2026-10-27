const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web') || platformInfo.startsWith('h5')

const PAGE_PATH = '/pages/template/browser-built-in-elements/browser-built-in-elements'

jest.setTimeout(60000)

describe('template-browser-built-in-elements', () => {
  if (!isWeb) {
    it('only supports web runtime', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor('text')
    await page.waitFor(1000)
  })

  it('renders page titles and browser link', async () => {
    const titles = await page.$$('.title')
    expect(titles.length).toBe(2)
    expect(await titles[0].text()).toBe('使用浏览器内置的 a 标签')
    expect(await titles[1].text()).toContain('button 标签')

    const nativeState = await page.callMethod('jest_getNativeState')
    expect(nativeState.linkText).toContain('uni-app x')
    expect(nativeState.linkHref).toContain('doc.dcloud.net.cn/uni-app-x/')
    expect(nativeState.linkTarget).toBe('uni-app-x')
  })

  it('creates the browser native button in placeholder area', async () => {
    const container = await page.$('.html-element-area')
    const nativeState = await page.callMethod('jest_getNativeState')

    expect(nativeState.buttonCount).toBe(1)
    expect(nativeState.buttonText).toBe('browser button')

    const containerSize = await container.size()
    expect(containerSize.width).toBeGreaterThan(0)
  })
})
