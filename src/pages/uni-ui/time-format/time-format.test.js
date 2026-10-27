const PAGE_PATH = '/pages/uni-ui/time-format/time-format'

describe('time-format', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('scroll-view')
  })

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    })
  }

  it('time-format value', async () => {
    expect((await page.data('data.relativeDateTimeText')).length).toBe(19)

    await setPageData({
      relativeDateTimeText: '2024-01-02 03:04:05'
    })
    expect(await page.data('data.relativeDateTimeText')).toBe('2024-01-02 03:04:05')

    await setPageData({
      relativeDateTimeText: 'invalid'
    })
    expect(await page.data('data.relativeDateTimeText')).toBe('invalid')
  })

  it('time-format snapshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
