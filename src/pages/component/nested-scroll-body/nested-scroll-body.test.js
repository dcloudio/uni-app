const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('component-native-nested-scroll-body', () => {
  if (isMP || isWeb || isAppWebView) {
    it('dummyTest', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  //检测横向scroll_into_view属性赋值
  it('check_scroll_into_view_left', async () => {
    page = await program.reLaunch('/pages/component/nested-scroll-body/nested-scroll-body')
    await page.waitFor('view')
    await page.waitFor(1000)

    await page.callMethod('testBodyScrollBy', 400)
    await page.waitFor(300)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })

  if(isIOS || isAndroid || isHarmony){
    it('check_scroll', async () => {
      await page.waitFor(300)

      let x = 100
      let y = 450

      await program.swipe({
        startPoint: {x: x, y: y},
        endPoint: {x: x,y: 0},
        duration: 300
      })

      await page.waitFor(300)

      y = 200
      await program.swipe({
        startPoint: {x: x, y: y},
        endPoint: {x: x,y: y + 100},
        duration: 300
      })

      await page.waitFor(300)

      let scrollTop = await page.data('data.testScrollTop')
      expect(scrollTop).toBeLessThan(250)
    })
  }
})
