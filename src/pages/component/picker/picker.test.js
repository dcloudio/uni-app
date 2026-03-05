const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/component/picker/picker'

describe('Picker.uvue', () => {
  if (!isHarmony && !isWeb) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });

  function getData(key = '') {
    return new Promise(async (resolve, reject) => {
      const data = await page.data('data')
      resolve(key ? data[key] : data)
    })
  }

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  function getValue(className, propertyValue = 'value') {
    return new Promise(async (resolve, reject) => {
      const el = await page.$(className)
      const value = await el.property(propertyValue)
      resolve(value)
    })
  }

  it('picker disabled', async () => {
    expect(await getValue('.picker-disabled--test')).toBe(0)
    const pickerValueEl = await page.$('.picker-disabled--value')
    expect(await pickerValueEl.text()).toBe('中国')
  })

  it('picker selector', async () => {
    expect(await getValue('.picker-selector--test')).toBe(await getData('index'))
    await setPageData({index: 1})
    const pickerValueEl = await page.$('.picker-selector--value')
    expect(await pickerValueEl.text()).toBe('美国')

    await page.callMethod('setSelectorValue')
    await page.waitFor(1500)
    expect(await pickerValueEl.text()).toBe('巴西')
  })

  it('picker multiSelector', async () => {
    expect(await getValue('.picker-multi--test')).toEqual(await getData('multiIndex'))
    const pickerMultiValueEl = await page.$('.picker-multi--value')
    expect(await pickerMultiValueEl.text()).toStrictEqual('亚洲，中国，北京')
    await setPageData({multiIndex: [0, 0, 2]})
    const pickerMultiValueEl2 = await page.$('.picker-multi--value')
    expect(await pickerMultiValueEl2.text()).toStrictEqual('亚洲，中国，广州')
  })

  it('picker time', async () => {
    expect(await getValue('.picker-time--test')).toBe(await getData('time'))
    await setPageData({time: '15:30'})
    expect(await getValue('.picker-time--test')).toEqual('15:30')
  })

  it('picer date-day', async () => {
    expect(await getValue('.picker-date-day--test')).toBe(await getData('dayDate'))
    await setPageData({dayDate: '2028-05-20'})
    expect(await getValue('.picker-date-day--test')).toEqual('2028-05-20')
    expect(await getValue('.picker-date-day--test', 'start')).toStrictEqual(await getData('startDate'))
    expect(await getValue('.picker-date-day--test', 'end')).toStrictEqual(await getData('endDate'))
  })
  it('picker date-month', async () => {
    expect(await getValue('.picker-date-month--test')).toBe(await getData('monthDate'))
    await setPageData({monthDate: '2028-05'})
    expect(await getValue('.picker-date-month--test')).toEqual('2028-05')
    expect(await getValue('.picker-date-month--test', 'start')).toStrictEqual(await getData('startDate'))
    expect(await getValue('.picker-date-month--test', 'end')).toStrictEqual(await getData('endDate'))
  })
  it('picker date-year', async () => {
    expect(await getValue('.picker-date-year--test')).toBe(await getData('yearDate'))
    await setPageData({yearDate: '2028'})
    expect(await getValue('.picker-date-year--test')).toEqual('2028')
    expect(await getValue('.picker-date-year--test', 'start')).toStrictEqual(await getData('startDate'))
    expect(await getValue('.picker-date-year--test', 'end')).toStrictEqual(await getData('endDate'))
  })

})
