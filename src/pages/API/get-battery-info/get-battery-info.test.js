const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isIOS = platformInfo.startsWith('ios')

describe('ExtApi-GetBatteryInfo', () => {
  if (isWeb || isIOS || isMP) {
    it('dummyTest', () => {
      expect(1).toBe(1)
    })
    return
  }

  const PAGE_PATH = '/pages/API/get-battery-info/get-battery-info'
  let page;
  let res;

  const numberProperties = [
    'level'
  ]
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    res = await page.data('data');
  });

  it('Check properties', async () => {
    for (const key in res) {
      const value = res[key];
      expect(value).not.toBeNull();
      if (numberProperties.indexOf(key) != -1) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
