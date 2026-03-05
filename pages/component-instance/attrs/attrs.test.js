const OPTIONS_PAGE_PATH = '/pages/component-instance/attrs/attrs-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/attrs/attrs-composition'

describe('$attrs', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1000)
    const hasPropsAttr = await page.$('#has-props-attr')
    expect(await hasPropsAttr.text()).toBe('false')
    const hasEmitsAttr = await page.$('#has-emits-attr')
    expect(await hasEmitsAttr.text()).toBe('false')
    if(!isMP) {
      const hasClassAttr = await page.$('#has-class-attr')
      expect(await hasClassAttr.text()).toBe('true')
    }
  }
  
  it('$attrs options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('useAttrs composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
