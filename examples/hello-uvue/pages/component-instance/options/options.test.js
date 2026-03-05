const OPTIONS_PAGE_PATH = '/pages/component-instance/options/options-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/options/options-composition'

describe('$options', () => {
  let page
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.includes('android')
  const test = async (page) => {
    const dataInfo = await page.data('dataInfo')
    expect(dataInfo.name).toBe('$options')
    if (!isAndroid) {
      expect(dataInfo.customKey).toBe('custom key')
      expect(dataInfo.mixinDataStr).toBe('str in mixin data')
    }
  }

  it('$options 选项式 API', async () => {
    page = await program.reLaunch(OPTIONS_PAGE_PATH)
    await page.waitFor('view')
    
    await test(page)
  });

  it('$options 组合式 API', async () => {
    page = await program.reLaunch(COMPOSITION_PAGE_PATH)
    await page.waitFor('view')
    
    await test(page)
  })
})
