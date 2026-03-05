const PAGE_PATH = '/pages/API/connect-event-source/connect-event-source'

describe('sse', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isWeb = platformInfo.startsWith('web')
  const isIOS = platformInfo.startsWith('ios')
  if (!isAndroid || !isIOS) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
  });

  it('sse_open', async () => {
    await page.callMethod('connect')
    await page.waitFor(2000)
    const data = await page.data('data')
    expect(data.open).toBe(true)
    await page.waitFor(500)
    expect(data.receiveMessage).toBe(true)
  })
})
