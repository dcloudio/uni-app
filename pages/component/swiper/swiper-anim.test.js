const PAGE_PATH = '/pages/component/swiper/swiper-anim'

describe('swiper-touch-test', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  // 仅测试Android平台
  if (!isAndroid) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(100);
  })


  it('swiper-anim-test', async () => {

    await page.waitFor(1500);
    const res = await page.callMethod('jest_getWindowInfo')
    const windowHeight = res.windowHeight * res.pixelRatio;
    const windowWidth = res.windowWidth * res.pixelRatio;

    const image = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: 60,
        height: windowHeight - 60,
        width:windowWidth
      },
    });
    expect(image).toSaveImageSnapshot();

  })

})
