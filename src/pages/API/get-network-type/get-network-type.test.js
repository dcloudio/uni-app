const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('ExtApi-GetNetworkType', () => {
  if ( isMP) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  const PAGE_PATH = '/pages/API/get-network-type/get-network-type'
  let page;
  let res;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
    await page.callMethod('jest_getNetworkType');
    await page.waitFor(200);
    res = await page.data('data.jest_result');
  });

  it('Check ', async () => {
    expect(res).toBe(true);
  });
});
