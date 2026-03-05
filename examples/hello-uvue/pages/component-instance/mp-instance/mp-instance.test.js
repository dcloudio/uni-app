const PAGE_PATH = '/pages/component-instance/mp-instance/mp-instance'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
describe('mp-instance', () => {
  if (!isMP) {
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
  
  it('renderer', async () => {
    const mpRendererEle = await page.$('#mp-renderer')
    expect(await mpRendererEle.text()).toBe('webview')
  })
  
})
