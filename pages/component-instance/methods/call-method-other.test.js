const PAGE_PATH = '/pages/component-instance/methods/call-method-other-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/methods/call-method-other-composition'

describe('call-method-other', () => {
  let page

  it('callMethodTest Options API', async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
    const title = Date.now() + ''
    const result = await page.callMethod('callMethodTest', title)
    expect(result).toBe(title)
    
    let res = await page.callMethod('callMethodFooWithDefaultParameter')
    expect(res).toBe(10)
    
    res = await page.callMethod('callMethodFooWithGenericParameter')
    expect(res).toBe(10)
    
    res = await page.callMethod('callMethodFooWithRestParameter')
    expect(res).toBe(JSON.stringify(["test", 10, 11]))
  })

  it('callMethodTest Composition API', async () => {
    page = await program.reLaunch(PAGE_COMPOSITION_PATH)
    await page.waitFor(500)
    const title = Date.now() + ''
    const result = await page.callMethod('callMethodTest', title)
    expect(result).toBe(title)
    
    let res = await page.callMethod('callMethodFooWithDefaultParameter')
    expect(res).toBe(10)

    res = await page.callMethod('callMethodFooWithRestParameter')
    expect(res).toBe(JSON.stringify(["test", 10, 11]))
  })
})
