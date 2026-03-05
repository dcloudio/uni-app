const PAGE_PATH = '/pages/component/global-events/touch-events-case'

describe('touch-events-test', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')
  const isHarmony = platformInfo.startsWith('harmony')

  if (isWeb || isMP) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('跳过横屏模式', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
  })

  it('touch-event-case1', async () => {
    let x = 40
    let y = 150

    // 滑动事件
    await program.swipe({
      startPoint: {x, y},
      endPoint: {x: x + 300, y},
      duration: 300
    })

    await page.waitFor(1500);
    const swiperChangeEvent = await page.data('data.swiperChangeEvent')
    expect(swiperChangeEvent).toBe(true)
  })

  it('touch-event-case2', async () => {
    const viewTouchEvent = await page.data('data.viewTouchEvent')
    const swiperItemTouchEvent = await page.data('data.swiperItemTouchEvent')
    const swiperTouchEvent = await page.data('data.swiperTouchEvent')
    let ret = viewTouchEvent && swiperItemTouchEvent && swiperTouchEvent
    expect(ret).toBe(true)
  })

  // if (isHarmony && platformInfo.indexOf('14') > -1) {
  if (isHarmony) {
    console.log('跳过鸿蒙14的测试，鸿蒙14的swiper组件不支持preventDefault stopPropagation')
    return
  }

  it('test swiper preventDefault stopPropagation', async () => {
    await page.waitFor(1500);
    await page.callMethod('resetEvent')
    let x = 25
    let y = 150

    // 滑动事件
    await program.swipe({
      startPoint: {x, y},
      endPoint: {x: x+200,y},
      duration: 300
    })

    await page.waitFor(1500);
    const swiperChangeEvent = await page.data('data.swiperChangeEvent')
  // harmony 依赖 API 15+
    console.log("swiperChangeEvent:", swiperChangeEvent)
    expect(swiperChangeEvent).toBe(false)
  })

  it('touch-event-case4', async () => {
    const viewTouchEvent = await page.data('data.viewTouchEvent')
    const swiperItemTouchEvent = await page.data('data.swiperItemTouchEvent')
    const swiperTouchEvent = await page.data('data.swiperTouchEvent')
    let ret = viewTouchEvent && !swiperItemTouchEvent && !swiperTouchEvent
    expect(ret).toBe(true)
  })
})
