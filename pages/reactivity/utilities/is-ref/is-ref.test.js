const PAGE_PATH = '/pages/reactivity/utilities/is-ref/is-ref'

describe('isRef', () => {
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
  })
})