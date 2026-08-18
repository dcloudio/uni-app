const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/component-instance/options/options-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/options/options-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.includes('android')

describe('$options', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const dataInfo = await page.data('dataInfo')
    expect(dataInfo.name).toBe('$options')
    if (!isAndroid || isDom2) {
      expect(dataInfo.customKey).toBe('custom key')
      if (!isDom2) {
        expect(dataInfo.mixinDataStr).toBe('str in mixin data')
      }
    }
  }

  if (!isDom2) {
    it('$options 选项式 API', async () => {
      await test(OPTIONS_PAGE_PATH)
    });
  }

  it('$options 组合式 API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
