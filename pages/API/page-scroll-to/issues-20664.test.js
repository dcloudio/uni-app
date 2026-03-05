const PAGE_PATH = '/pages/API/page-scroll-to/page-scroll-to'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('page-scroll-to', () => {

  if(isMP || isWeb) {
    // 不支持scrollend事件
    it('not support', async() => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })
  it('issues-20664', async () => {

    await page.callMethod('scrollTo')
    await page.waitFor(500)

    var scrollTop = await page.scrollTop()
    console.log("scrollTop: ", scrollTop)
    // 设备精度问题，允许上下浮动 2px，鸿蒙低版本偏差稍大
    expect(scrollTop > 98 && scrollTop < 102).toBe(true)
    console.log("expect---end")

    await program.swipe({
      startPoint: {x: 100,y: 200},
      endPoint: {x: 100,y: 300},
      duration: 100
    })
    console.log("swipe---end")
    await page.waitFor(500)

    await page.callMethod('scrollTo')
    await page.waitFor(500)
    console.log("scrollTo---end")
    scrollTop = await page.scrollTop()

    console.log("scrollTop: ", scrollTop)

    // 设备精度问题，允许上下浮动 2px，鸿蒙低版本偏差稍大
    expect(scrollTop > 98 && scrollTop < 102).toBe(true)
  })
})
