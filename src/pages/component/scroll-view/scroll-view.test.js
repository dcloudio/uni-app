jest.setTimeout(30000);
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')

describe('component-native-scroll-view', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/scroll-view/scroll-view');
    await page.waitFor("view");
  });

  it('Event scroll-vertical',async()=>{
    // 纵向滚动
    await page.setData({data:{scrollTop: 100}})
    await page.waitFor(1000)
    // 设置top 是否触发scroll 事件
    const topScrollDetail = await page.data('data.scrollDetailTest')
    expect(topScrollDetail.scrollLeft).toBe(0)
    // Android 差异scrollTop：99.809525
    expect(topScrollDetail.scrollTop).toBeGreaterThan(99.5)
    //expect([100, 99.809525]).toContain(topScrollDetail.scrollTop);
    expect(topScrollDetail.scrollHeight).toBeGreaterThan(0)
    expect(topScrollDetail.scrollWidth).toBeGreaterThan(0)
    expect(topScrollDetail.deltaX).toBe(0)
    expect(topScrollDetail.deltaY).not.toBe(0)
    expect(await page.data('data.isScrollTest')).toBe('scroll:Success')
  })

  it('Event scroll-horizontal',async()=>{
    // 横向滚动
    await page.setData({data:{scrollLeft:220}})
    await page.waitFor(1000)
    //设置left 是否触发scroll 事件
    const leftScrollDetail = await page.data('data.scrollDetailTest')
    // Android 差异scrollLeft：219.80952
    expect(leftScrollDetail.scrollLeft).toBeGreaterThan(219.5)
    //expect([220, 219.80952]).toContain(leftScrollDetail.scrollLeft);
    expect(leftScrollDetail.scrollTop).toBe(0)
    expect(leftScrollDetail.scrollHeight).toBeGreaterThan(0)
    expect(leftScrollDetail.scrollWidth).toBeGreaterThan(0)
    // 在安卓差异 -99.809525
    expect(leftScrollDetail.deltaX).toBeLessThan(-99.5)
    //expect([-100, -99.809525]).toContain(leftScrollDetail.deltaX);
    expect(leftScrollDetail.deltaY).toBe(0)
    expect(await page.data('data.isScrollTest')).toBe('scroll:Success')
  })

  // 移后：此测试用例在某些mac-chrome会影响scroll-horizontal的deltaX结果
  it('scroll-view-screenshot', async () => {
    //禁止滚动条
    await page.setData({
        data:{showScrollbar: false}
    })
    await page.waitFor(1000);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  });

  it('Event scrolltolower-滚动到底部/右边',async()=>{
    // 滚动到底部scrollTop:300,是否触发scrolltolower事件
    await page.setData({data:{scrollTop: 300}})
    await page.waitFor(600)
    expect(await page.data('data.isScrolltolowerTest')).toBe('scrolltolower:Success-bottom')
  })

  it('Event scrolltoupper-滚动到顶部/左边',async()=>{
    // 滚动到顶部scrollTop: 0,是否触发scrolltoupper事件
    await page.setData({data:{scrollTop: 0}})
    // await page.callMethod('goTop')
    await page.waitFor(600)
    expect(await page.data('data.isScrolltoupperTest')).toBe('scrolltoupper:Success-top')
  })

  if(!isWeb && !isMP){
    it('Event scrollend-滚动结束时触发仅App端支持',async()=>{
      if(isHarmony) {
        // 鸿蒙scrollEnd触发比较慢
        await page.waitFor(500)
      }
      const endDetail = await page.data('data.scrollEndDetailTest')
      expect(endDetail.scrollLeft).toBe(0)
      expect(endDetail.scrollTop).toBe(0)
      expect(endDetail.deltaY).toBe(0)
      expect(endDetail.deltaX).toBe(0)
      expect(endDetail.scrollHeight).toBeGreaterThan(0)
      expect(endDetail.scrollWidth).toBeGreaterThan(0)
    })
  }

  if(!isMP) {
    it('通过UniElement.scrollBy检测scroll事件是否触发',async()=>{
      await page.callMethod('setVerticalScrollBy', 120)
      await page.waitFor(600)
      const scrollDetail = await page.data('data.scrollDetailTest')
      expect(scrollDetail.scrollTop).toBeGreaterThan(119)
    })
  }
});
