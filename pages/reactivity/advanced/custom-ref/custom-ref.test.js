const PAGE_PATH = '/pages/reactivity/advanced/custom-ref/custom-ref'

describe('customRef', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const stateCount = await page.$('#state-count')
    expect(await stateCount.text()).toBe('0')

    const incrementBtn = await page.$('.increment-btn')
    await incrementBtn.tap()

    expect(await stateCount.text()).toBe('0')

    // TODO: web & ios 暂不支持 triggerRef
    if (process.env.uniTestPlatformInfo.startsWith('android')) {
      const triggerRefBtn = await page.$('.trigger-ref-btn')
      await triggerRefBtn.tap()

      expect(await stateCount.text()).toBe('1')
    }
  })
})