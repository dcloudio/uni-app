const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
const isDom2 = process.env.UNI_APP_X_DOM2 == 'true'
const PAGE_PATH = '/pages/component/switch/switch'

describe('switch', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it('checked', async () => {
    const switch_element = await page.$('.switch-checked')
    await setPageData({
      checked: false
    })
    await page.waitFor(100)
    // TODO
    const newValue1 = await switch_element.property('checked')
    expect(newValue1.toString()).toBe(false + '')
    await setPageData({
      checked: true
    })
    await page.waitFor(100)
    // TODO
    const newValue2 = await switch_element.property('checked')
    expect(newValue2.toString()).toBe(true + '')
  })
  it('color', async () => {
    if (isHarmony && isDom2) {
      console.log('Switch Harmony Dom2 not support props color')
      expect(1).toBe(1)
      return
    }
    const switch_element = await page.$('.switch-color')
    expect(await switch_element.attribute('color')).toBe('#FFCC33')
    const color = '#00ff00'
    await setPageData({
      color: color
    })
    await page.waitFor(100)
    expect(await switch_element.attribute('color')).toBe(color)
  })
  if(!isMP) {
    it('dark', async () => {
      if (isHarmony && isDom2) {
        console.log('Switch Harmony Dom2 not support props background-color、fore-color、active-background-color、active-fore-color')
        expect(1).toBe(1)
        return
      }
      const dark = await page.$('#dark')
      const darkChecked = await page.$('#darkChecked')
      expect(await dark.attribute('background-color')).toBe('#1f1f1f')
      expect(await dark.attribute('fore-color')).toBe('#f0f0f0')
      expect(await darkChecked.attribute('active-background-color')).toBe('#007aff')
      expect(await darkChecked.attribute('active-fore-color')).toBe('#ffffff')
    })
  }
  it('click', async () => {
    let switchElement
    // TODO 暂时通过获取组件内部的 class 触发模拟点击
    if (isAndroid) {
      switchElement = await page.$('.uni-switch-input')
      await switchElement.tap()
      await page.waitFor(200)
      const {testVerifyEvent} = await page.data('data')
      expect(testVerifyEvent).toBe(true)
    } else {
      // switchElement = await page.$('#testTap')
    }

    // await switchElement.tap()
    // await page.waitFor(200)

    // const {
    //   testVerifyEvent
    // } = await page.data()

    // expect(testVerifyEvent).toBe(true)
  })

  if (isDom2 && isHarmony) {
    it('externalClasses', async () => {
      const switchElement = await page.$('#darkChecked')
      expect(await switchElement.attribute('switch-active-class')).toContain('custom-switch-active')
      expect(await switchElement.attribute('thumb-active-class')).toContain('custom-thumb-active1')
      expect(await switchElement.attribute('thumb-class')).toContain('custom-thumb1')
    })
  }
})
