const PAGE_PATH = '/pages/reactivity/advanced/effect-scope/effect-scope'

describe('effectScope', () => {
  let page = null
  const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isIos = platformInfo.startsWith('ios')
  const isWeb = platformInfo.startsWith('web')
    
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })
  it('basic', async () => {
    const counter = await page.$('#counter')
    expect(await counter.text()).toBe('0')

    const watchCounterRes = await page.$('#watch-counter-res')
    if(isAndroid || isWeb){
      expect(await watchCounterRes.text()).toBe('')
    }
    if(isIos){
      expect(await watchCounterRes.text()).toBe(null)
    }

    const watchEffectCounterRes = await page.$('#watch-effect-counter-res')
    expect(await watchEffectCounterRes.text()).toBe('counter: 0')

    const incrementCounterBtn = await page.$('#increment-counter-btn')
    await incrementCounterBtn.tap()
    await page.waitFor(500)

    expect(await counter.text()).toBe('1')
    expect(await watchCounterRes.text()).toBe('newVal: 1, oldVal: 0')
    expect(await watchEffectCounterRes.text()).toBe('counter: 1')

    const stopEffectScopeBtn = await page.$('#stop-effect-scope-btn')
    await stopEffectScopeBtn.tap()
    await incrementCounterBtn.tap()
    await page.waitFor(500)

    expect(await counter.text()).toBe('2')
    expect(await watchCounterRes.text()).toBe('newVal: 1, oldVal: 0')
    expect(await watchEffectCounterRes.text()).toBe('counter: 1')

  })
})