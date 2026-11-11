const PAGE_PATH = '/pages/API/uri-encode/uri-encode'

describe('encodeURI / decodeURI / encodeURIComponent / decodeURIComponent', () => {
  let page = null
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('encodeURI / encodeURIComponent', async () => {
    await page.callMethod('testEncodeURI')
    await page.callMethod('testEncodeURIComponent')
    const data = await page.data('data')
    expect(data.encodeURIResult).toBe('%E4%BD%A0%E5%A5%BD;/=+22%20uni-app%20x')
    expect(data.encodeURIComponentResult).toBe('%E4%BD%A0%E5%A5%BD%3B%2F%3D%2B22%20uni-app%20x')
  })

  it('decodeURI / decodeURIComponent', async () => {
    await page.callMethod('testDecodeURI')
    await page.callMethod('testDecodeURIComponent')
    const data = await page.data('data')
    expect(data.decodeURIResult).toBe('你好;/=+22 uni-app x')
    expect(data.decodeURIComponentResult).toBe('你好;/=+22 uni-app x')
  })

  it('invalid sequence', async () => {
    await page.callMethod('testInvalidDecode')
    const data = await page.data('data')
    expect(data.invalidResult).toContain('异常')
  })
})
