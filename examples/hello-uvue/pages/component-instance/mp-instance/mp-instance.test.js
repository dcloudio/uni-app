const PAGE_PATH = '/pages/component-instance/mp-instance/mp-instance'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
describe('mp-instance', () => {
  if (!isMP) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }
  
  it('renderer', async () => {
    const page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')

    const mpRendererEle = await page.$('#mp-renderer')
    expect(await mpRendererEle.text()).toBe('webview')
  })
  
})
