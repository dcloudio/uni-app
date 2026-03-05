jest.setTimeout(130000)
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')

describe('list-view-multiplex-video', () => {
  if (isMP || isAppWebView || isWeb) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/component/list-view/list-view-multiplex-video')
    await page.waitFor('list-view')
    await page.waitFor(4000)

    await page.setData({ data: { isTesting: true } })
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot()
  })
})
