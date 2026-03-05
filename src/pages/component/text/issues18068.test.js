const PAGE_PATH = '/pages/component/text/issues18068'

describe('text-nested-test', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')
  const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

  if (isWeb || isMP || isAppWebView || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
  })

  it('text-nested-lineheight-case', async () => {

    await page.waitFor(1000);

    let h1 = await page.data('data.text1Height')
    let h2 = await page.data('data.text2Height')

    expect(h1).toBe(40)
    expect(h2).toBe(80)
  })
})
