const PAGE_PATH = '/pages/uni-ui/link/link'

describe('link', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    })
  }

  it('link state', async () => {
    expect(await page.data('data.lastEvent')).toBe('暂无事件')

    await setPageData({
      lastEvent: 'error: empty href'
    })
    expect(await page.data('data.lastEvent')).toBe('error: empty href')
  })

  it('link snapshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
