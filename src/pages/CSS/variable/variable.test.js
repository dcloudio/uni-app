const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')

const isApp = isAndroid || isIOS || isHarmony

describe('css-variable', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (isAppWebView) {
    it('app 与 web 存在差异, webview 不进行截图', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (isApp) {
    it('css test', async () => {
      const page = await program.reLaunch('/pages/CSS/variable/variable');
      await page.waitFor('view');
      const element = await page.$('.status-bar-height')
      const size1 = await element.size()
      expect(size1.height > 0).toBe(true)
    })
  }

  it('screenshot', async () => {
    const page = await program.reLaunch('/pages/CSS/variable/variable');
    await page.waitFor('view');

    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  });
});
