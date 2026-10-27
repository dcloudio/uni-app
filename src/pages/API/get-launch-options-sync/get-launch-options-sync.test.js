const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('getLaunchOptionsSync', () => {
  if ( isMP) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  const PAGE_PATH = '/pages/API/get-launch-options-sync/get-launch-options-sync'

  it('getLaunchOptionsSync', async () => {
    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view')
    await page.callMethod('getLaunchOptionsSync')
    const data = await page.data('data')
    expect(data.checked).toBe(true)
  })
  it('app onLaunch 和 getLaunchOptionsSync 结果一致', async () => {
    const page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view')
    const pageData = await page.data('data')
    expect(pageData.testResult).toBe(true)
  })
})
