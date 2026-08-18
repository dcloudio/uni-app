const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/component-instance/methods/call-method-easycom-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/methods/call-method-easycom-composition'

describe('call-method-easycom', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1500)

    const title = Date.now() + ''
    const result = await page.callMethod('callMethodTest', title)
    expect(result).toBe(title)
    const customResult = await page.callMethod('callCustomMethodTest')
    expect(customResult).toBe('custom foo')
    
    const getterAndSetter = await page.$('#getterAndSetter')
    const getterAndSetterText = await getterAndSetter.text()
    expect(getterAndSetterText).toBe(JSON.stringify(isDom2 ? [2, 4] : [2, 4, 6, 8]))
    // 等待 onReady 内 call 方法执行完，避免运行时错误
    await page.waitFor(1500)
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
