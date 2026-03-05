const PAGE_PATH = '/pages/component/rich-text/rich-text-list'

describe('rich-text-list', () => {

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(1500);
  })

  // 覆盖iOS平台bug，list 中使用 rich-text 时会引起崩溃
  it('richt-text-in-list', async () => {
    expect(1).toBe(1)
  })
})
