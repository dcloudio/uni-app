const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('issue-17030', () => {
  if (isMP) {
    it('skip mp', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/list-view/issue-17030')
    await page.waitFor(600)
  })

  it('issue-17030', async () => {
    await page.callMethod('addData')
    await page.waitFor(600)
    const scrollHeight = await page.callMethod('getScrollHeight')
    expect(scrollHeight).toBeGreaterThanOrEqual(180)
  })

})
