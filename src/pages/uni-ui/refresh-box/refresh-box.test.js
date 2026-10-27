const PAGE_PATH = '/pages/uni-ui/refresh-box/refresh-box'

describe('refresh-box', () => {
  let page
  const pullingSnapshotState = {
    listCount1: 5,
    pullingDistance1: 24,
    listCount2: 5,
    pullingDistance2: 60,
    listCount3: 5,
    refreshing3: true,
    pullingDistance3: 60,
    listCount4: 5,
    refreshing4: true,
    pullingDistance4: 36
  }

  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    })
  }

  async function savePageSnapshot() {
    await page.waitFor(200)

    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  }

  it('refresh-box state', async () => {
    expect(await page.data('data.listCount1')).toBe(3)
    expect(await page.data('data.refreshing1')).toBe(false)
    expect(await page.data('data.pullingDistance1')).toBe(0)
    expect(await page.data('data.listCount2')).toBe(3)
    expect(await page.data('data.refreshing2')).toBe(false)
    expect(await page.data('data.pullingDistance2')).toBe(0)
    expect(await page.data('data.listCount3')).toBe(3)
    expect(await page.data('data.refreshing3')).toBe(false)
    expect(await page.data('data.pullingDistance3')).toBe(0)
    expect(await page.data('data.listCount4')).toBe(3)
    expect(await page.data('data.refreshing4')).toBe(false)
    expect(await page.data('data.pullingDistance4')).toBe(0)

    await setPageData({
      listCount1: 8,
      refreshing1: true,
      pullingDistance1: 45,
      listCount2: 4,
      pullingDistance2: 50,
      listCount3: 7,
      refreshing3: true,
      pullingDistance3: 60,
      listCount4: 6,
      refreshing4: true,
      pullingDistance4: 30
    })

    expect(await page.data('data.listCount1')).toBe(8)
    expect(await page.data('data.refreshing1')).toBe(true)
    expect(await page.data('data.listCount2')).toBe(4)
    expect(await page.data('data.refreshing2')).toBe(false)
    expect(await page.data('data.listCount3')).toBe(7)
    expect(await page.data('data.refreshing3')).toBe(true)
    expect(await page.data('data.listCount4')).toBe(6)
    expect(await page.data('data.refreshing4')).toBe(true)
  })

  it('refresh-box default snapshot', async () => {
    await savePageSnapshot()
  })

  it('refresh-box pulling snapshot', async () => {
    await setPageData(pullingSnapshotState)
    await savePageSnapshot()
  })
})
