// @Author-APP-ANDROID:DCloud_Android_DQQ
const PAGE_PATH = '/pages/component/swiper/swiper'


describe('swiper-touch-test', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  const isHarmony = platformInfo.startsWith('harmony')
  const isAndroid = platformInfo.startsWith('android')
  let res;
  // 屏蔽 web & 小程序，不支持 program.swipe
  if (isWeb || isMP) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
    res = await page.callMethod('jest_getSystemInfo')
  })


  it('滑动切换 swiper', async () => {
    let x = await page.data('data.swipeX')
    let y = await page.data('data.swipeY')
    // harmony onReady getBoundingClientRect 获取节点宽度不稳定，偶发错误
    if (isHarmony && x < 20) {
      x = 300
    }
    // program.swipe Android10以上不生效
    if(isAndroid && res.osAndroidAPILevel > 28){
      // 避免 android 10 侧滑影响
      x -= 20
    }
    await program.swipe({
      startPoint: {x, y},
      endPoint: {x: 10, y},
      duration: 200
    })

    await page.waitFor(1000)
    let val = await page.data('data.currentValChange')
    expect(val).toEqual(1)
  })
})
