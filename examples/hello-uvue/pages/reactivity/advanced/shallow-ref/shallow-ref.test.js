const PAGE_PATH = '/pages/reactivity/advanced/shallow-ref/shallow-ref'

describe('shallowRef', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const stateCount = await page.$('#state-count')
    expect(await stateCount.text()).toBe('0')

    const incrementStateCountBtn = await page.$('#increment-state-count-btn')
    await incrementStateCountBtn.tap()

    expect(await stateCount.text()).toBe('0')

    const updateStateBtn = await page.$('#update-state-btn')
    await updateStateBtn.tap()
    await page.waitFor(500)

    expect(await stateCount.text()).toBe('1')
  })
})