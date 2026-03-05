const PAGE_PATH = '/pages/component-instance/refs/refs-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/refs/refs-composition'

describe('$refs', () => {
  let page

  const test = async (path) => {
    page = await program.reLaunch(path)
    await page.waitFor('view')

    const dataInfo = await page.data('dataInfo')
    expect(dataInfo.existRef).toBe(true)
    expect(dataInfo.existChildRef).toBe(true)
    expect(dataInfo.existTextItems).toBe(true)
  }

  it('$refs 选项式 API', async () => {
    await test(PAGE_PATH)
  })

  it('$refs 组合式 API', async () => {
    await test(PAGE_COMPOSITION_PATH)
  })
})
