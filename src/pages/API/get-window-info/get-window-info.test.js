const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')

describe('ExtApi-GetWindowInfo', () => {
  if ( isMP) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  const PAGE_PATH = '/pages/API/get-window-info/get-window-info'
  let page;
  let res;
  const numberProperties = [
    'pixelRatio', 'screenWidth', 'screenHeight', 'statusBarHeight',
    'windowWidth',
    'windowHeight', 'windowTop', 'windowBottom', 'screenTop'
  ]

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    res = await program.callUniMethod('getWindowInfo');
  });

  it('Check GetWindowInfo', async () => {
    for (const key in res) {
      const value = res[key];
      expect(value).not.toBeNull();
      if (numberProperties.indexOf(key) != -1) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    }
    if (isAndroid) {
      if (res.safeAreaInsets.bottom > 0) {
        expect(res.safeAreaInsets.top + 44 + res.windowHeight).toBe(res.screenHeight);
      } else {
        expect(res.safeAreaInsets.top + 44 + res.windowHeight).toBe(res.safeArea.bottom);
      }
    }
  });
});
