const PAGE_PATH = '/pages/API/get-device-info/get-device-info'

describe('ExtApi-GetDeviceInfo', () => {

  let page;
  let res;
  const stringProperties = [
    'brand', 'deviceBrand', 'deviceId', 'model', 'deviceModel',
    'deviceType', 'devicePixelRatio', 'system', 'platform', 'uniRuntimeVersion',
    'osName', 'osVersion', 'osLanguage', 'osTheme', 'romName', 'romVersion'
  ]
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    res = await uni.getDeviceInfo();
  });
  it('Check properties', async () => {
    for (const key in res) {
      const value = res[key];
      if (stringProperties.indexOf(key) != -1) {
        expect(value).not.toBeNull();
        expect(value).not.toBe("");
      }
      if (key == 'deviceOrientation') {
        expect(value).not.toBeNull();
        expect(['portrait', 'landscape']).toContain(value);
      }
    }
  });
});
