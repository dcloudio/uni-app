const PAGE_PATH = '/pages/API/get-app/get-app'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')

describe('getApp', () => {
  let page = null
  beforeAll(async () => {
    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view')
  })
  it('globalData', async () => {
    await page.callMethod('getGlobalData')
    let data = await page.data('data')
    expect(data.originGlobalData.str).toBe('default globalData str')
    expect(data.originGlobalData.num).toBe(0)
    expect(data.originGlobalData.bool).toBe(false)
    expect(data.originGlobalData.obj).toEqual({
      bool: false,
      num: 0,
      str: 'default globalData obj str',
    })
    expect(data.originGlobalData.arr).toEqual([])
    expect(data.originGlobalData.set).toEqual([])
    expect(data.originGlobalData.map).toEqual({})
    expect(data.originGlobalDataFuncRes).toBe('globalData fun')
    await page.callMethod('setGlobalData')
    data = await page.data('data')
    expect(data.newGlobalData.str).toBe('new globalData str')
    expect(data.newGlobalData.num).toBe(100)
    expect(data.newGlobalData.bool).toBe(true)
    expect(data.newGlobalData.obj).toEqual({
      bool: true,
      num: 200,
      str: 'new globalData obj str',
    })
    expect(data.newGlobalData.arr).toEqual([1, 2, 3])
    expect(data.newGlobalData.set).toEqual(['a', 'b', 'c'])
    expect(data.newGlobalData.map).toEqual({
      a: 1,
      b: 2,
      c: 3
    })
    expect(data.newGlobalDataFuncRes).toBe('new globalData fun')
  })
  it('method', async () => {
    const oldLifeCycleNum = await page.data('data.lifeCycleNum')
    await page.callMethod('_increaseLifeCycleNum')
    const newLifeCycleNum = await page.data('data.lifeCycleNum')
    expect(newLifeCycleNum - oldLifeCycleNum).toBe(100)
    await page.callMethod('setLifeCycleNumFunc', oldLifeCycleNum)
  })
  if (!isMP) {
    it('getAndroidApplication', async () => {
      const res = await page.callMethod('getAndroidApplication')
      expect(res).toBe(isAndroid)
    })
  }
})
