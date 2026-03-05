const PAGE_PATH = '/pages/component-instance/methods/call-method-uni-element-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/methods/call-method-uni-element-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('call-method-uni-element', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  
  let page

  it('callMethodTest Options API', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
    const title = Date.now() + ''
    const result = await page.callMethod('callMethodTest', title)
    expect(result).toBe(title)
  })

  it('callMethodTest Composition API', async () => {
    page = await program.reLaunch(PAGE_COMPOSITION_PATH)
    await page.waitFor(500)
    const title = Date.now() + ''
    const result = await page.callMethod('callMethodTest', title)
    expect(result).toBe(title)
  })
})
