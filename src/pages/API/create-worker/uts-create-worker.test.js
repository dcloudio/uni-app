const PAGE_PATH = '/pages/API/create-worker/uts-create-worker'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()

const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')

describe('Api-uts-createWorker', () => {
  if (
    platformInfo.indexOf('14.5') != -1 ||
    platformInfo.indexOf('13.7') != -1 ||
    platformInfo.indexOf('12.4') != -1
  ) {
    it('iOS 14.5 13.7 12.4 不支持依赖uts插件测试', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
  });

  it('workerTask ', async () => {
    await page.callMethod('test_resetInputValue');
    await page.waitFor(500);
    await page.callMethod('create');
    await page.waitFor(500);
    await page.callMethod('sendMessage');
    await page.waitFor(500);
    await page.waitFor(async () => {
      const taskResult = await page.callMethod('test_taskResult')
      return taskResult.length > 0
    });
    expect(await page.callMethod('test_taskResult')).toBe('2');
  });
});
