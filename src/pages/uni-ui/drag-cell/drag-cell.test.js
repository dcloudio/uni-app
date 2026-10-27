const PAGE_PATH = '/pages/uni-ui/drag-cell/drag-cell'

describe('drag-cell', () => {
  let page

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  })

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    })
  }

  it('drag-cell model value', async () => {
    expect(await page.data('data.tagList')).toEqual(['标签1', '标签2', '标签3', '标签4'])
    expect((await page.data('data.gridList3')).length).toBe(9)
    expect((await page.data('data.deleteList')).length).toBe(5)
    expect(await page.data('data.handleList')).toEqual(['微信支付', '支付宝', 'Apple Pay'])

    await setPageData({
      tagList: ['新标签1', '新标签2'],
      deleteList: ['A', 'B', 'C'],
      imageList: ['https://example.com/a.png'],
      handleList: ['卡1', '卡2']
    })

    expect(await page.data('data.tagList')).toEqual(['新标签1', '新标签2'])
    expect(await page.data('data.deleteList')).toEqual(['A', 'B', 'C'])
    expect(await page.data('data.imageList')).toEqual(['https://example.com/a.png'])
    expect(await page.data('data.handleList')).toEqual(['卡1', '卡2'])
  })

  it('drag-cell snapshot', async () => {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
