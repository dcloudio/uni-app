const PAGE_PATH = '/pages/reactivity/advanced/trigger-ref/trigger-ref'

describe('triggerRef', () => {
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
    await page.waitFor(500)

    expect(await stateCount.text()).toBe('0')

    const triggerRefStateBtn = await page.$('#trigger-ref-state-btn')
    await triggerRefStateBtn.tap()
    await page.waitFor(500)

    expect(await stateCount.text()).toBe('1')
  })
})