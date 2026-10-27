const PAGE_PATH = '/pages/API/connect-event-source/connect-event-source'

describe('sse', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isIOS = platformInfo.startsWith('ios')
  if (!(isAndroid || isIOS)) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });

  it('sse_open', async () => {
    await page.callMethod('connect')
    await page.waitFor(2500)

    expect(await page.data('data.open')).toBe(true)
    expect(await page.data('data.receiveMessage')).toBe(true)
    await page.callMethod('close')
  })
})
