const PAGE_PATH = '/pages/component/picker/picker'
const isMpAlipay = process.env.uniTestPlatformInfo.toLocaleLowerCase() === 'mp-alipay'

describe('Picker.uvue', () => {
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });

  function getData(key = '') {
    return new Promise(async (resolve) => {
      const data = await page.data('data')
      resolve(key ? data[key] : data)
    })
  }

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    });
  }

  it('picker disabled', async () => {
    expect(await getData('index')).toBe(0)
    const pickerValueEl = await page.$('.picker-disabled--value')
    expect(await pickerValueEl.text()).toBe('中国')
  })

  it('picker selector', async () => {
    expect(await getData('index')).toBe(0)
    await setPageData({
      index: 1
    })
    expect(await getData('index')).toBe(1)
    const pickerValueEl = await page.$('.picker-selector--value')
    expect(await pickerValueEl.text()).toBe('美国')

    await page.callMethod('setSelectorValue')
    await page.waitFor(1500)
    expect(await getData('index')).toBe(2)
    expect(await pickerValueEl.text()).toBe('巴西')
  })

  if (isMpAlipay) {
    it('picker multiSelector not support', () => {
      expect(1).toBe(1)
    })
  } else {
    it('picker multiSelector', async () => {
      expect(await getData('multiIndex')).toEqual([0, 0, 0])
      const pickerMultiValueEl = await page.$('.picker-multi--value')
      expect(await pickerMultiValueEl.text()).toStrictEqual('亚洲，中国，北京')
      await setPageData({
        multiIndex: [0, 0, 2]
      })
      expect(await getData('multiIndex')).toEqual([0, 0, 2])
      const pickerMultiValueEl2 = await page.$('.picker-multi--value')
      expect(await pickerMultiValueEl2.text()).toStrictEqual('亚洲，中国，广州')
    })
  }

  it('picker time', async () => {
    expect(await getData('time')).toBe('12:01')
    await setPageData({
      time: '15:30'
    })
    expect(await getData('time')).toEqual('15:30')
  })

  it('picker date-day', async () => {
    const dayDate = await getData('dayDate')
    const startDate = await getData('startDate')
    const endDate = await getData('endDate')
    expect(dayDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(startDate < dayDate).toBe(true)
    expect(dayDate < endDate).toBe(true)
    await setPageData({
      dayDate: '2028-05-20'
    })
    expect(await getData('dayDate')).toEqual('2028-05-20')
    expect(await getData('startDate')).toStrictEqual(startDate)
    expect(await getData('endDate')).toStrictEqual(endDate)
  })
  it('picker date-month', async () => {
    const monthDate = await getData('monthDate')
    const startDate = await getData('startDate')
    const endDate = await getData('endDate')
    expect(monthDate).toMatch(/^\d{4}-\d{2}$/)
    expect(startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    await setPageData({
      monthDate: '2028-05'
    })
    expect(await getData('monthDate')).toEqual('2028-05')
    expect(await getData('startDate')).toStrictEqual(startDate)
    expect(await getData('endDate')).toStrictEqual(endDate)
  })
  it('picker date-year', async () => {
    const yearDate = await getData('yearDate')
    const startDate = await getData('startDate')
    const endDate = await getData('endDate')
    expect(yearDate).toMatch(/^\d{4}$/)
    expect(startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    await setPageData({
      yearDate: '2028'
    })
    expect(await getData('yearDate')).toEqual('2028')
    expect(await getData('startDate')).toStrictEqual(startDate)
    expect(await getData('endDate')).toStrictEqual(endDate)
  })
})
