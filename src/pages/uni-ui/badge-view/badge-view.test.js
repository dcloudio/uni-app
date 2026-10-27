const PAGE_PATH = '/pages/uni-ui/badge-view/badge-view'

describe('badge', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1000)
  })

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    })
  }

  it('badge dynamic text value', async () => {
    expect(await page.data('data.dynamicBadgeText')).toBe('0')

    await setPageData({
      dynamicBadgeText: '8'
    })
    expect(await page.data('data.dynamicBadgeText')).toBe('8')

    await setPageData({
      dynamicBadgeText: ''
    })
    expect(await page.data('data.dynamicBadgeText')).toBe('')
  })

  it('badge snapshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
