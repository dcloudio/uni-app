const PAGE_PATH = '/pages/API/create-worker/worker-sendable-transfer'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()

const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')

describe('Api-uts-createWorker', () => {
  if (!isHarmony && !isWeb) {
    it('skip worker-sendable-transfer test', async () => {
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
    await page.callMethod('create');
    await page.waitFor(500);
    await page.callMethod('sendMessage');
    await page.waitFor(500);
    const myBufLength = await page.data('data.myBufLength')
    const sendableNumber = await page.data('data.sendableNumber')
    if (isHarmony) {
      expect(myBufLength).toBe(8);
      expect(sendableNumber).toBe(666);
    }
    if (isWeb) {
      expect(myBufLength).toBe(0);
    }
  });
});
