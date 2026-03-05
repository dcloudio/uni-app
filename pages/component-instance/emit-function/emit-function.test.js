const PAGE_PATH = '/pages/component-instance/emit-function/emit-function-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/emit-function/emit-function-composition'

describe('$emit()', () => {
  const test = async (path) => {
    const page = await program.reLaunch(path)
    await page.waitFor('view')
    const valueText = await page.$('#value')
    const beforeValue = await valueText.text()

    const btn = await page.$('.call-parent-btn')
    await btn.tap()
    await page.waitFor(500)

    const afterValue = await valueText.text()
    expect(beforeValue).not.toBe(afterValue)
  }
  it('$emit() 选项式 API 事件生效', async () => {
    await test(PAGE_PATH)
  })

  it('$emit() 组合式 API 事件生效', async () => {
    await test(PAGE_COMPOSITION_PATH)
  })
})