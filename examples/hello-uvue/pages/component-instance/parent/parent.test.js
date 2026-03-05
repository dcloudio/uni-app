const OPTIONS_PAGE_PATH = '/pages/component-instance/parent/parent-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/parent/parent-composition'

describe('$parent', () => {
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(500)
    const parentStr = await page.$('#parent-str')
    expect(await parentStr.text()).toBe('parent str')
    
    const parentNum = await page.$('#parent-num')
    expect(await parentNum.text()).toBe('0')
    
    const triggerParentFnBtn = await page.$('#trigger-parent-fn')
    await triggerParentFnBtn.tap()
    await page.waitFor(500)
    expect(await parentNum.text()).toBe('1')
  }
  
  it('$parent 选项式 API', async () => {
    await test(OPTIONS_PAGE_PATH)
  });
  
  it('$parent 组合式 API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
