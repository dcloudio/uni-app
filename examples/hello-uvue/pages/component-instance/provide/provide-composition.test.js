const PAGE_PATH = '/pages/component-instance/provide/provide-composition'

describe('组合式 API provide', () => {
  let page = null
  let componentForInject = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    componentForInject = await page.$('.component-for-inject')
  })
  it('baisc', async () => {
    const msg = await componentForInject.$('.msg')
    expect(await msg.text()).toBe('msg: hello')

    const num = await componentForInject.$('.num')
    expect(await num.text()).toBe('num: 0')

    const obj = await componentForInject.$('.obj')
    expect(await obj.text()).toBe('obj: {"a":1}')

    const arr = await componentForInject.$('.arr')

    expect(await arr.text()).toBe('arr: [1,2,3]')

    const arr0 = await componentForInject.$('.arr-0')

    expect(await arr0.text()).toBe('arr[0]: 1')

    const fn = await componentForInject.$('.fn')
    expect(await fn.text()).toBe('fn: hello')

    const hasInjectionContext = await componentForInject.$('.has-injection-context')
    expect(await hasInjectionContext.text()).toBe('hasInjectionContext: true')

    const checkHasInjectionContextBtn = await componentForInject.$('.check-has-injection-context-btn')
    await checkHasInjectionContextBtn.tap()
    await page.waitFor(500)

    expect(await hasInjectionContext.text()).toBe('hasInjectionContext: false')
  })
})
