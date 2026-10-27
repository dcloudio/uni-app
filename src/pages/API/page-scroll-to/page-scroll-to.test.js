const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('page-scroll-to', () => {
  if ( isMP) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  const PAGE_PATH = '/pages/API/page-scroll-to/page-scroll-to'
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })
  it('scroll-to', async () => {
    const btnScrollTo = await page.$('.btn-scrollTo')

    await btnScrollTo.tap()
    // 等待滚动完成
    await page.waitFor(1000)

    const scrollTop = await page.scrollTop()
    // 设备精度问题，允许上下浮动 1px
    expect(scrollTop > 99 && scrollTop < 101).toBe(true)
  })
  it('scroll-to-element', async () => {
    const btnScrollTo = await page.$('.btn-scrollToElement')
    const scrollToElement = await page.$('.custom-element')

    await btnScrollTo.tap()
    await page.waitFor(1000)

    const offset = await scrollToElement.offset()
    // android 6 分辨率为 720*1280，需要调整期望数值
    if (!process.env.uniTestPlatformInfo.startsWith('android 6')) {
      expect(offset.top >= 1180).toBe(true)
    }
  })
})
