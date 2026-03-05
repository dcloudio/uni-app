const PAGE_PATH = '/pages/reactivity/advanced/to-raw/to-raw'

describe('toRaw', () => {
  let page = null
  
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  
  it('basic', async () => {
    const checkToRawRef = await page.$('#check-to-raw-ref')
    expect(await checkToRawRef.text()).toBe('false')

    const checkToRawReactive = await page.$('#check-to-raw-reactive')
    expect(await checkToRawReactive.text()).toBe('true')

    const checkToRawReadonly = await page.$('#check-to-raw-readonly')
    expect(await checkToRawReadonly.text()).toBe('true')

    const checkToRawShallowReactive = await page.$('#check-to-raw-shallow-reactive')
    expect(await checkToRawShallowReactive.text()).toBe('true')

    const checkToRawShallowReadonly = await page.$('#check-to-raw-shallow-readonly')
    expect(await checkToRawShallowReadonly.text()).toBe('true')
  })
})