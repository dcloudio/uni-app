const PAGE_PATH = '/pages/reactivity/utilities/un-ref/un-ref'

describe('unref', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  
  it('basic', async () => {
    const refCount = await page.$('#ref-count')
    expect(await refCount.text()).toBe('0')
    const refCountType = await page.$('#ref-count-type')
    expect(await refCountType.text()).toBe('object')

    const count = await page.$('#count')
    expect(await count.text()).toBe('0')
    const isRefCount = await page.$('#count-type')
    expect(await isRefCount.text()).toBe('number')
  })
})