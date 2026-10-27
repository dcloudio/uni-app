const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('component-native-waterflow', () => {
  if (isMP || isWeb || isAppWebView) {
  	it('not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    //打开waterflow测试页
    page = await program.reLaunch('/pages/component/waterflow/waterflow')
    await page.waitFor(600)
  })

  async function isHarmonyOSLowerThanApi20() {
    // 非蒸汽模式鸿蒙平台api 20支持waterflow滚动相关事件
    const osHarmonySDKAPIVersion = await page.data('data.osHarmonySDKAPIVersion')
    return isHarmony && osHarmonySDKAPIVersion < 20
  }

  //检测竖向scrolltop属性赋值
  it('check_scroll_top', async () => {
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('confirm_scroll_top_input', 600)
    await page.waitFor(600)
    const listElement = await page.$('#waterflow')
    const scrollTop = await listElement.attribute("scrollTop")
    console.log("check_scroll_top---"+scrollTop)
    expect(scrollTop-600).toBeGreaterThanOrEqual(0)
  })

  it('Event check_scroll', async () => {
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('confirm_scroll_top_input', 300)
    await page.waitFor(600)
    const scrollDetail = await page.data('data.scrollDetailTest')
    // console.log('scrollDetailTest:', scrollDetail)
    expect(scrollDetail.scrollLeft).toBe(0)
    // scrollTop和deltaY 在安卓端差异 299.8095
    expect(scrollDetail.scrollTop).toBeGreaterThan(299.5)
    //expect([300, 299.8095]).toContain(scrollDetail.scrollTop);
    expect(scrollDetail.scrollHeight).toBeGreaterThan(0)
    expect(scrollDetail.scrollWidth).toBeGreaterThan(0)
    expect(scrollDetail.deltaX).toBe(0)
    //此处可判断安卓issues:9121的问题
    expect(scrollDetail.deltaY).toBeGreaterThan(299.5)
    //expect([300.1905, 300, 299.8095]).toContain(scrollDetail.deltaY);
    expect(await page.data('data.isScrollTest')).toBe('scroll:Success')
  })

  it('Event scrolltolower-滚动到底部/右边',async()=>{
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    //隐藏加载更多元素
    await page.callMethod('change_load_more_boolean', false)
    await page.waitFor(600)
    // 滚动到底部,是否触发scrolltolower事件
    await page.callMethod('confirm_scroll_top_input', 2500)
    await page.waitFor(600)
    expect(await page.data('data.isScrolltolowerTest')).toBe('scrolltolower:Success-bottom')
    //截图 检测末尾处元素UI展示
    const image = await program.screenshot({fullPage: false});
    expect(image).toSaveImageSnapshot();
  })

  it('Event scrolltoupper-滚动到顶部/左边',async()=>{
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    // 滚动到顶部50,是否触发scrolltoupper事件
    await page.callMethod('confirm_scroll_top_input', 50)
    await page.waitFor(1000)
    expect(await page.data('data.isScrolltoupperTest')).toBe('scrolltoupper:Success-top')
  })

  it('Event scrollend-滚动结束时触发',async()=>{
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    // 仅App端支持,向上滑动页面
    await program.swipe({
      startPoint: { x: 100, y: 300 },
      endPoint: { x: 100, y: 100 },
      duration: 100
    })
    await page.waitFor(4200)
    const endDetail = await page.data('data.scrollEndDetailTest')
    console.log('scrollEndDetailTest:', endDetail)
    expect(endDetail.deltaY).toBe(0)
    expect(endDetail.deltaX).toBe(0)
    expect(endDetail.scrollLeft).toBe(0)
    expect(endDetail.scrollTop).toBeGreaterThan(0)
    expect(endDetail.scrollHeight).toBeGreaterThan(0)
    expect(endDetail.scrollWidth).toBeGreaterThan(0)
  })

  // 蒸汽模式不会对所有item排版并渲染，无法计算准确scrollHeight，屏蔽此测试
  if(!isVapor) {
    //检测竖向可滚动区域
    it('check_scroll_height', async () => {
      if (await isHarmonyOSLowerThanApi20()) {
        expect(1).toBe(1)
        return
      }
      await page.waitFor(600)
      const value = await page.callMethod('check_scroll_height')
      expect(value).toBe(true)
    })
  }

  //检测下拉刷新
  it('check_refresher', async () => {
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('confirm_scroll_top_input', 0)
    await page.setData({
        data:{
          refresher_enabled_boolean: true,
          refresher_triggered_boolean: true
        }
    })
    await page.waitFor(1000)
    expect(await page.data('data.refresherrefresh')).toBe(true)
    //延迟 等待下拉刷新执行结束 防止后续测试任务结果异常
    await page.waitFor(2000)
  })

  if(!isHarmony && !isVapor) {
    // 鸿蒙平台或蒸汽模式waterflow不支持scroll-into-view
    //检测竖向scroll_into_view属性赋值
    it('check_scroll_into_view_top', async () => {
      await page.callMethod('setScrollIntoView', 'item---3')
      await page.waitFor(600)
      const scrollTop = await page.callMethod('getScrollTop')
      console.log("check_scroll_into_view_top--"+scrollTop)
      await page.callMethod('setScrollIntoView', 'item---0')
      expect(scrollTop-280).toBeGreaterThanOrEqual(0)
    })

    it('check_scroll_into_view_top_2', async () => {
      await page.callMethod('confirm_scroll_top_input', 2000)
      await page.waitFor(600)
      //需要先赋值空，不然不会引起变化
      await page.callMethod('setScrollIntoView', '')
      await page.waitFor(300)
      await page.callMethod('setScrollIntoView', 'item---0')
      await page.waitFor(600)
      const scrollTop = await page.callMethod('getScrollTop')
      console.log("check_scroll_into_view_top2--"+scrollTop)
      expect(scrollTop).toBeLessThanOrEqual(10)
    })
  }

  //检测waterflow属性变化 截图校验
  it('check_waterflow_view_props', async () => {
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('testModifyWaterflowProps')
    await page.waitFor(600)
    const image = await program.screenshot({fullPage: false});
    expect(image).toSaveImageSnapshot();
    await page.waitFor(1000)
  })

  //检测waterflow 单列 截图校验
  it('check_waterflow_single_row', async () => {
    if (await isHarmonyOSLowerThanApi20()) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('testModifyWaterflowSingleRow')
    await page.waitFor(600)
    const image = await program.screenshot({fullPage: false});
    expect(image).toSaveImageSnapshot();
  })
})
