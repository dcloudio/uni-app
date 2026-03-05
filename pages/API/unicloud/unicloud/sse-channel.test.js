const PAGE_PATH = '/pages/API/unicloud/unicloud/sse-channel'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('sse-channel', () => {
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
  })
  if(!isMP && !isWeb) {
    // 需要自定义基座方可使用push
    it('skip test', () => {
      expect(1).toBe(1)
    })
    return
  }

  it('basic', async () => {
    await page.callMethod('receiveMessage')
    await page.waitFor(5000)
    const messages = await page.data('data.messages')
    expect(messages.length).toBe(2)
  })
});
