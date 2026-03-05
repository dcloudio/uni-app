const PAGE_PATH = '/pages/reactivity/utilities/is-proxy/is-proxy'

describe('isProxy', () => {
  let page = null
  
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  
  it('basic', async () => {
    const isProxyCount = await page.$('#is-proxy-count')
    expect(await isProxyCount.text()).toBe('false')

    const isProxyRefCount = await page.$('#is-proxy-ref-count')
    expect(await isProxyRefCount.text()).toBe('false')

    const isProxyReactiveCount = await page.$('#is-proxy-reactive-count')
    expect(await isProxyReactiveCount.text()).toBe('true')

    const isProxyReadonlyCount = await page.$('#is-proxy-readonly-count')
    expect(await isProxyReadonlyCount.text()).toBe('true')

    const isProxyShallowReactiveCount = await page.$('#is-proxy-shallow-reactive-count')
    expect(await isProxyShallowReactiveCount.text()).toBe('true')

    const isProxyShallowReadonlyCount = await page.$('#is-proxy-shallow-readonly-count')
    expect(await isProxyShallowReadonlyCount.text()).toBe('true')
  })
})