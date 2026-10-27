const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIOS || isHarmony
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('waterflow-fit-height', () => {
  if (!isApp || isAppWebView || isVapor) {
  	it('not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/waterflow/waterflow-fit-height')
    await page.waitFor('view')
    await page.waitFor(1000)
  })

  it('screenshot', async () => {
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })
})
