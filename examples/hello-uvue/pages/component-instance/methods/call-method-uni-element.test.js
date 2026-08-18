const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

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
  
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(500)

    if (!isDom2) {
      const title = Date.now() + ''
      const result = await page.callMethod('callMethodTest', title)
      expect(result).toBe(title)
    }
  }

  if (!isDom2) {
    it('callMethodTest Options API', async () => {
      await test(PAGE_PATH)
    })
  }

  it('callMethodTest Composition API', async () => {
    await test(PAGE_COMPOSITION_PATH)
  })
})
