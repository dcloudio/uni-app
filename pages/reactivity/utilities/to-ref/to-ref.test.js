const PAGE_PATH = '/pages/reactivity/utilities/to-ref/to-ref'

describe('toRef', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const count = await page.$('#count')
    expect(await count.text()).toBe('0')
    const isRefCount = await page.$('#is-ref-count')
    expect(await isRefCount.text()).toBe('false')
    const refCount = await page.$('#ref-count')
    expect(await refCount.text()).toBe('0')
    const isRefRefCount = await page.$('#is-ref-ref-count')
    expect(await isRefRefCount.text()).toBe('true')

    const objNum = await page.$('#obj-num')
    expect(await objNum.text()).toBe('0')
    const toRefObjNum = await page.$('#to-ref-obj-num')
    expect(await toRefObjNum.text()).toBe('0')
    const toRefFnObjNum = await page.$('#to-ref-fn-obj-num')
    expect(await toRefFnObjNum.text()).toBe('0')

    const incrementBtn = await page.$('#increment-btn')
    await incrementBtn.tap()
    await page.waitFor(500)

    expect(await objNum.text()).toBe('2')
    expect(await toRefObjNum.text()).toBe('2')
    expect(await toRefFnObjNum.text()).toBe('2')
  })
})