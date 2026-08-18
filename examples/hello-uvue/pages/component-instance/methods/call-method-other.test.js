const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/component-instance/methods/call-method-other-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/methods/call-method-other-composition'

describe('call-method-other', () => {
  const test = async (pagePath, pageType) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1500)

    const title = Date.now() + ''
    const result = await page.callMethod('callMethodTest', title)
    expect(result).toBe(title)
    
    let res = await page.callMethod('callMethodFooWithDefaultParameter')
    expect(res).toBe(10)
    
    if (pageType === 'options') {
      res = await page.callMethod('callMethodFooWithGenericParameter')
      expect(res).toBe(10)
    }
    
    res = await page.callMethod('callMethodFooWithRestParameter')
    expect(res).toBe(JSON.stringify(["test", 10, 11]))
    // 等待 onReady 内 call 方法执行完，避免运行时错误
    await page.waitFor(1500)
  }

  if (!isDom2) {
    it('callMethodTest Options API', async () => {
      await test(PAGE_PATH, 'options')
    })
  }

  it('callMethodTest Composition API', async () => {
    await test(PAGE_COMPOSITION_PATH, 'composition')
  })
})
