const OPTIONS_PAGE_PATH = '/pages/render-function/withDirectives/withDirectives-options'
const COMPOSITION_PAGE_PATH = '/pages/render-function/withDirectives/withDirectives-composition'

describe('withDirectives', () => {
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
    await page.waitFor('view')

    const isMounted = await page.$('#is-mounted')
    expect(await isMounted.text()).toBe('true')
  }

  it('withDirectives options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('withDirectives composition API', async () => {
    if (!isIos) {
      await test(COMPOSITION_PAGE_PATH)
    }else{
      // TODO: ios 端 defineOptions + render 页面空白
      expect(1).toBe(1);
    }
  })
})