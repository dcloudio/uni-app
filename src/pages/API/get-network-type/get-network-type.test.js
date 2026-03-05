const PAGE_PATH = '/pages/API/get-network-type/get-network-type'

describe('ExtApi-GetNetworkType', () => {

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
