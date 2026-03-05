const PAGE_PATH = '/pages/component-instance/methods/call-method-easycom-uni-modules-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/methods/call-method-easycom-uni-modules-composition'

describe('call-method-easycom-uni-modules', () => {
  let page
  describe('Options API', () => {
    beforeAll(async () => {
      page = await program.reLaunch(PAGE_PATH)
      await page.waitFor(500)
    })
    it('callMethodTest Options API', async () => {
      const title = Date.now() + ''
      const result = await page.callMethod('callMethodTest', title)
      expect(result).toBe(title)
    })
    it('callMethodInOtherFile Options API', async () => {
      const title = Date.now() + ''
      const result = await page.callMethod('callMethodInOtherFile', title)
      expect(result).toBe(title)
    })
  })

  describe('Composition API', () => {
    beforeAll(async () => {
      page = await program.reLaunch(PAGE_COMPOSITION_PATH)
      await page.waitFor(500)
    })
    it('callMethodTest Composition API', async () => {
      const title = Date.now() + ''
      const result = await page.callMethod('callMethodTest', title)
      expect(result).toBe(title)
    })
    it('callMethodInOtherFile Composition API', async () => {
      const title = Date.now() + ''
      const result = await page.callMethod('callMethodInOtherFile', title)
      expect(result).toBe(title)
    })
  })
})
