const PAGE_PATH = '/pages/API/get-battery-info/get-battery-info'

describe('ExtApi-GetBatteryInfo', () => {
  if (process.env.uniTestPlatformInfo.indexOf('web') > -1) {
    it('dummyTest', () => {
      expect(1).toBe(1)
    })
    return
  }
  if(process.env.uniTestPlatformInfo.toLowerCase().startsWith('ios')) {
    it('dummyTest', () => {
      expect(1).toBe(1)
    })
    return
  }

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
