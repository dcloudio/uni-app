const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const PAGE_PATH = '/pages/API/base64/base64'

describe('base64', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });

  it('arrayBufferToBase64', async () => {
    await page.callMethod('arrayBufferToBase64')
    await page.waitFor(200)
    const data = await page.data('data')
    expect(data.arrayBufferToBase64Res).toEqual('CxYh')
  })
  if (isIOS) {
    return
  }
  it('base64ToArrayBuffer', async () => {
    await page.callMethod('base64ToArrayBuffer')
    await page.waitFor(200)
    const data = await page.data('data')
    expect(data.base64ToArrayBufferRes).toEqual('11,22,33')
    await page.waitFor(3000)
  })
})
