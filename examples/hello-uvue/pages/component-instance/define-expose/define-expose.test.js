const PAGE_PATH = '/pages/component-instance/define-expose/define-expose'

describe('defineExpose', () => {
  let page = null
  
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  
  it('basic', async () => {
    const fooStr = await page.$('#foo-str')
    expect(await fooStr.text()).toBe('foo str')
    const fooNum = await page.$('#foo-num')
    expect(await fooNum.text()).toBe('0')

    const incrementBtn = await page.$('.increment-btn')
    await incrementBtn.tap()
    await page.waitFor(100)
    expect(await fooNum.text()).toBe('1')
  })
})