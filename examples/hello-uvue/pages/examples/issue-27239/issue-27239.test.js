const PAGE_PATH = '/pages/examples/issue-27239/issue-27239'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe(PAGE_PATH, () => {
  if (isMP) {
    it('skip', async () => {
      // 原生微信小程序bug，无法测试
      expect(1).toBe(1)
    })
    return
  }
  it('element order', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    let t0 = await page.$('#t-0')
    let t1 = await page.$('#t-1')
    const t0TextBefore = await t0.text()
    const t1TextBefore = await t1.text()
    expect(t0TextBefore).toBe('1')
    expect(t1TextBefore).toBe('2')
    await page.callMethod('toggle')
    // 必须重新获取一次元素
    t0 = await page.$('#t-0')
    t1 = await page.$('#t-1')
    const t0TextAfter = await t0.text()
    const t1TextAfter = await t1.text()
    expect(t0TextAfter).toBe('2')
    expect(t1TextAfter).toBe('1')
	})
})