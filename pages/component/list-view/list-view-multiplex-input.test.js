const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('list-view-multiplex-input', () => {
  if (isMP || isAppWebView) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/component/list-view/list-view-multiplex-input')
    await page.waitFor('list-view')
    await page.waitFor(300)

    await page.setData({ data: { isTesting: true } })
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot()
  })
})
