const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('waterflow', () => {
  if (!(isAndroid || isIOS || isHarmony) || isAppWebView) {
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

  it('issue21415', async () => {
    await page.callMethod('changeShow')
    await page.waitFor(1000)

    let verify = await page.callMethod('verify')
    expect(verify).toBe(true)
  })
})
