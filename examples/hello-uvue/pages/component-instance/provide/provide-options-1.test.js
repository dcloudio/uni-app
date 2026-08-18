jest.setTimeout(20000)

const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
const PAGE_PATH = '/pages/component-instance/provide/provide-options-1'

describe('选项式 API 字面量方式创建 provide', () => {
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
  it('alias', async () => {
    const aliasProvidePageTitleEl = await componentForInject.$('.alias-provide-page-title')
    const aliasProvidePageTitleText = await aliasProvidePageTitleEl.text()
    expect(aliasProvidePageTitleText).toBe(
      'aliasProvidePageTitle: default alias provide page title'
    )
  })
  it('string', async () => {
    const providePageStrEl = await componentForInject.$('.provide-page-str')
    const providePageStrText = await providePageStrEl.text()
    expect(providePageStrText).toBe(
      'providePageStr: 字面量方式定义 provide page str'
    )
  })
  it('number', async () => {
    const providePageNumEl = await componentForInject.$('.provide-page-num')
    const providePageNumText = await providePageNumEl.text()
    expect(providePageNumText).toBe('providePageNum: 1')
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
      'providePageObject.title: 字面量方式定义 provide page object title'
    )
    const providePageObjectContentEl = await componentForInject.$(
      '.provide-page-object-content'
    )
    const providePageObjectContentText =
      await providePageObjectContentEl.text()
    expect(providePageObjectContentText).toBe(
      'providePageObject.content: 字面量方式定义 provide page object content'
    )
  })
  it('array', async () => {
    const providePageArrEl = await componentForInject.$('.provide-page-arr')
    const providePageArrText = await providePageArrEl.text()
    expect(providePageArrText).toBe('providePageArr: ["字面量方式定义 provide page arr"]')
  })
  it('map', async () => {
    const providePageMapEl = await componentForInject.$('.provide-page-map')
    const providePageMapText = await providePageMapEl.text()
    expect(providePageMapText).toBe('providePageMap: {"key":"字面量方式定义 provide page map"}')
  })
  it('set', async () => {
    const providePageSetEl = await componentForInject.$('.provide-page-set')
    const providePageSetText = await providePageSetEl.text()
    expect(providePageSetText).toBe('providePageSet: ["字面量方式定义 provide page set"]')
  })
  it('string default value', async () => {
    const testInjectStringDefaultValueEl = await componentForInject.$(
      '.test-inject-string-default-value'
    )
    const testInjectStringDefaultValueText =
      await testInjectStringDefaultValueEl.text()
    expect(testInjectStringDefaultValueText).toBe(
      'testInjectStringDefaultValue: test inject string default value'
    )
  })
  it('object default value', async () => {
    const testInjectObjectDefaultValueTitleEl = await componentForInject.$(
      '.test-inject-object-default-value-title'
    )
    const testInjectObjectDefaultValueTitleText =
      await testInjectObjectDefaultValueTitleEl.text()
    expect(testInjectObjectDefaultValueTitleText).toBe(
      'testInjectObjectDefaultValue.title: test inject object default value title'
    )

    const testInjectObjectDefaultValueContentEl = await componentForInject.$(
      '.test-inject-object-default-value-content'
    )
    const testInjectObjectDefaultValueContentText =
      await testInjectObjectDefaultValueContentEl.text()
    expect(testInjectObjectDefaultValueContentText).toBe(
      'testInjectObjectDefaultValue.content: test inject object default value content'
    )
  })
})
