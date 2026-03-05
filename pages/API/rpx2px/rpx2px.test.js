const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

const PAGE_PATH = '/pages/API/rpx2px/rpx2px'

describe('API-rpx2px', () => {
  if(isMP) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  it('rpx2px', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');

    const btnConvert = await page.$('#convert')
    await btnConvert.tap()
    await page.waitFor(100)

    const data = await page.data('data')
    expect(data.result).toBe(true)
  });
});
