const PAGE_PATH = '/pages/template/list-view-special-tests/multi-list-view'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')

describe('multi-list-view', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('#column-list-1')
    await page.waitFor(300)
  })

  const listCount = async () => (await page.$$('.column-list')).length

  it('renders four list-view columns that share the row evenly', async () => {
    const columns = await page.$$('.column-list')
    expect(columns.length).toBe(4)

    let sharedWidth = 0
    let sharedHeight = 0
    for (let i = 0; i < columns.length; i++) {
      const size = await columns[i].size()
      expect(size.width).toBeGreaterThan(0)
      expect(size.height).toBeGreaterThan(0)
      if (i === 0) {
        sharedWidth = size.width
        sharedHeight = size.height
      } else {
        expect(Math.abs(size.width - sharedWidth)).toBeLessThanOrEqual(1)
        expect(Math.abs(size.height - sharedHeight)).toBeLessThanOrEqual(1)
      }
    }
  })

  it('renders column headers in each list-view', async () => {
    const columns = await page.$$('.column-list')
    for (let i = 0; i < columns.length; i++) {
      const title = await columns[i].$('.item-title')
      expect(await title.text()).toBe(`列表 ${i + 1} · 项目 1`)
    }
  })

  it('toggles list count between 4, 5, 6 and back to 4', async () => {
    const toggle = await page.$('#toggle-list-count')

    await toggle.tap()
    await page.waitFor(300)
    expect(await listCount()).toBe(5)

    await toggle.tap()
    await page.waitFor(300)
    expect(await listCount()).toBe(6)

    await toggle.tap()
    await page.waitFor(300)
    expect(await listCount()).toBe(4)

    expect(await page.data('data.listCount')).toBe(4)
  })

  if (!isWeb) {
    it('scrolls every column independently', async () => {
      const scrollTop = 400
      for (let columnId = 1; columnId <= 4; columnId++) {
        const didScroll = await page.callMethod('scrollList', {
          columnId: columnId,
          top: scrollTop
        })
        expect(didScroll).toBe(true)
        await page.waitFor(300)

        const column = await page.$(`#column-list-${columnId}`)
        const actualScrollTop = Number(await column.attribute('scrollTop'))
        expect(actualScrollTop).toBeGreaterThanOrEqual(scrollTop - 50)
      }
    })

    it('rejects scrolling a column outside the current range', async () => {
      const didScroll = await page.callMethod('scrollList', {
        columnId: 5,
        top: 100
      })
      expect(didScroll).toBe(false)
    })
  }
})
