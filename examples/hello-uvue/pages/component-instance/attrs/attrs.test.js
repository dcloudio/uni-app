const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')

const OPTIONS_PAGE_PATH = '/pages/component-instance/attrs/attrs-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/attrs/attrs-composition'

describe('$attrs', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')

  const test = async (pagePath) => {
    if (isAndroid && platformInfo.indexOf('14') > -1) {
      expect(1).toBe(1)
      return
    }

    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(1000)

    const child = await page.$('.child-class')

    const hasPropsAttr = await child.$('#has-props-attr')
    expect(await hasPropsAttr.text()).toBe('false')
    const hasEmitsAttr = await child.$('#has-emits-attr')
    expect(await hasEmitsAttr.text()).toBe('false')
    if(!isMP) {
      const hasClassAttr = await child.$('#has-class-attr')
      expect(await hasClassAttr.text()).toBe('true')
    }
    // #region 节点 attr 继承
    const image = await program.screenshot({
    	fullPage: true
    });
    expect(image).toSaveImageSnapshot();
    // #endregion
  }

  if (!isDom2) {
    it('$attrs options API', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }

  it('useAttrs composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
