const PAGE_PATH = '/pages/API/create-worker/worker-sendable'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')

describe('Api-uts-worker-sendable', () => {
  if (!isHarmony) {
    it('skip worker-sendable test', async () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
  })

  it('creates SendableObject in worker', async () => {
    await page.callMethod('create')
    await page.waitFor(500)
    await page.callMethod('sendMessage')
    await page.waitFor(500)
    expect(await page.data('data.sendableNumber')).toBe(666)
    await page.callMethod('modifySendable')
    expect(await page.data('data.sendableNumber')).toBe(888)
  })
})
