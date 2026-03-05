const OPTIONS_PAGE_PATH = '/pages/render-function/resolveComponent/resolveComponent-options'
const COMPOSITION_PAGE_PATH = '/pages/render-function/resolveComponent/resolveComponent-composition'

describe('resolveComponent', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isIos = platformInfo.startsWith('ios')
  const isMP = platformInfo.startsWith('mp')
  if (isWeb || isMP) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }

  let page = null
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('text')

    const bold = await page.$('.bold')
    expect(await bold.text()).toBe('component for app.component')
  }

  it('resolveComponent options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('resolveComponent composition API', async () => {
    if (!isIos) {
      await test(COMPOSITION_PAGE_PATH)
    } else {
      // TODO: ios 端 defineOptions + render 页面空白
      expect(1).toBe(1);
    }
  })
})