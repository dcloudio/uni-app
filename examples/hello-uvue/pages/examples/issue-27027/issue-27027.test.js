const PAGE_PATH = '/pages/examples/issue-27027/issue-27027'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe(PAGE_PATH, () => {
  it('display normally', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(2000)
    const s1 = await page.$('#s-1')
    const s4 = await page.$('#s-4')
    const s1Text = await s1.text()
    const s4Text = await s4.text()
    expect(s1Text).toBe('1')
    expect(s4Text).toBe('4')
    if (!isMP) {
      const d1 = await page.$('#d-1')
      const d4 = await page.$('#d-4')
      const d1Text = await d1.text()
      const d4Text = await d4.text()
      expect(d1Text).toBe('1')
      expect(d4Text).toBe('4')
    }
	})
})