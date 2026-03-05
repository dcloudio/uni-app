const PAGE_PATH = '/pages/reactivity/utilities/is-reactive/is-reactive'

describe('isReactive', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const isReactiveCount = await page.$('#is-reactive-count')
    expect(await isReactiveCount.text()).toBe('false')

    const isReactiveRefCount = await page.$('#is-reactive-ref-count')
    expect(await isReactiveRefCount.text()).toBe('false')

    const isReactiveReactiveCount = await page.$('#is-reactive-reactive-count')
    expect(await isReactiveReactiveCount.text()).toBe('true')

    const isReactiveReadonlyCount = await page.$('#is-reactive-readonly-count')
    expect(await isReactiveReadonlyCount.text()).toBe('false')

    const isReactiveShallowReactiveCount = await page.$('#is-reactive-shallow-reactive-count')
    expect(await isReactiveShallowReactiveCount.text()).toBe('true')

    const isReactiveShallowReadonlyCount = await page.$('#is-reactive-shallow-readonly-count')
    expect(await isReactiveShallowReadonlyCount.text()).toBe('false')
  })
})