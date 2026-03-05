const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

const PAGE_PATH = '/pages/API/animation-frame/animation-frame'

describe('API-cancelAnimationFrame', () => {
 if (isMP) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });

  it('cancelAnimationFrame', async () => {
    await page.callMethod('startRequestAnimationFrame')
    await page.waitFor(100)
    const data1 = await page.data('data')
    expect(data1.testFrameCount > 0).toBe(true)

    await page.callMethod('stopRequestAnimationFrame')
    await page.waitFor(100)
    const data2 = await page.data('data')
    const testFrameCount = data2.testFrameCount

    await page.waitFor(100)
    const data3 = await page.data('data')
    expect(data3.testFrameCount).toBe(testFrameCount)
  });
});
