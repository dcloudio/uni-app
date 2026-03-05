const PAGE_PATH = '/pages/CSS/text/line-height'

describe('text-dynamic-lineHeight', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isHarmony = platformInfo.startsWith('harmony')

  if (!isHarmony) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  // 添加辅助函数来简化数据设置
  async function setPageData(newData) {
    return await page.setData({ autoTestData: newData });
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
    await setPageData({
      begin: true
    })
  })

  it('text-dynamic-lineHeight', async () => {
    let h1 = await page.callMethod('getLineHeight')
    await page.callMethod('plusLineHeight')
    await page.callMethod('plusLineHeight')
    let h2 = await page.callMethod('getLineHeight')

    expect(h2).toBeGreaterThan(h1)
    await setPageData({
      begin: false
    })
  })

  it('text-dynamic-lineHeight-snapshot', async () => {
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot();
  })
})
