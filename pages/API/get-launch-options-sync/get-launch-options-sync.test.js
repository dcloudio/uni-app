const isDom2 = process.env.UNI_APP_X_DOM2 === "true"
const HOME_PATH = isDom2 ? '/pages/tabBar/tab-bar' : '/pages/tabBar/component'
const PAGE_PATH = '/pages/API/get-launch-options-sync/get-launch-options-sync'

describe('getLaunchOptionsSync', () => {
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
