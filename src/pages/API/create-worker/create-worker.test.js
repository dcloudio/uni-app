const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('Api-createWorker', () => {
  if(isIOS || (isAndroid && isVapor)) {
    it('skip Api-createWorker', async () => {
      expect(1).toBe(1)
    })
    return
  }

  const PAGE_PATH = '/pages/API/create-worker/create-worker'
  let page;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(1000);
  });

  it('workerTask ', async () => {
    await page.callMethod('test_resetInputValue');
    await page.waitFor(500);
    await page.callMethod('create');
    await page.waitFor(500);
    await page.callMethod('onWorkerMsg');
    await page.callMethod('sendMessage');
    await page.waitFor(async () => {
      const taskResult = await page.data('taskResult.value')
      return taskResult.length > 0
    });
    expect(await page.data('taskResult.value')).toBe('2');
  });
});
