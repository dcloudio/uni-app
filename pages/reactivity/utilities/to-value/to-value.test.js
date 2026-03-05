const PAGE_PATH = '/pages/reactivity/utilities/to-value/to-value'
const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isWeb = platformInfo.startsWith('web')

describe('toValue', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const refCount = await page.$('#ref-count')
    expect(await refCount.text()).toBe('0')
    const isRefRefCount = await page.$('#is-ref-ref-count')
    expect(await isRefRefCount.text()).toBe('true')
    const count = await page.$('#count')
    expect(await count.text()).toBe('0')
    const isRefCount = await page.$('#is-ref-count')
    expect(await isRefCount.text()).toBe('false')

    const objNum = await page.$('#obj-num')
    expect(await objNum.text()).toBe('0')
    const toValueObjNum = await page.$('#to-value-obj-num')
    expect(await toValueObjNum.text()).toBe('0')

    const incrementBtn = await page.$('#increment-btn')
    await incrementBtn.tap()
    await page.waitFor(500)

    expect(await objNum.text()).toBe('1')
    if(!isWeb){
      // 数据更新成功，但因为 web 端 text 为组件，所以视图未更新
      expect(await toValueObjNum.text()).toBe('1')
    }
  })
})