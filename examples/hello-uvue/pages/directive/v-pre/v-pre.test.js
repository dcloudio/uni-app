const PAGE_PATH = '/pages/directive/v-pre/v-pre'

describe('v-pre', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  if (isMP) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }
  it('basic', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')

    const vPreTextEl = await page.$('.v-pre-text')
    let vPreTextText = await vPreTextEl.text()
    expect(vPreTextText).toBe('{{ this will not be compiled }}')
  })
})
