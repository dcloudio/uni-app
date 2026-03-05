const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('component-swiper-list-view', () => {
  if (isMP) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  beforeAll(async () => {
    //打开swiper-list-view测试页
    page = await program.reLaunch('/pages/component/swiper/swiper-list-view')
    await page.waitFor('list-view')
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it('check-sticky-header', async () => {
    await setPageData({scrollTop: 300})
    await page.waitFor(600)
    await setPageData({currentVal: 1})
    await page.waitFor(async () => {
      return await page.data('data.swiperCurrentIndex') === 1;
    });
    await page.waitFor(200)
    await setPageData({currentVal: 0})
    await page.waitFor(async () => {
      return await page.data('data.swiperCurrentIndex') === 0;
    });
    await page.waitFor(600)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })

})
