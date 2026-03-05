const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')

const PAGE_PATH = '/pages/component/global-events/issue-25381'

describe('issue-25381-test', () => {

  if (isWeb || isMP || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
  })

  it('issue-25381', async () => {
    await page.waitFor(1000);
    const data = await page.data('data')
    console.log("ret:", data.ret1)
    expect(data.ret1).toBe(true)
  })
})
