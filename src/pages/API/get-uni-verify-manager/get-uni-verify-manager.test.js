const PAGE_PATH = '/pages/API/get-uni-verify-manager/get-uni-verify-manager'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')

describe('uni-verify', () => {
  if (!isHarmony) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  async function waitForData(path, matcher) {
    await page.waitFor(async () => {
      const value = await page.data(path)
      return matcher(value)
    })
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(1000)
    await page.setData({
      data: { autoTest: true}
    })
  });

  it('customLogin', async () => {
    await waitForData('data.autoTestPreLoginSuccess', value => value === true)
    await waitForData('data.loginSuccess', value => value === true)
  })
});
