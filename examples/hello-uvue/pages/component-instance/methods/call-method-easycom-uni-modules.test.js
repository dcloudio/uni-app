const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/component-instance/methods/call-method-easycom-uni-modules-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/methods/call-method-easycom-uni-modules-composition'

describe('call-method-easycom-uni-modules', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(500)

    const title1 = Date.now() + ''
    const result1 = await page.callMethod('callMethodTest', title1)
    expect(result1).toBe(title1)
  
    const title2 = Date.now() + ''
    const result2 = await page.callMethod('callMethodInOtherFile', title2)
    expect(result2).toBe(title2)

    // 等待 onReady 内 call 方法执行完，避免运行时错误
    await page.waitFor(3000)
  }

  if (!isDom2) {
    it('call-method-easycom-uni-modules Options API', async () => {
      await test(PAGE_PATH)
    })
  }

  it('call-method-easycom-uni-modules Composition API', async () => {
    await test(PAGE_COMPOSITION_PATH)
  })
})
