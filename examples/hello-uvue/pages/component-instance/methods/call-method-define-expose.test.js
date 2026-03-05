const PAGE_PATH = '/pages/component-instance/methods/call-method-define-expose'

describe('call-method-define-expose', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('callMethodTest', async () => {
    const result = await page.callMethod('callMethod')
    expect(result).toBe(`call defineExpose method res`)
  })
})