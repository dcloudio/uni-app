const OPTIONS_PAGE_PATH = '/pages/component-instance/el/el-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/el/el-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('$el', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  const test = async (page) => {
    const el = await page.$('.tag-name')
    expect(await el.text()).toBe('VIEW')
  }
  it('$el 选项式 API', async () => {
    page = await program.reLaunch(OPTIONS_PAGE_PATH)
    await page.waitFor('view')
    
    await test(page)
  });

  it('$el 组合式 API', async () => {
    page = await program.reLaunch(COMPOSITION_PAGE_PATH)
    await page.waitFor('view')
    
    await test(page)
  })


})
