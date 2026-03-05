const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/API/get-system-setting/get-system-setting'

describe('ExtApi-GetSystemSetting', () => {
  if (isWeb || isAppWebView) {
    it('web', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  let res;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    res = await uni.getSystemSetting()
  });
  it('Check GetSystemSetting', async () => {
    for (const key in res) {
      const value = res[key];
      if (res['bluetoothEnabled'] == undefined || res['bluetoothEnabled'] === false) {
        expect(res['bluetoothError']).not.toBe("")
      } else {
        expect(res['bluetoothError'] == undefined).toBe(true)
      }

      if (res['wifiEnabled'] == undefined) {
        expect(res['wifiError']).not.toBe("")
      } else {
        expect(res['wifiError'] == undefined).toBe(true)
      }

      if (key == 'deviceOrientation') {
        expect(['portrait', 'landscape']).toContain(value);
      }
    }
  });
});
