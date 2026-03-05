const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/component/picker-view/picker-view'
let page, pickerViewEl;
describe('PickerView.uvue', () => {
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(1000)
    await page.callMethod('setEventCallbackNumTest', 0)
    pickerViewEl = await page.$('.picker-view')
  })

  async function toScreenshot(imgName) {
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return imgName
      }
    })
    await page.waitFor(500);
  }

  it('value', async () => {
    await page.callMethod('setValue')
    await page.waitFor(1500)
    const newValue1 = await pickerViewEl.property('value')
    // TODO
    expect(newValue1.toString()).toEqual('0,1,30')
    // 仅在App端，setValue可触发change事件
    if (isAndroid || isIOS) {
      const res = await page.data('data.result')
      await page.waitFor(500)
      expect(res).toEqual([ 0, 1, 30 ])
    }
    await page.callMethod('setValue1')
    await page.waitFor(1500)
    const newValue2 = await pickerViewEl.property('value')
    // TODO
    expect(newValue2.toString()).toEqual('10,10,10')
    if (isAndroid || isIOS) {
      const res = await page.data('data.result')
      await page.waitFor(500)
      expect(res).toEqual([10, 10, 10])
    }
  })

  it('length', async () => {
    const els = await page.$$('.picker-view')
    expect(els.length).toBe(1)
    const els1 = await page.$$('.picker-view-column')
    expect(els1.length).toBe(3)
  })

  // indicatorStyle 属性在编译时被解析成了对象，在获取时和用户设置的值格式不一样 [object Object]
  // app-ios 同上
  if (!isHarmony && !isIOS) {
    it('indicator-style', async () => {
      const indicatorStyle = "height: 50px;border:#ff5500 solid 1px;background:rgba(182, 179, 255, 0.4);"
      await page.callMethod('setIndicatorStyle',true)
      await page.waitFor(500)
      expect(await pickerViewEl.attribute(isMP ? 'indicator-style' : 'indicatorStyle')).toBe(indicatorStyle)
      await toScreenshot('picker-view-indicator-style')
      //清空indicatorStyle
      await page.callMethod('setIndicatorStyle',false)
    })
  }

  if (isWeb || isMP) {
    // indicator-class、mask-style、mask-class 仅web和MP支持
    it('indicator-class', async () => {
      //设置indicator-class
      await page.callMethod('setIndicatorClass',true)
      expect(await pickerViewEl.attribute(isMP ? 'indicator-class': 'indicatorClass')).toBe("indicator-test")
      await toScreenshot('picker-view-web-indicator-class')
      //清空indicatorClass
      await page.callMethod('setIndicatorClass',false)
    })
    it('mask-style', async () => {
      const maskStyle = "background-image: linear-gradient(to bottom, #d8e5ff, rgba(216, 229, 255, 0));"
      // 设置mask-style
      await page.callMethod('setMaskStyle',true)
      expect(await pickerViewEl.attribute(isMP ? 'mask-style' : 'maskStyle')).toBe(maskStyle)
      await toScreenshot('picker-view-web-mask-style')
    })
    it('mask-class', async () => {
      // 设置mask-class
      await page.callMethod('setMaskClass',true)
      expect(await pickerViewEl.attribute(isMP ? 'mask-class' : 'maskClass')).toBe("mask-test")
      await toScreenshot('picker-view-web-mask-class')
    })
    return
  }

  if (!isAppWebView && !isMP && !isHarmony) {
    it('mask-top-bottom-style', async () => {
      // mask-top-style、mask-bottom-style仅App端支持
      const linearToTop = "background-image: linear-gradient(to bottom, #f4ff73, rgba(216, 229, 255, 0));"
      const linearToBottom = "background-image: linear-gradient(to top, #f4ff73, rgba(216, 229, 255, 0));"

      // 第一次激活：设置黄色渐变
      await page.callMethod('setMaskTopStyle',true)
      await page.callMethod('setMaskBottomStyle',true)
      await page.waitFor(500)
      expect(await pickerViewEl.attribute('mask-top-style')).toBe(linearToTop)
      expect(await pickerViewEl.attribute('mask-bottom-style')).toBe(linearToBottom)
      await page.waitFor(2000)
      await toScreenshot('picker-view-app-mask-top-bottom-style')

      // 第二次点击：切换回原始状态
      await page.callMethod('setMaskTopStyle',false)
      await page.callMethod('setMaskBottomStyle',false)
      await page.waitFor(500)
      expect(await pickerViewEl.attribute('mask-top-style')).toBe('')
      expect(await pickerViewEl.attribute('mask-bottom-style')).toBe('')
      await page.waitFor(1000)
      await toScreenshot('picker-view-app-mask-top-bottom-style-cleared')
    })

    it('reopen-picker-view-page', async () => {
      page = await program.switchTab('/pages/tabBar/component')
      await page.waitFor(500)
      page = await program.navigateTo(PAGE_PATH)
      await page.waitFor(500)
      const {
        year,
        month,
        day
      } = await page.data('data')
      expect(year).toEqual(2018)
      expect(month).toEqual(1)
      expect(day).toEqual(12)
    })

    it('trigger UniPickerViewChangeEvent', async () => {
      await page.callMethod('setEventCallbackNumTest', 0)
      await page.callMethod('setValue')
      await page.waitFor(1500)
      const eventCallbackNum = await page.callMethod('getEventCallbackNum')
      // 年月日滚动三次，测试 e.tagName +1 和 e.type+2，正常为9
      expect(eventCallbackNum).toBe(9)
    })
  }

})
