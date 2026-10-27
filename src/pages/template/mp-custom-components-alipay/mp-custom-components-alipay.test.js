const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMpAlipay = platformInfo === 'mp-alipay'

describe('test mp custom components alipay counter', () => {
  let page

  if (!isMpAlipay) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeEach(async () => {
    page = await program.reLaunch('/pages/template/mp-custom-components-alipay/mp-custom-components-alipay')
    await page.waitFor('view')
    await page.waitFor(1000)
  })

  it('handles change details through the exposed page method', async () => {
    expect(await page.data('data.count')).toBe(4)
    expect(await page.data('data.changeCount')).toBe(0)

    await page.callMethod('increment')
    await page.waitFor(200)
    expect(await page.data('data.count')).toBe(6)
    expect(await page.data('data.changeCount')).toBe(1)

    await page.callMethod('decrement')
    await page.waitFor(200)
    expect(await page.data('data.count')).toBe(4)
    expect(await page.data('data.changeCount')).toBe(2)
  })
})
