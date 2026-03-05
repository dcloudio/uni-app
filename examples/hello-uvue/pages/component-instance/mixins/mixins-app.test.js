const PAGE_PATH = '/pages/component-instance/mixins/mixins-app'
let page

describe('mixins', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.includes('android')
  const isIOS = platformInfo.includes('ios')
  if (!isIOS && !isAndroid) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('inheritAttrs', async () => {
    const comp1RootElementTitleEl = await page.$('.root-element-title-1')
    const comp1RootElementTitleText = await comp1RootElementTitleEl.text()
    expect(comp1RootElementTitleText).toBe('rootElementTitle: null')
    const comp2RootElementTitleEl = await page.$('.root-element-title-2')
    const comp2RootElementTitleText = await comp2RootElementTitleEl.text()
    expect(comp2RootElementTitleText).toBe('rootElementTitle: title')
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

    const MixinCompForComp = await page.$('.component-for-component')
    const MixinCompForCompText = await MixinCompForComp.text()
    expect(MixinCompForCompText).toBe('component for component')
  })
  it('props', async () => {
    const globalMixinProp1 = await page.$('.global-mixin-prop-1')
    const globalMixinProp1Text = await globalMixinProp1.text()
    expect(globalMixinProp1Text).toBe('通过 defineMixin 定义全局 mixin props')

    const globalChildMixinProp1 = await page.$('.global-child-mixin-prop-1')
    const globalChildMixinProp1Text = await globalChildMixinProp1.text()
    expect(globalChildMixinProp1Text).toBe(
      '通过 defineMixin 定义全局 child mixin props'
    )

    const globalMixinProp2 = await page.$('.global-mixin-prop-2')
    const globalMixinProp2Text = await globalMixinProp2.text()
    expect(globalMixinProp2Text).toBe('通过字面量定义全局 mixin props')

    const globalChildMixinProp2 = await page.$('.global-child-mixin-prop-2')
    const globalChildMixinProp2Text = await globalChildMixinProp2.text()
    expect(globalChildMixinProp2Text).toBe(
      '通过字面量定义全局 child mixin props'
    )

    const mixinProp1 = await page.$('.mixin-prop-1')
    const mixinProp1Text = await mixinProp1.text()
    expect(mixinProp1Text).toBe('通过 defineMixin 定义非全局 mixin props')

    const childMixinProp1 = await page.$('.child-mixin-prop-1')
    const childMixinProp1Text = await childMixinProp1.text()
    expect(childMixinProp1Text).toBe(
      '通过 defineMixin 定义非全局 child mixin props'
    )

    const mixinProp2 = await page.$('.mixin-prop-2')
    const mixinProp2Text = await mixinProp2.text()
    expect(mixinProp2Text).toBe('通过字面量定义非全局 mixin props')

    const childMixinProp2 = await page.$('.child-mixin-prop-2')
    const childMixinProp2Text = await childMixinProp2.text()
    expect(childMixinProp2Text).toBe('通过字面量定义非全局 child mixin props')

    const namesakeMixinProp = await page.$('.namesake-mixin-prop')
    const namesakeMixinPropText = await namesakeMixinProp.text()
    expect(namesakeMixinPropText).toBe('通过字面量定义非全局同名 mixin props')

    const namesakeChildMixinProp = await page.$('.namesake-child-mixin-prop')
    const namesakeChildMixinPropText = await namesakeChildMixinProp.text()
    expect(namesakeChildMixinPropText).toBe(
      '通过字面量定义非全局同名 child mixin props'
    )
  })
  it('data', async () => {
    const {
      globalMixinDataMsg1,
      globalChildMixinDataMsg1,
      globalMixinDataMsg2,
      globalChildMixinDataMsg2,
      mixinDataMsg1,
      childMixinDataMsg1,
      mixinDataMsg2,
      childMixinDataMsg2,
      namesakeMixinDataMsg,
      namesakeChildMixinDataMsg,
    } = await page.data()

    expect(globalMixinDataMsg1).toBe('通过 defineMixin 定义全局 mixin data')
    expect(globalChildMixinDataMsg1).toBe(
      '通过 defineMixin 定义全局 child mixin data'
    )
    expect(globalMixinDataMsg2).toBe('通过字面量定义全局 mixin data')
    expect(globalChildMixinDataMsg2).toBe(
      '通过字面量定义全局 child mixin data'
    )

    expect(mixinDataMsg1).toBe('通过 defineMixin 定义非全局 mixin data')
    expect(childMixinDataMsg1).toBe(
      '通过 defineMixin 定义非全局 child mixin data'
    )

    expect(mixinDataMsg2).toBe('通过字面量定义非全局 mixin data')
    expect(childMixinDataMsg2).toBe('通过字面量定义非全局 child mixin data')

    expect(namesakeMixinDataMsg).toBe('通过字面量定义非全局同名 mixin data')
    expect(namesakeChildMixinDataMsg).toBe(
      '通过字面量定义非全局同名 child mixin data'
    )
  })
  it('emits', async () => {
    let handleMixinEmitterMsgEl = await page.$('.handle-mixin-emitter-msg')
    expect(handleMixinEmitterMsgEl).toBeNull()

    const globaMixinEmit1Btn = await page.$('.global-mixin-emit-1')
    await globaMixinEmit1Btn.tap()

    handleMixinEmitterMsgEl = await page.$('.handle-mixin-emitter-msg')

    let handleMixinEmitterMsgText = await handleMixinEmitterMsgEl.text()
    expect(handleMixinEmitterMsgText).toBe(
      'handleMixinEmitterMsg: 触发 globalMixinEmit1, 参数为 globalMixinEmit1'
    )

    const globalChildMixinEmit1Btn = await page.$(
      '.global-child-mixin-emit-1'
    )
    await globalChildMixinEmit1Btn.tap()
    handleMixinEmitterMsgText = await handleMixinEmitterMsgEl.text()
    expect(handleMixinEmitterMsgText).toBe(
      'handleMixinEmitterMsg: 触发 globalChildMixinEmit1, 参数为 globalChildMixinEmit1'
    )

    const globalMixinEmit2Btn = await page.$('.global-mixin-emit-2')
    await globalMixinEmit2Btn.tap()
    handleMixinEmitterMsgText = await handleMixinEmitterMsgEl.text()
    expect(handleMixinEmitterMsgText).toBe(
      'handleMixinEmitterMsg: 触发 globalMixinEmit2, 参数为 globalMixinEmit2'
    )

    const globalChildMixinEmit2Btn = await page.$(
      '.global-child-mixin-emit-2'
    )
    await globalChildMixinEmit2Btn.tap()
    handleMixinEmitterMsgText = await handleMixinEmitterMsgEl.text()
    expect(handleMixinEmitterMsgText).toBe(
      'handleMixinEmitterMsg: 触发 globalChildMixinEmit2, 参数为 globalChildMixinEmit2'
    )

    const mixinEmitBtn = await page.$('.mixin-emit')
    await mixinEmitBtn.tap()
    handleMixinEmitterMsgText = await handleMixinEmitterMsgEl.text()
    expect(handleMixinEmitterMsgText).toBe(
      'handleMixinEmitterMsg: 触发 mixinEmit, 参数为 mixinEmit'
    )

    const childMixinEmitBtn = await page.$('.child-mixin-emit')
    await childMixinEmitBtn.tap()
    handleMixinEmitterMsgText = await handleMixinEmitterMsgEl.text()
    expect(handleMixinEmitterMsgText).toBe(
      'handleMixinEmitterMsg: 触发 childMixinEmit, 参数为 childMixinEmit'
    )
  })
  it('computed', async () => {
    const globalMixinComputedEl1 = await page.$('.global-mixin-computed-1')
    const globalMixinComputedText1 = await globalMixinComputedEl1.text()
    expect(globalMixinComputedText1).toBe(
      '通过 defineMixin 定义全局 mixin computed, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const globalChildMixinComputedEl1 = await page.$(
      '.global-child-mixin-computed-1'
    )
    const globalChildMixinComputedText1 =
      await globalChildMixinComputedEl1.text()
    expect(globalChildMixinComputedText1).toBe(
      '通过 defineMixin 定义全局 child mixin computed, 更新后的 globalChildMixinOnloadMsg1: 通过 defineMixin 定义全局 child mixin onLoad'
    )

    const globalMixinComputedEl2 = await page.$('.global-mixin-computed-2')
    const globalMixinComputedText2 = await globalMixinComputedEl2.text()
    expect(globalMixinComputedText2).toBe(
      '通过字面量定义全局 mixin computed, 更新后的 globalMixinOnloadMsg2: 通过字面量定义全局 mixin onLoad'
    )

    const globalChildMixinComputedEl2 = await page.$(
      '.global-child-mixin-computed-2'
    )
    const globalChildMixinComputedText2 =
      await globalChildMixinComputedEl2.text()
    expect(globalChildMixinComputedText2).toBe(
      '通过字面量定义全局 child mixin computed, 更新后的 globalChildMixinOnloadMsg2: 通过字面量定义全局 child mixin onLoad'
    )

    const mixinComputedEl1 = await page.$('.mixin-computed-1')
    const mixinComputedText1 = await mixinComputedEl1.text()
    expect(mixinComputedText1).toBe(
      '通过 defineMixin 定义非全局 mixin computed, 更新后的 mixinOnloadMsg1: 通过 defineMixin 定义非全局 mixin onLoad'
    )

    const childMixinComputedEl1 = await page.$('.child-mixin-computed-1')
    const childMixinComputedText1 = await childMixinComputedEl1.text()
    expect(childMixinComputedText1).toBe(
      '通过 defineMixin 定义非全局 child mixin computed, 更新后的 childMixinOnloadMsg1: 通过 defineMixin 定义非全局 child mixin onLoad'
    )

    const mixinComputedEl2 = await page.$('.mixin-computed-2')
    const mixinComputedText2 = await mixinComputedEl2.text()
    expect(mixinComputedText2).toBe(
      '通过字面量定义非全局 mixin computed, 更新后的 mixinOnloadMsg2: 通过字面量定义非全局 mixin onLoad'
    )

    const childMixinComputedEl2 = await page.$('.child-mixin-computed-2')
    const childMixinComputedText2 = await childMixinComputedEl2.text()
    expect(childMixinComputedText2).toBe(
      '通过字面量定义非全局 child mixin computed, 更新后的 childMixinOnloadMsg2: 通过字面量定义非全局 child mixin onLoad'
    )

    const namesakeMixinComputedEl = await page.$('.namesake-mixin-computed')
    const namesakeMixinComputedText = await namesakeMixinComputedEl.text()
    expect(namesakeMixinComputedText).toBe(
      '通过字面量定义非全局同名 mixin computed'
    )

    const namesakeChildMixinComputedEl = await page.$(
      '.namesake-child-mixin-computed'
    )
    const namesakeChildMixinComputedText =
      await namesakeChildMixinComputedEl.text()
    expect(namesakeChildMixinComputedText).toBe(
      '通过字面量定义非全局同名 child mixin computed'
    )
  })
  it('watch', async () => {
    const globalMixinWatchEl1 = await page.$('.global-mixin-watch-1')
    const globalMixinWatchText1 = await globalMixinWatchEl1.text()
    expect(globalMixinWatchText1).toBe(
      '通过 defineMixin 定义全局 mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const globalChildMixinWatchEl1 = await page.$(
      '.global-child-mixin-watch-1'
    )
    const globalChildMixinWatchText1 = await globalChildMixinWatchEl1.text()
    expect(globalChildMixinWatchText1).toBe(
      '通过 defineMixin 定义全局 child mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const globalMixinWatchEl2 = await page.$('.global-mixin-watch-2')
    const globalMixinWatchText2 = await globalMixinWatchEl2.text()
    expect(globalMixinWatchText2).toBe(
      '通过字面量定义全局 mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const globalChildMixinWatchEl2 = await page.$(
      '.global-child-mixin-watch-2'
    )
    const globalChildMixinWatchText2 = await globalChildMixinWatchEl2.text()
    expect(globalChildMixinWatchText2).toBe(
      '通过字面量定义全局 child mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const mixinWatchEl1 = await page.$('.mixin-watch-1')
    const mixinWatchText1 = await mixinWatchEl1.text()
    expect(mixinWatchText1).toBe(
      '通过 defineMixin 定义非全局 mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const childMixinWatchEl1 = await page.$('.child-mixin-watch-1')
    const childMixinWatchText1 = await childMixinWatchEl1.text()
    expect(childMixinWatchText1).toBe(
      '通过 defineMixin 定义非全局 child mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const mixinWatchEl2 = await page.$('.mixin-watch-2')
    const mixinWatchText2 = await mixinWatchEl2.text()
    expect(mixinWatchText2).toBe(
      '通过字面量定义非全局 mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const childMixinWatchEl2 = await page.$('.child-mixin-watch-2')
    const childMixinWatchText2 = await childMixinWatchEl2.text()
    expect(childMixinWatchText2).toBe(
      '通过字面量定义非全局 child mixin watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const mixinWatchEl = await page.$('.mixin-watch')
    const mixinWatchText = await mixinWatchEl.text()
    expect(mixinWatchText).toBe(
      '页面内部定义的 watch, 更新后的 globalMixinOnloadMsg1: 通过 defineMixin 定义全局 mixin onLoad'
    )

    const Comp2 = await page.$('.comp2')
    await Comp2.callMethod('changeGlobalMixinOnloadMsg1')
    const mixinWatchMsgEl = await page.$('.mixin-watch-msg')
    const mixinWatchMsgText = await mixinWatchMsgEl.text()
    expect(mixinWatchMsgText).toBe(
      '组件内部定义的 watch, 更新后的 globalMixinOnloadMsg1: new globalMixinOnloadMsg1 changed in comp2'
    )
  })
  it('lifecycle execution sequence', async () => {
    const {
      globalMixinOnloadTime1,
      globalChildMixinOnloadTime1,
      globalMixinOnloadTime2,
      globalChildMixinOnloadTime2,
      mixinOnloadTime1,
      childMixinOnloadTime1,
      mixinOnloadTime2,
      childMixinOnloadTime2,
      mixinOnloadTime,
    } = await page.data()
    expect(globalChildMixinOnloadTime1).toBeLessThanOrEqual(
      globalMixinOnloadTime1
    )
    expect(globalChildMixinOnloadTime2).toBeLessThanOrEqual(
      globalMixinOnloadTime2
    )
    expect(globalMixinOnloadTime1).toBeLessThanOrEqual(childMixinOnloadTime1)
    expect(globalMixinOnloadTime2).toBeLessThanOrEqual(childMixinOnloadTime2)
    expect(childMixinOnloadTime1).toBeLessThanOrEqual(mixinOnloadTime1)
    expect(childMixinOnloadTime2).toBeLessThanOrEqual(mixinOnloadTime2)
    expect(mixinOnloadTime1).toBeLessThanOrEqual(mixinOnloadTime)
    expect(mixinOnloadTime2).toBeLessThanOrEqual(mixinOnloadTime)
  })
  it('methods', async () => {
    const globalMixinMethod1El = await page.$('.global-mixin-method-1')
    const globalMixinMethod1Text = await globalMixinMethod1El.text()
    expect(globalMixinMethod1Text).toBe(
      '通过 defineMixin 定义全局 mixin method'
    )

    const globalChildMixinMethod1El = await page.$(
      '.global-child-mixin-method-1'
    )
    const globalChildMixinMethod1Text = await globalChildMixinMethod1El.text()
    expect(globalChildMixinMethod1Text).toBe(
      '通过 defineMixin 定义全局 child mixin method'
    )

    const globalMixinMethod2El = await page.$('.global-mixin-method-2')
    const globalMixinMethod2Text = await globalMixinMethod2El.text()
    expect(globalMixinMethod2Text).toBe('通过字面量定义全局 mixin method')

    const globalChildMixinMethod2El = await page.$(
      '.global-child-mixin-method-2'
    )
    const globalChildMixinMethod2Text = await globalChildMixinMethod2El.text()
    expect(globalChildMixinMethod2Text).toBe(
      '通过字面量定义全局 child mixin method'
    )

    const mixinMethod1El = await page.$('.mixin-method-1')
    const mixinMethod1Text = await mixinMethod1El.text()
    expect(mixinMethod1Text).toBe('通过 defineMixin 定义非全局 mixin method')

    const childMixinMethod1El = await page.$('.child-mixin-method-1')
    const childMixinMethod1Text = await childMixinMethod1El.text()
    expect(childMixinMethod1Text).toBe(
      '通过 defineMixin 定义非全局 child mixin method'
    )

    const mixinMethod2El = await page.$('.mixin-method-2')
    const mixinMethod2Text = await mixinMethod2El.text()
    expect(mixinMethod2Text).toBe('通过字面量定义非全局 mixin method')

    const childMixinMethod2El = await page.$('.child-mixin-method-2')
    const childMixinMethod2Text = await childMixinMethod2El.text()
    expect(childMixinMethod2Text).toBe(
      '通过字面量定义非全局 child mixin method'
    )

    const namesakeMixinMethodEl = await page.$('.namesake-mixin-method')
    const namesakeMixinMethodText = await namesakeMixinMethodEl.text()
    expect(namesakeMixinMethodText).toBe(
      '通过字面量定义非全局同名 mixin method'
    )

    const namesakeChildMixinMethodEl = await page.$(
      '.namesake-child-mixin-method'
    )
    const namesakeChildMixinMethodText =
      await namesakeChildMixinMethodEl.text()
    expect(namesakeChildMixinMethodText).toBe(
      '通过字面量定义非全局同名 child mixin method'
    )
  })
})
