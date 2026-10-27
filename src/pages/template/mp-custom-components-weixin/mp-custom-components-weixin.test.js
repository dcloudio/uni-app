const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMpWeixin = platformInfo === 'mp-weixin'

describe('test mp custom components weixin counter', () => {
  let page

  if (!isMpWeixin) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/mp-custom-components-weixin/mp-custom-components-weixin')
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
