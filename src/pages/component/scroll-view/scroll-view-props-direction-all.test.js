const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isApp = platformInfo.startsWith('android') || platformInfo.startsWith('ios') || platformInfo.startsWith('harmony')
const isHarmony = platformInfo.startsWith('harmony')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('component-native-scroll-view-props-direction-all', () => {
  // 鸿蒙 NativeNode 的 ARKUI_SCROLL_DIRECTION_FREE 无法稳定应用 NODE_SCROLL_OFFSET 双轴偏移。
  // 鸿蒙官方问题单：https://developer.huawei.com/consumer/cn/support/feedback/#/ticketDetail?ticketNo=P30408
  if (!isApp || !isVapor || isMP || isHarmony) {
    it('only supports non-Harmony app vapor', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/scroll-view/scroll-view-props-direction-all')
    await page.waitFor(500)
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData })
  }

  it('check_scroll_height_and_width', async () => {
    expect(await page.callMethod('checkScrollHeight')).toBe(true)
    expect(await page.callMethod('checkScrollWidth')).toBe(true)
  })

  it('check_scroll_with_animation_toggle', async () => {
    expect(await page.data('data.scrollWithAnimation')).toBe(true)
    await setPageData({ scrollWithAnimation: false })
    await page.waitFor(200)
    expect(await page.data('data.scrollWithAnimation')).toBe(false)
    await setPageData({ scrollWithAnimation: true })
    await page.waitFor(200)
    expect(await page.data('data.scrollWithAnimation')).toBe(true)
  })

  it('check_scroll_top', async () => {
    await setPageData({ scrollWithAnimation: true, scrollLeft: 0, scrollTop: 420, scrollIntoView: '' })
    await page.waitFor(700)
    const element = await page.$('#scrollViewAll')
    const scrollTop = await element.property('scrollTop')
    const scrollLeft = await element.property('scrollLeft')
    expect(scrollTop).toBeGreaterThan(400)
    expect(scrollLeft).toBeLessThan(1)
  })

  it('check_scroll_left', async () => {
    await setPageData({ scrollWithAnimation: false, scrollTop: 0, scrollLeft: 0, scrollIntoView: '' })
    await page.waitFor(200)
    await setPageData({ scrollWithAnimation: true, scrollTop: 0, scrollLeft: 520, scrollIntoView: '' })
    await page.waitFor(700)
    const element = await page.$('#scrollViewAll')
    const scrollLeft = await element.property('scrollLeft')
    expect(scrollLeft).toBeGreaterThan(500)
  })

  it('check_scroll_into_view', async () => {
    await setPageData({ scrollWithAnimation: true })
    await page.callMethod('resetScrollPosition')
    await page.waitFor(300)
    await page.callMethod('scrollToTargetCell')
    await page.waitFor(700)
    const element = await page.$('#scrollViewAll')
    const scrollTop = await element.property('scrollTop')
    const scrollLeft = await element.property('scrollLeft')
    expect(scrollTop).toBeGreaterThan(0)
    expect(scrollLeft).toBeGreaterThan(0)
  })

  it('scroll-view-props-direction-all-screenshot', async () => {
    await setPageData({ showScrollbar: false, scrollWithAnimation: true, scrollTop: 0, scrollLeft: 0, scrollIntoView: '' })
    await page.waitFor(700)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot()
  })
})
