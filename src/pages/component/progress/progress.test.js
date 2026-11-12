const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('Progress.uvue', () => {
  let page

  async function getData(key = '') {
    const data = await page.data('data')
    return key ? data[key] : data
  }
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/progress/progress')
    await page.waitFor(2000);
  })

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  beforeEach(async () => {
    await page.callMethod('setEventCallbackNumTest', 0)
  })


  it('percent', async () => {
    await page.callMethod('setProgress')
    await page.waitFor(1000);
    const p = await page.$('#progress-default')
    expect(await p.attribute('percent')).toEqual(20 + '')
    const p1 = await page.$('#progress-plain')
    expect(await p1.attribute('percent')).toEqual(40 + '')
    const p2 = await page.$('#progress-plain-second')
    expect(await p2.attribute('percent')).toEqual(60 + '')
    const p3 = await page.$('#progress-blue')
    expect(await p3.attribute('percent')).toEqual(80 + '')
    if (process.env.UNI_PLATFORM === 'app-android') {
      expect(await getData('curPercent')).toEqual(20)
    }
    await page.callMethod('clearProgress')
    await page.waitFor(1000)
    expect(await p.attribute('percent')).toEqual(0 + '')
    expect(await p1.attribute('percent')).toEqual(0 + '')
    expect(await p2.attribute('percent')).toEqual(0 + '')
    expect(await p3.attribute('percent')).toEqual(0 + '')
    if (process.env.UNI_PLATFORM === 'app-android') {
      expect(await getData('curPercent')).toEqual(0)
    }
  })
  it('renders the preview and four default examples', async () => {
    const ids = ['progress-preview', 'progress-default', 'progress-plain', 'progress-plain-second', 'progress-blue']
    for (const id of ids) {
      expect(await page.$(`#${id}`)).not.toBeNull()
    }
  })
  if(isMP) {
    it('show-info', async () => {
      const el = await page.$('#progress-default')
      expect(await el.property('showInfo')).toEqual(true)
      await setPageData({showInfo: false})
      expect(await el.property('showInfo')).toEqual(false)
    })
  } else {
    it('show-info', async () => {
      const el = await page.$('#progress-default')
      expect(await el.attribute('show-info')).toEqual(true + '')
      await setPageData({showInfo: false})
      expect(await el.attribute('show-info')).toEqual(false + '')
    })
  }
  it('border-radius', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('border-radius')).toEqual(0 + '')
    await setPageData({borderRadius: 5})
    expect(await el.attribute('border-radius')).toEqual(5 + '')
  })
  it('font-size', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('font-size')).toEqual(16 + '')
    await setPageData({fontSize: 18})
    expect(await el.attribute('font-size')).toEqual(18 + '')
  })
  it('stroke-width', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('stroke-width')).toEqual(3 + '')
    await setPageData({strokeWidth: 6})
    expect(await el.attribute('stroke-width')).toEqual(6 + '')
    if(isWeb) {
      await setPageData({strokeWidth: '10px'})
      expect(await el.attribute('stroke-width')).toEqual('10px')
      await setPageData({strokeWidth: '30rpx'})
      expect(await el.attribute('stroke-width')).toEqual('30rpx')
    }
  })
  it('backgroundColor', async () => {
    const el = await page.$('#progress-default')
    expect(await el.attribute('background-color')).toEqual('#EBEBEB')
    await setPageData({backgroundColor: "#007aff"})
    expect(await el.attribute('background-color')).toEqual('#007aff')
  })
  it('trigger UniProgressActiveendEvent', async () => {
    if (isWeb || isMP) {
      expect(1).toBe(1)
      return
    }

    await setPageData({pgList: [21, 40, 60, 80]})
    // 动画执行
    await page.waitFor(1000);
    const eventCallbackNum = await page.callMethod('getEventCallbackNum')
    expect(eventCallbackNum).toBe(3)
  })
  it('active-color attribute', async () => {
    const el = await page.$('#progress-preview')
    expect(await el.attribute('active-color')).toBe('#09BB07')
  })

})
