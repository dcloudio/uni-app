const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/component-instance/provide/provide-options-2'
describe('选项式 API 函数方式创建 provide', () => {
  if (isDom2) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let componentForInject
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    componentForInject = await page.$('.component-for-inject')
  })
  it('variable', async () => {
    const providePageTitleEl = await componentForInject.$('.provide-page-title')
    const providePageTitleText = await providePageTitleEl.text()
    expect(providePageTitleText).toBe(
      'providePageTitle: 函数方式定义 provide page title'
    )
  })
  it('string', async () => {
    const providePageStrEl = await componentForInject.$('.provide-page-str')
    const providePageStrText = await providePageStrEl.text()
    expect(providePageStrText).toBe(
      'providePageStr: 函数方式定义 provide page str'
    )
  })
  it('number', async () => {
    const providePageNumEl = await componentForInject.$('.provide-page-num')
    const providePageNumText = await providePageNumEl.text()
    expect(providePageNumText).toBe('providePageNum: 2')
  })
  it('boolean', async () => {
    const providePageBoolEl = await componentForInject.$('.provide-page-bool')
    const providePageBoolText = await providePageBoolEl.text()
    expect(providePageBoolText).toBe('providePageBool: true')
  })
  it('object', async () => {
    const providePageObjectTitleEl = await componentForInject.$(
      '.provide-page-object-title'
    )
    const providePageObjectTitleText = await providePageObjectTitleEl.text()
    expect(providePageObjectTitleText).toBe(
      'providePageObject.title: 函数方式定义 provide page object title'
    )
    const providePageObjectContentEl = await componentForInject.$(
      '.provide-page-object-content'
    )
    const providePageObjectContentText =
      await providePageObjectContentEl.text()
    expect(providePageObjectContentText).toBe(
      'providePageObject.content: 函数方式定义 provide page object content'
    )
  })
  it('array', async () => {
    const providePageArrEl = await componentForInject.$('.provide-page-arr')
    const providePageArrText = await providePageArrEl.text()
    expect(providePageArrText).toBe('providePageArr: ["函数方式定义 provide page arr"]')
  })
  it('map', async () => {
    const providePageMapEl = await componentForInject.$('.provide-page-map')
    const providePageMapText = await providePageMapEl.text()
    expect(providePageMapText).toBe('providePageMap: {"key":"函数方式定义 provide page map"}')
  })
  it('set', async () => {
    const providePageSetEl = await componentForInject.$('.provide-page-set')
    const providePageSetText = await providePageSetEl.text()
    expect(providePageSetText).toBe('providePageSet: ["函数方式定义 provide page set"]')
  })
})
