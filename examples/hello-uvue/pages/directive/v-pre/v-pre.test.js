const PAGE_PATH = '/pages/directive/v-pre/v-pre'

describe('v-pre', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  if (isMP) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const vPreTextEl = await page.$('.v-pre-text')
    let vPreTextText = await vPreTextEl.text()
    expect(vPreTextText).toBe('{{ this will not be compiled }}')
  })
})
