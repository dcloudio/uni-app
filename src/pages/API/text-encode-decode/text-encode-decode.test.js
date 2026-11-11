const PAGE_PATH = '/pages/API/text-encode-decode/text-encode-decode'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isIos = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')

describe('TextEncoder / TextDecoder', () => {
  if (isMP) {
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

  it('encode + decode round trip', async () => {
    await page.callMethod('testEncodeDecode')
    const data = await page.data('data')
    expect(data.encoding).toBe('utf-8')
    expect(data.encodedBytes).toBe('104,101,108,108,111,32,117,110,105,45,97,112,112,32,120,32,228,189,160,229,165,189')
    expect(data.byteLength).toBe(22)
    expect(data.decodedText).toBe('hello uni-app x 你好')
    expect(data.roundTripOk).toBe(true)
  })

  it('gbk decode', async () => {
    await page.callMethod('testGbkDecode')
    const data = await page.data('data')
    if (isWeb) {
      expect(data.gbkResult).toContain('U+20BB7')
      expect(data.gbkResult).toContain('gbk: U+')
    } else {
      expect(data.gbkResult).toContain('不支持 gbk')
    }
  })

  if (isIos) {
    it('decode(DataView) not support on iOS', async () => {
      await page.callMethod('testDataViewDecode')
      const data = await page.data('data')
      expect(data.dataViewResult).toBe('当前平台不支持 decode(DataView)')
    })
  } else {
    it('decode(DataView)', async () => {
      await page.callMethod('testDataViewDecode')
      const data = await page.data('data')
      expect(data.dataViewResult).toContain('U+20BB7')
    })
  }
})
