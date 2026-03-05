const PAGE_PATH = '/pages/CSS/text/letter-spacing'

describe('text-dynamic-letterSpacing', () => {
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

  it('text-dynamic-letterSpacing', async () => {
    let h1 = await page.callMethod('getLetterSpacing')
    await page.callMethod('plusLetterSpacing')
    await page.callMethod('plusLetterSpacing')
    let h2 = await page.callMethod('getLetterSpacing')

    expect(h2).toBeGreaterThan(h1)
    await setPageData({
      begin: false
    })
  })

  it('text-dynamic-letterSpacing-snapshot', async () => {
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot();
  })
})
