const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('list-view-children-if-show', () => {
  if (isMP) {
  	it('skip mp', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/list-view/list-view-children-if-show')
    await page.waitFor('list-view')
    await page.waitFor(300)
  })

  it('basic', async () => {
    const listViews = await page.$$('list-view')
    expect(listViews.length).toBe(1)

    let toggleChildrenShowBtn = await page.$$('#toggle-children-show-btn')
    expect(toggleChildrenShowBtn.length).toBe(3)

    let listItemChildren = await page.$$('#list-item-child')
    expect(listItemChildren.length).toBe(3)

    await toggleChildrenShowBtn[0].tap()
    listItemChildren = await page.$$('#list-item-child')
    expect(listItemChildren.length).toBe(0)
    await page.waitFor(300)
    await toggleChildrenShowBtn[0].tap()
    await page.waitFor(300)
    listItemChildren = await page.$$('#list-item-child')
    expect(listItemChildren.length).toBe(3)

    const clearBtn = await page.$('#clear-btn')
    await clearBtn.tap()

    toggleChildrenShowBtn = await page.$$('#toggle-children-show-btn')
    expect(toggleChildrenShowBtn.length).toBe(0)
    listItemChildren = await page.$$('#list-item-child')
    expect(listItemChildren.length).toBe(0)

    const initBtn = await page.$('#init-btn')
    await initBtn.tap()
    await page.waitFor(300)

    toggleChildrenShowBtn = await page.$$('#toggle-children-show-btn')
    expect(toggleChildrenShowBtn.length).toBe(3)
    listItemChildren = await page.$$('#list-item-child')
    expect(listItemChildren.length).toBe(3)
  })
})
