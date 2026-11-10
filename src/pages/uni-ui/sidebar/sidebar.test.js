const PAGE_PATH = '/pages/uni-ui/sidebar/sidebar'
const CATEGORY_NAMES = ['热销', '招牌套餐', '主食', '小吃', '汤类', '饮品', '甜点', '其他']

describe('sidebar', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('.sidebar-item__text')
    await waitForFoodCount(20)
    // 分段渲染后还需异步测量坐标，避免点击抢在测量之前。
    await page.waitFor(500)
  })

  async function waitForFoodCount(count) {
    await page.waitFor(async () => {
      const foods = await page.data('data.foods')
      return foods.length === count && !(await page.data('data.loading'))
    })
  }

  async function expectActiveCategory(index) {
    await page.waitFor(async () => {
      const active = await page.$('.sidebar-item__text--active')
      return active !== null && (await active.text()) === CATEGORY_NAMES[index]
    })
    expect((await page.$$('.sidebar-item--active')).length).toBe(1)
    expect((await page.$$('.sidebar-item__bar')).length).toBe(1)
  }

  async function tapCategory(index) {
    const items = await page.$$('.sidebar-item')
    expect(items.length).toBe(CATEGORY_NAMES.length)
    await items[index].tap()
    await page.waitFor(async () => (await page.data('data.scrollTarget')) === `food-list-item-${index}`)
    await page.waitFor(300)
  }

  async function expectHeaderAtTop(index) {
    const list = await page.$('#food-list')
    const header = await page.$(`#food-list-header-${index}`)
    expect(header).not.toBeNull()
    const listOffset = await list.offset()
    const headerOffset = await header.offset()
    expect(Math.abs(headerOffset.top - listOffset.top)).toBeLessThanOrEqual(2)
  }

  it('renders all categories with the first category active and only the first page loaded', async () => {
    const labels = await page.$$('.sidebar-item__text')
    expect(await Promise.all(labels.map(label => label.text()))).toEqual(CATEGORY_NAMES)
    await expectActiveCategory(0)
    const foods = await page.data('data.foods')
    expect(foods.length).toBe(20)
    expect(foods[0].id).toBe(101)
    expect(foods[19].id).toBe(604)
    expect(await page.$('.cart-bar')).toBeNull()
  })

  it('clicking a loaded category scrolls its header to the top and updates the active slot', async () => {
    await tapCategory(1)
    await expectActiveCategory(1)
    await expectHeaderAtTop(1)
    expect((await page.data('data.foods')).length).toBe(20)
  })

  it('scrolling the right list updates the sidebar without clicking a category', async () => {
    await page.callMethod('scrollToSection', 2)
    await expectActiveCategory(2)
    await expectHeaderAtTop(2)

    await page.callMethod('scrollToSection', 0)
    await expectActiveCategory(0)
    await expectHeaderAtTop(0)
  })

  it('clicking the same category again returns to its header after independent scrolling', async () => {
    await tapCategory(1)
    await expectActiveCategory(1)
    // 保留上一次点击的 scrollTarget，通过实际滚动离开该分类。
    await page.setData({ data: { ...(await page.data('data')), scrollTop: 1 } })
    await page.waitFor(100)
    await page.setData({ data: { ...(await page.data('data')), scrollTop: 0 } })
    await expectActiveCategory(0)
    expect(await page.data('data.scrollTarget')).toBe('food-list-item-1')

    await tapCategory(1)
    await expectActiveCategory(1)
    await expectHeaderAtTop(1)
  })

  it('clicking an unloaded category loads its foods before setting the scroll target', async () => {
    await tapCategory(6)
    await page.waitFor(async () => (await page.data('data.foods')).some(food => food.id === 704))
    expect(await page.$('#food-list-header-6')).not.toBeNull()
    const ids = (await page.data('data.foods')).map(food => food.id)
    expect(ids).toContain(605)
    expect(ids).toEqual(Array.from(new Set(ids)))
    // 尾部分段可能因剩余内容不足一屏无法吸顶，不要求高亮等于最后点击项。
    expect(await page.data('data.scrollTarget')).toBe('food-list-item-6')
  })

  it('repeated load-more requests append the remaining foods once and stop at the end', async () => {
    await page.callMethod('onScrollToLower')
    await page.callMethod('onScrollToLower')
    await waitForFoodCount(27)
    const ids = (await page.data('data.foods')).map(food => food.id)
    expect(new Set(ids).size).toBe(27)
    expect(ids.slice(20)).toEqual([605, 701, 702, 703, 704, 801, 802])

    await page.callMethod('onScrollToLower')
    await page.waitFor(400)
    expect((await page.data('data.foods')).map(food => food.id)).toEqual(ids)
    const footer = await page.$('.list-footer__text')
    expect(await footer.text()).toBe('没有更多了')
  })

  it('keeps category navigation aligned when the cart changes the list height', async () => {
    const list = await page.$('#food-list')
    const originalSize = await list.size()
    const toggle = await page.$('.action-btn')
    await toggle.tap()
    await page.waitFor('.cart-bar')
    expect((await list.size()).height).toBeLessThan(originalSize.height)
    await tapCategory(1)
    await expectActiveCategory(1)
    await expectHeaderAtTop(1)

    await toggle.tap()
    await page.waitFor(async () => (await page.$('.cart-bar')) === null)
    expect((await list.size()).height).toBeCloseTo(originalSize.height, 0)
    await tapCategory(0)
    await expectActiveCategory(0)
    await expectHeaderAtTop(0)
  })
})
