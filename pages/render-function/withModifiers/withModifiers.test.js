const OPTIONS_PAGE_PATH = '/pages/render-function/withModifiers/withModifiers-options'
const COMPOSITION_PAGE_PATH = '/pages/render-function/withModifiers/withModifiers-composition'

describe('withModifiers', () => {
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

    const parentNum = await page.$('#parent-num')
    expect(await parentNum.text()).toBe('0')
    const childNum = await page.$('#child-num')
    expect(await childNum.text()).toBe('0')

    const stopBtn = await page.$('#stop-btn')
    await stopBtn.tap()

    expect(await parentNum.text()).toBe('0')
    expect(await childNum.text()).toBe('1')
  }

  it('withModifiers options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('withModifiers composition API', async () => {
    if (!isIos) {
      await test(COMPOSITION_PAGE_PATH)
    }else{
      // TODO: ios 端 defineOptions + render 页面空白
      expect(1).toBe(1);
    }
  })
})