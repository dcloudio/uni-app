const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('component-native-scroll-view-props', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

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

  //检测多次上下滚动时 scrolltolower / scrolltoupper 是否准确触发（仅蒸汽模式）
  if (isVapor) {
    it('Event scrolltolower-多次上下滚动准确触发', async () => {
      // 切换为竖向滚动视图
      await setPageData({ scrollX: false })
      await page.waitFor(300)

      // 轮询等待计数超过指定值，避免固定等待时长在低性能设备上偶发失败
      async function waitCount(key, moreThan, timeout = 3000) {
        const start = Date.now()
        let value = await page.data(key)
        while (Date.now() - start < timeout && value <= moreThan) {
          await page.waitFor(100)
          value = await page.data(key)
        }
        return value
      }

      let lowerCount = 0
      let upperCount = 0
      // 上下往返 3 次：每次滚到底部都应触发一次 scrolltolower，回到顶部都应触发一次 scrolltoupper
      for (let i = 1; i <= 3; i++) {
        await setPageData({ scrollTop: 10000 })
        lowerCount = await waitCount('data.scrollToLowerCount', lowerCount)
        expect(lowerCount).toBeGreaterThanOrEqual(i)

        await setPageData({ scrollTop: 0 })
        upperCount = await waitCount('data.scrollToUpperCount', upperCount)
        expect(upperCount).toBeGreaterThanOrEqual(i)
      }

      // 滚动到中间位置（未到达底部），不应触发新的 scrolltolower
      const lowerBefore = await page.data('data.scrollToLowerCount')
      await setPageData({ scrollTop: 500 })
      await page.waitFor(600)
      expect(await page.data('data.scrollToLowerCount')).toBe(lowerBefore)

      // 再次滚到底部，应继续触发 scrolltolower
      await setPageData({ scrollTop: 10000 })
      lowerCount = await waitCount('data.scrollToLowerCount', lowerBefore)
      expect(lowerCount).toBeGreaterThan(lowerBefore)
    })
  }

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

  if(!isAndroid) {//Android scroll_into_view暂时未支持孙节点
    //检测竖向scroll_into_view滚动到孙节点属性赋值
    it('check_scroll_into_view_top_grand_child', async () => {
        await setPageData({ scrollIntoView: "grand_child_item3" })
        await page.waitFor(600)
        const element = await page.$('#scrollViewY')
        const scrollTop = await element.property("scrollTop")
        console.log("check_scroll_into_view_top--"+scrollTop)
        await setPageData({ scrollIntoView: "" })
        expect(scrollTop-570).toBeGreaterThanOrEqual(0)
    })
  }


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


  if(!isAndroid) {//Android scroll_into_view 暂未支持孙节点
    //检测横向scroll_into_view滚动到孙节点属性赋值
    it('check_scroll_into_view_left_grand_child', async () => {
      await setPageData({ scrollX: true })
      await setPageData({ scrollIntoView: "horizontal_grand_child__item3" })
      await page.waitFor(600)
      const element = await page.$('#scrollViewX')
      const scrollLeft = await element.property("scrollLeft")
      console.log("check_scroll_into_view_left--"+scrollLeft)
      await setPageData({ scrollIntoView: "" })
      expect(scrollLeft-930).toBeGreaterThanOrEqual(0)
    })
  }

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
