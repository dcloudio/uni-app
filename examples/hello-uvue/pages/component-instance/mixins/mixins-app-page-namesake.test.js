const PAGE_PATH = '/pages/component-instance/mixins/mixins-app-page-namesake'

describe('mixins-page-namesake', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.includes('android')
  const isIOS = platformInfo.includes('ios')
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')
  if (!isIOS && !isAndroid) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('components', async () => {
    const GlobalMixinComp1 = await page.$('.global-mixin-component-1')
    const GlobalMixinComp1Text = await GlobalMixinComp1.text()
    expect(GlobalMixinComp1Text).toBe('global mixin component 1')

    const GlobalChildMixinComp1 = await page.$(
      '.global-child-mixin-component-1'
    )
    const GlobalChildMixinComp1Text = await GlobalChildMixinComp1.text()
    expect(GlobalChildMixinComp1Text).toBe('global child mixin component 1')

    const GlobalMixinComp2 = await page.$('.global-mixin-component-2')
    const GlobalMixinComp2Text = await GlobalMixinComp2.text()
    expect(GlobalMixinComp2Text).toBe('global mixin component 2')

    const GlobalChildMixinComp2 = await page.$(
      '.global-child-mixin-component-2'
    )
    const GlobalChildMixinComp2Text = await GlobalChildMixinComp2.text()
    expect(GlobalChildMixinComp2Text).toBe('global child mixin component 2')

    const MixinComp1 = await page.$('.mixin-component-1')
    const MixinComp1Text = await MixinComp1.text()
    expect(MixinComp1Text).toBe('mixin component 1')

    const ChildMixinComp1 = await page.$('.child-mixin-component-1')
    const ChildMixinComp1Text = await ChildMixinComp1.text()
    expect(ChildMixinComp1Text).toBe('child mixin component 1')

    const MixinComp2 = await page.$('.mixin-component-2')
    const MixinComp2Text = await MixinComp2.text()
    expect(MixinComp2Text).toBe('mixin component 2')

    const ChildMixinComp2 = await page.$('.child-mixin-component-2')
    const ChildMixinComp2Text = await ChildMixinComp2.text()
    expect(ChildMixinComp2Text).toBe('child mixin component 2')

    const MixinCompForPage = await page.$('.component-for-page')
    const MixinCompForPageText = await MixinCompForPage.text()
    expect(MixinCompForPageText).toBe('component for page')
  })
  it('props', async () => {
    const namesakeMixinProp = await page.$('.namesake-mixin-prop')
    const namesakeMixinPropText = await namesakeMixinProp.text()
    expect(namesakeMixinPropText).toBe('页面内的同名 props')

    const namesakeChildMixinProp = await page.$('.namesake-child-mixin-prop')
    const namesakeChildMixinPropText = await namesakeChildMixinProp.text()
    expect(namesakeChildMixinPropText).toBe('页面内的同名 child props')
  })
  it('data', async () => {
    const namesakeMixinDataMsgEl = await page.$('.namesake-mixin-data-msg')
    const namesakeMixinDataMsg = await namesakeMixinDataMsgEl.text()
    expect(namesakeMixinDataMsg).toBe('页面内的同名 data')

    const namesakeChildMixinDataMsgEl = await page.$(
      '.namesake-child-mixin-data-msg'
    )
    const namesakeChildMixinDataMsg = await namesakeChildMixinDataMsgEl.text()
    expect(namesakeChildMixinDataMsg).toBe('页面内的同名 child data')
  })
  it('computed', async () => {
    const namesakeMixinComputed = await page.$('.namesake-mixin-computed')
    const namesakeMixinComputedText = await namesakeMixinComputed.text()
    expect(namesakeMixinComputedText).toBe('页面内的同名 computed')

    const namesakeChildMixinComputed = await page.$(
      '.namesake-child-mixin-computed'
    )
    const namesakeChildMixinComputedText =
      await namesakeChildMixinComputed.text()
    expect(namesakeChildMixinComputedText).toBe('页面内的同名 child computed')
  })
  it('method', async () => {
    const namesakeMixinMethod = await page.$('.namesake-mixin-method')
    const namesakeMixinMethodText = await namesakeMixinMethod.text()
    expect(namesakeMixinMethodText).toBe('页面内的同名 method')

    const namesakeChildMixinMethod = await page.$(
      '.namesake-child-mixin-method'
    )
    const namesakeChildMixinMethodText = await namesakeChildMixinMethod.text()
    expect(namesakeChildMixinMethodText).toBe('页面内的同名 child method')
  })
})
