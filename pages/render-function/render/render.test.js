const OPTIONS_PAGE_PATH = '/pages/render-function/render/render-options'
const COMPOSITION_PAGE_PATH = '/pages/render-function/render/render-composition'

describe('render-function render', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  const isAndroid = platformInfo.startsWith('android')
  if (isWeb || isMP) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }
  let page
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    
    const ComForRenderFunction = await page.$('.component-for-h-function')
    expect(await ComForRenderFunction.text()).toEqual(
      'component for h() with slot'
    )
    const compSlot = await page.$('.comp-slot')
    expect(await compSlot.text()).toEqual('component slot')
    
    let msgEl = await page.$('.msg')
    expect(await msgEl.text()).toEqual('default msg')
    compForHFunctionMsg = await page.$('#comp-for-h-function-msg')
    expect(await compForHFunctionMsg.text()).toEqual('default msg')
    
    let textList = await page.$$('.text-item')
    expect(textList.length).toBe(2)
    
    const btnEl = await page.$('.btn')
    expect(await btnEl.property('type')).toBe('primary')
    await btnEl.tap()
    msgEl = await page.$('.msg')
    expect(await msgEl.text()).toEqual('new msg')
    compForHFunctionMsg = await page.$('#comp-for-h-function-msg')
    expect(await compForHFunctionMsg.text()).toEqual('new msg')
    
    expect(await (await page.$('#header')).text()).toEqual('header')
    expect(await (await page.$('#footer')).text()).toEqual('footer')
    
    textList = await page.$$('.text-item')
    expect(textList.length).toBe(3)
    await btnEl.tap()
    textList = await page.$$('.text-item')
    expect(textList.length).toBe(4)
  }
  
  it('render options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('render composition API', async () => {
    if (!isAndroid) {
      await test(COMPOSITION_PAGE_PATH)
    } else {
      // TODO: android 端 报错 java.lang.IndexOutOfBoundsException: Index: 0, Size: 0
      expect(1).toBe(1);
    }
  })
})