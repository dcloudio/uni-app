const PAGE_PATH = '/pages/API/get-app-base-info/get-app-base-info'

describe('ExtApi-GetAppBaseInfo', () => {

  let page;
  let res;
  const stringProperties = [
    'appId', 'appName', 'appVersion', 'appVersionCode', 'appLanguage',
    'language', 'uniCompilerVersion', 'uniPlatform', 'uniRuntimeVersion',
  ]
  const numberProperties = [
    'uniCompilerVersionCode', 'uniRuntimeVersionCode'
  ]
  const booleanProperties = [
    'isUniAppX'
  ]
  const requiredProperties = [
    'uniCompilerVersion',
    'uniCompilerVersionCode',
    'uniRuntimeVersion',
    'uniRuntimeVersionCode',
    'isUniAppX'
  ]
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    res = await uni.getAppBaseInfo();
  });
  it('Check properties', async () => {
    for (const key in res) {
      const value = res[key];
      if (stringProperties.indexOf(key) != -1) {
        expect(value).not.toBeNull();
        expect(value).not.toBe("");
      }
      if (numberProperties.indexOf(key) != -1) {
        expect(value).not.toBeNull();
        expect(value).toBeGreaterThanOrEqual(3.90);
      }
      if (booleanProperties.indexOf(key) != -1) {
        expect(value).not.toBeNull();
        expect(typeof value).toBe('boolean');
      }
      if (key == "appTheme") {
        expect(['light', 'dark', 'auto']).toContain(value);
      }
    }
  });
  it('Check GetSystemInfoSync required properties', async () => {
    for (let i = 0; i < requiredProperties.length; i++) {
      const key = requiredProperties[i]
      expect(`${key} not null: ${res[key] != null}`).toBe(`${key} not null: true`)
    }
  })
});
