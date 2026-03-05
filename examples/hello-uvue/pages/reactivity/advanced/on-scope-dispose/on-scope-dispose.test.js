const PAGE_PATH = '/pages/reactivity/advanced/on-scope-dispose/on-scope-dispose'

describe('onScopeDispose', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const hasCurrentScope = await page.$('#has-current-scope')
    expect(await hasCurrentScope.text()).toBe('false')

    const createScopeBtn = await page.$('#create-scope-btn')
    await createScopeBtn.tap()
    await page.waitFor(500)

    expect(await hasCurrentScope.text()).toBe('true')

    const stopScopeBtn = await page.$('#stop-scope-btn')
    await stopScopeBtn.tap()
    await page.waitFor(500)

    expect(await hasCurrentScope.text()).toBe('false')
  })
})