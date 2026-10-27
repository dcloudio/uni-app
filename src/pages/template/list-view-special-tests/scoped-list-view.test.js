const PAGE_PATH = '/pages/template/list-view-special-tests/scoped-list-view'

describe('scoped-list-view', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('#scoped-list-view')
    await page.waitFor(300)
  })

  it('renders items provided by the scoped slot', async () => {
    const count = await page.$('#item-count')
    expect(await count.text()).toBe('共 3 条')

    const titles = await page.$$('.item-title')
    expect(titles.length).toBe(3)
    expect(await titles[0].text()).toBe('列表项 1')
    expect(await titles[2].text()).toBe('列表项 3')
  })

  it('appends and renders ten more items', async () => {
    const addButton = await page.$('#add-button')
    await addButton.tap()
    await page.waitFor(300)

    const count = await page.$('#item-count')
    expect(await count.text()).toBe('共 13 条')

    const titles = await page.$$('.item-title')
    expect(titles.length).toBeGreaterThan(3)
  })
})
