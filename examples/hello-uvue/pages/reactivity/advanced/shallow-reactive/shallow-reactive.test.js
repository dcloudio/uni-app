const PAGE_PATH = '/pages/reactivity/advanced/shallow-reactive/shallow-reactive'
const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isWeb = platformInfo.startsWith('web')

describe('shallowReactive', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const stateCount = await page.$('#state-count')
    expect(await stateCount.text()).toBe('0')

    const stateNestedCount = await page.$('#state-nested-count')
    expect(await stateNestedCount.text()).toBe('0')

    const incrementStateNestedCountBtn = await page.$('#increment-state-nested-count-btn')
    await incrementStateNestedCountBtn.tap()

    expect(await stateNestedCount.text()).toBe('0')

    const incrementStateCountBtn = await page.$('#increment-state-count-btn')
    await incrementStateCountBtn.tap()
    await page.waitFor(500)

    if (isWeb) {
      //   web 端 view text 为组件，无法动态更新 shallowReactive nested 数据
      state = await page.data('state')
      expect(state.count).toBe(1)
      expect(state.nested.count).toBe(1)
    } else {
      expect(await stateCount.text()).toBe('1')
      expect(await stateNestedCount.text()).toBe('1')
    }
  })
})