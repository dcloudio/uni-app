const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('component-native-scroll-view-props', () => {
  let page;
  beforeAll(async () => {
      page = await program.reLaunch('/pages/component/scroll-view/scroll-view-props');
      await page.waitFor(300);
  });

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  if(!isMP) {
    //检测竖向可滚动区域
    it('check_scroll_height', async () => {
      await setPageData({ scrollX: false })
      await page.waitFor(300);
      const value = await page.callMethod('checkScrollHeight')
      expect(value).toBe(true)
    })
  }

  //检测竖向scrolltop属性赋值
  it('check_scroll_top', async () => {
      await setPageData({ scrollTop: 600 })
      await page.waitFor(600)
      //检测滚动top 是否触发scroll 事件
      const scrollChangeTop = await page.data('data.scrollChangeTop')
      console.log("scrollChangeTop="+scrollChangeTop)
      expect(scrollChangeTop-600).toBeGreaterThanOrEqual(0)
      const element = await page.$('#scrollViewY')
      const scrollTop = await element.property("scrollTop")
      console.log("check_scroll_top---"+scrollTop)
      expect(scrollTop-600).toBeGreaterThanOrEqual(0)
  })

  //检测竖向scroll_into_view属性赋值
  it('check_scroll_into_view_top', async () => {
      await setPageData({ scrollIntoView: "item3" })
      await page.waitFor(600)
      const element = await page.$('#scrollViewY')
      const scrollTop = await element.property("scrollTop")
      console.log("check_scroll_into_view_top--"+scrollTop)
      await setPageData({ scrollIntoView: "" })
      expect(scrollTop-570).toBeGreaterThanOrEqual(0)
  })

  if(!isMP) {
    //检测横向可滚动区域
    it('check_scroll_width', async () => {
      await setPageData({ scrollX: true })
      await page.waitFor(300);
      const value = await page.callMethod('checkScrollWidth')
      expect(value).toBe(true)
    })
  }

  //检测横向scrollLeft属性赋值
  it('check_scroll_left', async () => {
    await setPageData({ scrollX: true })
    await setPageData({ scrollLeft: 600 })
    await page.waitFor(600)
    const element = await page.$('#scrollViewX')
    const scrollLeft = await element.property("scrollLeft")
    console.log("check_scroll_left---"+scrollLeft)
    expect(scrollLeft-600).toBeGreaterThanOrEqual(0)
  })

  //检测横向scroll_into_view属性赋值
  it('check_scroll_into_view_left', async () => {
    await setPageData({ scrollX: true })
    await setPageData({ scrollIntoView: "horizontal_item3" })
    await page.waitFor(600)
    const element = await page.$('#scrollViewX')
    const scrollLeft = await element.property("scrollLeft")
    console.log("check_scroll_into_view_left--"+scrollLeft)
    await setPageData({ scrollIntoView: "" })
    expect(scrollLeft-930).toBeGreaterThanOrEqual(0)
  })

  //截图对比
  it('scroll-view-props-screenshot', async () => {
    //禁止滚动条
    await setPageData({ showScrollbar: false })
    await page.waitFor(1000);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })


  //截图末尾位置元素
  it('scroll-view-props-last-item-screenshot', async () => {
    //滚动到末尾位置
    await setPageData({ scrollLeft: 10000 })
    await page.waitFor(1000);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })
});
