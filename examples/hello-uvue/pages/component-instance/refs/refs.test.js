const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/component-instance/refs/refs-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/refs/refs-composition'

describe('$refs', () => {
  const test = async (path) => {
    const page = await program.reLaunch(path)
    await page.waitFor('view')

    const dataInfo = await page.data('dataInfo')
    expect(dataInfo.existRef).toBe(true)
    expect(dataInfo.existChildRef).toBe(true)
    expect(dataInfo.existTextItems).toBe(true)
  }

  if (!isDom2) {
    it('$refs 选项式 API', async () => {
      await test(PAGE_PATH)
    })
  }

  it('$refs 组合式 API', async () => {
    await test(PAGE_COMPOSITION_PATH)
  })
})
