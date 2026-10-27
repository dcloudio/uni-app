const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isApp = platformInfo.startsWith('android') || platformInfo.startsWith('ios') || platformInfo.startsWith('harmony')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isSupported = isWeb || (isApp && isVapor)
const hbuilderxVersion = (process.env.HX_Version || '').match(/^(\d+\.\d+)/)
const supportsCalcAnimation = hbuilderxVersion != null && parseFloat(hbuilderxVersion[1]) >= 5.27

describe('/pages/CSS/animation/animation.uvue', () => {
  if (!isSupported) {
    it('web or app vapor only', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/animation/animation')
    await page.waitFor('view')
  })

  it('supports explicit main animation controls', async () => {
    await page.callMethod('startAnimate')
    expect(await page.data('data.mainAnimationState')).toEqual('running')

    await page.callMethod('pauseAnimate')
    expect(await page.data('data.mainAnimationState')).toEqual('paused')

    await page.callMethod('resumeAnimate')
    expect(await page.data('data.mainAnimationState')).toEqual('running')

    await page.callMethod('cancelAnimate')
    expect(await page.data('data.mainAnimationState')).toEqual('')
    expect(await page.data('data.testTriggerCancelEvent')).toEqual(true)
  })

  it('reports main animation completion', async () => {
    await page.callMethod('startAnimate')
    await page.waitFor(5200)
    expect(await page.data('data.mainAnimationState')).toEqual('finished')
    expect(await page.data('data.testTriggerFinishEvent')).toEqual(true)
  })

  it('runs every property animation and takes a full-page snapshot', async () => {
    const animations = [
      ['#widthProperty', 'data.widthAnimationState'],
      ['#height1', 'data.heightAnimationState'],
      ['#marginProperty', 'data.marginAnimationState'],
      ['#paddingProperty', 'data.paddingAnimationState'],
      ['#borderProperty', 'data.borderAnimationState'],
      ['#transformProperty', 'data.transformAnimationState'],
      ['#positionProperty', 'data.positionAnimationState'],
      ['#backgroundAndWidthProperty', 'data.backgroundWidthAnimationState'],
      ['#oneProperty1', 'data.onePropertyOneAnimationState'],
      ['#oneProperty2', 'data.onePropertyTwoAnimationState'],
      ['#backgroundAndMarginLeftProperty', 'data.backgroundMarginAnimationState'],
      ['#backgroundAndTransformProperty', 'data.backgroundTransformAnimationState'],
      ['#backgroundProperty', 'data.backgroundAnimationState'],
      ['#opacityProperty', 'data.opacityAnimationState'],
      ['#borderColorMarginLeftProperty', 'data.borderMarginAnimationState'],
      ['#cssVariableProperty', 'data.cssVariableAnimationState']
    ]

    if (supportsCalcAnimation) {
      animations.push(['#calcProperty', 'data.calcAnimationState'])
    }

    for (const animation of animations) {
      const element = await page.$(animation[0])
      expect(element).not.toBeNull()
      await element.tap()
    }

    await page.waitFor(1200)

    const animationEndStates = []
    for (const animation of animations) {
      animationEndStates.push(await page.data(animation[1]))
    }
    expect(animationEndStates).toEqual(animations.map(() => 'finished'))

    await page.callMethod('stopRollAnimation')
    expect(await page.data('data.rollAnimationState')).toEqual('stopped')

    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
  })
})
