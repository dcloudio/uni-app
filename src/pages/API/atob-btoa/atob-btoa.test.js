const PAGE_PATH = '/pages/API/atob-btoa/atob-btoa'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')

describe('atob / btoa', () => {
  if (isMP || isHarmony) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('btoa', async () => {
    await page.callMethod('testBtoa')
    const data = await page.data('data')
    expect(data.btoaResult).toBe('aGVsbG8gdW5pLWFwcCB4')
  })

  it('atob', async () => {
    await page.callMethod('testAtob')
    const data = await page.data('data')
    expect(data.atobResult).toBe('hello uni-app x')
  })

  it('TextEncoder + btoa / atob + TextDecoder', async () => {
    await page.callMethod('testUtf8Combination')
    const data = await page.data('data')
    expect(data.utf8B64Result.indexOf('5L2g5aW9')).toBe(0)
    expect(data.utf8RoundTrip).toBe('你好 uni-app x')
    expect(data.utf8RoundTripOk).toBe(true)
  })

  it('invalid base64', async () => {
    await page.callMethod('testInvalidAtob')
    const data = await page.data('data')
    expect(data.invalidResult.length).toBeGreaterThan(0)
    expect(data.invalidResult).not.toBe('未抛出异常')
  })
})
