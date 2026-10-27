const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('getEnterOptionsSync', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  it('app onShow 和 getEnterOptionsSync 结果一致', async () => {
    const PAGE_PATH = '/pages/API/get-enter-options-sync/get-enter-options-sync'
    const page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view')
    const testResult = await page.data('data.testResult')
    expect(testResult).toBe(true)
  })
})
